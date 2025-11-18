import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { BASE_URL } from './lib/strapi'

const protectedRoutes = ['/dashboard']

const checkProtectedRoute = (path: string) => {
  return protectedRoutes.includes(path)
}

export const proxy = async (request: NextRequest) => {
  const currentPath = request.nextUrl.pathname

  const isProtectedRoute = checkProtectedRoute(currentPath)

  if (!isProtectedRoute) return NextResponse.next()

  try {
    const cookieStore = await cookies()
    const jwt = cookieStore.get('jwt').value
    if(!jwt) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

    const response = await fetch(`${BASE_URL}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${ jwt }`,
        'Content-Type': 'application/json'
      }
    })

    const userResponse = await response.json()
    console.log(userResponse)

    if (!userResponse) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

    return NextResponse.next()
  } catch (err) {
    console.error("Error verifying use authentication: ", err)
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path'
  ]
}
