import { env } from '@/lib/schemas/env'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import parse, { Cookie } from 'set-cookie-parser'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refreshToken')?.value

  const redirectTo = request.headers.get('x-original-path') || '/';

  console.log("Ruta de retorno detectada:", redirectTo);

  // if (!refreshToken) return NextResponse.json({ error: 'No refresh token' }, { status: 401 })
  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Llamada a tu API externa de NestJS
    const apiRes = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Cookie': `refreshToken=${refreshToken}` }
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ refreshToken }),
    })

    if (!apiRes.ok) throw new Error('Refresh failed')

    const data = await apiRes.json()

    const setCookieHeaders: string[] = apiRes.headers.getSetCookie()
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

    return NextResponse.redirect(new URL(redirectTo, request.url))

  } catch (error) {
    cookieStore.delete('refreshToken')
    return NextResponse.redirect(new URL('/', request.url))
  }
}
