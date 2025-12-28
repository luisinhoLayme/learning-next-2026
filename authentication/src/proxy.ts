import { type NextRequest, NextResponse } from "next/server";
import { env } from "./lib/schemas/env";
import parse, { Cookie } from "set-cookie-parser";
import { cookies } from "next/headers";

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/sign-in', '/sign-up', '/']

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
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (isProtectedRoute && !accessToken && refreshToken) {
    try {
      const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
        method: "POST",
        headers: { 'Cookie': `refreshToken=${refreshToken}` }
      });

      if (res.ok) {
        const response = NextResponse.next();

        const setCookieHeaders: string[] = res.headers.getSetCookie()
        const parsedCookies: Cookie[] = parse(setCookieHeaders);

        parsedCookies.forEach((cookie) => {
          cookieStore.set(cookie.name, cookie.value, {
            httpOnly: cookie.httpOnly,
            secure: cookie.secure,
            sameSite: cookie.sameSite as 'lax' | 'strict' | 'none',
            path: cookie.path,
            maxAge: cookie.maxAge,
            // expires: cookie.expires,
          });
        });

        return response;
      }
    } catch (error) {
      console.error("Error refreshing token in middleware", error);
    }
    // Si el refresh falla, mandamos a login
    return NextResponse.redirect(new URL('/sign-in', request.url));
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
