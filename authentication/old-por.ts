
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "./lib/schemas/env";
import parse, { Cookie } from "set-cookie-parser";

const protectedRoutes = ['/']
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

  if (isProtectedRoute && !refreshToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (isPublicRoute && accessToken && !isProtectedRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {

    let respStatus = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/status`, {
      headers: { 'Cookie': `accessToken=${accessToken};` }
    })
    console.log(respStatus)

    if (respStatus.status === 401 && refreshToken) {
      const refreshResponse = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Cookie': `refreshToken=${refreshToken}` }
      })

      if (refreshResponse.ok) {
        const setCookieHeaders: string[] = refreshResponse.headers.getSetCookie()
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

        const newAccessToken = cookieStore.get('accessToken')?.value
        respStatus = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/status`, {
          headers: { 'Cookie': `accessToken=${newAccessToken}; refreshToken=${refreshToken}` }
        })
      } else {
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }
    }

    if (respStatus.ok) {
      const dataUser = await respStatus.json()

      if (!dataUser.user.verify) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }

      return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/sign-in', request.url))
  } catch (err) {
    console.error("Error verifying use authentication: ", err)
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png|.*\\.svg|.*\\.json|.*\\.ico$).*)'],
  // matcher: ['/:path*'],
  // matcher: [
  //   '/',
  //   '/dashboard',
  //   '/dashboard/:path',
  //   '/sign-in',
  //   '/sign-up'
  // ]
}
