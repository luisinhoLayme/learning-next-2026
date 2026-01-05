import { type NextRequest, NextResponse } from "next/server";
import { env } from "./lib/schemas/env";
import parse, { Cookie } from "set-cookie-parser";
import { cookies } from "next/headers";

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/sign-in', '/sign-up']

const checkProtectedRoute = (path: string) => {
  return protectedRoutes.includes(path)
}
const checkPublicRoute = (path: string) => {
  return publicRoutes.includes(path)
}

export const proxy = async (request: NextRequest) => {
  const currentPath = request.nextUrl.pathname

  const isProtectedRoute = checkProtectedRoute(currentPath)
  const isPublicRoute = checkPublicRoute(currentPath)

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value

  // const { pathname, search } = request.nextUrl;
  // console.log({pathname, search})

  if (isProtectedRoute && !refreshToken && !accessToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (isPublicRoute && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!accessToken && refreshToken) {
    console.log('hola proxy.')
    // try {
    //   const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
    //     method: "POST",
    //     headers: { 'Cookie': `refreshToken=${refreshToken}` }
    //   });
    //
    //   if (res.ok) {
    //     const response = NextResponse.next();
    //
    //     const setCookieHeaders: string[] = res.headers.getSetCookie()
    //     const parsedCookies: Cookie[] = parse(setCookieHeaders);
    //
    //     parsedCookies.forEach((cookie) => {
    //       cookieStore.set(cookie.name, cookie.value, {
    //         httpOnly: cookie.httpOnly,
    //         secure: cookie.secure,
    //         sameSite: cookie.sameSite as 'lax' | 'strict' | 'none',
    //         path: cookie.path,
    //         maxAge: cookie.maxAge,
    //         // expires: cookie.expires,
    //       });
    //     });
    //
    //     return response;
    //   }
    // } catch (error) {
    //   console.error("Error refreshing token in middleware", error);
    // }
    // // Si el refresh falla, mandamos a login
    // cookieStore.delete('accessToken')
    // cookieStore.delete('refreshToken')
    // return NextResponse.redirect(new URL('/sign-in', request.url));

    // const url = request.nextUrl.clone();
    // url.pathname = '/api/auth/refresh-token';

    // Guardamos la ruta original (con sus parámetros) en el query 'from'
    // const refreshUrl = new URL('/api/auth/refresh-token', request.url)
    // refreshUrl.searchParams.set('from', `${pathname}${search}`);
    const { pathname, search } = request.nextUrl;
    const fromPath = `${pathname}${search}`;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-original-path', fromPath);
    console.log('xd xd')

    // return NextResponse.rewrite(refreshUrl);
    const refreshUrl = new URL('/api/auth/refresh-token', request.url);

    // Hacemos el rewrite pasando los nuevos headers
    return NextResponse.rewrite(refreshUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.svg|.*\\.json|.*\\.ico$).*)'],
  // matcher: [
  //   "/((?!api|_next/static|_next/image|.*\\.(png|svg|ico|jpg|jpeg|css|js|json)$).*)",
  // ],
  // matcher: ['/:path*'],
  // matcher: [
  //   '/',
  //   '/dashboard',
  //   '/dashboard/:path',
  //   '/sign-in',
  //   '/sign-up'
  // ]
}
