import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isValidUUID } from './utils/is-validUUID'

// This function can be marked `async` if using `await` inside
export function proxy(req: NextRequest) {

  if (req.nextUrl.pathname.startsWith('/api/entries')) {
    const id = req.nextUrl.pathname.replace('/api/entries/', '')

    if (!isValidUUID(id)) {
      return NextResponse.json(
        { ok: false, message: `${id} is nat a valid UUID` },
        { status: 400 }
      )
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // '/api/entries/:path*',
    '/api/entries/:path',
  ]
}
