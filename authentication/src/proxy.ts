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

  if (isProtectedRoute && !refreshToken && !accessToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (isPublicRoute && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!accessToken && refreshToken) {
    // const url = request.nextUrl.clone();
    // url.pathname = '/api/auth/refresh-token';

    // Guardamos la ruta original (con sus parámetros) en el query 'from'
    // const refreshUrl = new URL('/api/auth/refresh-token', request.url)
    // refreshUrl.searchParams.set('from', `${pathname}${search}`);
    const { pathname, search } = request.nextUrl;
    const fromPath = `${pathname}${search}`;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-original-path', fromPath);

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
