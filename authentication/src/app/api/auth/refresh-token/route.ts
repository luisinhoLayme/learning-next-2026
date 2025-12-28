import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/lib/schemas/env";
import parse from "set-cookie-parser";

export async function GET() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) return { ok: false };

    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: { 'Cookie': `refreshToken=${refreshToken}` }
    });

    if (!res.ok) return { ok: false };

    // Extraemos las cookies del backend
    const setCookieHeaders = res.headers.getSetCookie();
    const parsedCookies = parse(setCookieHeaders);

    // Las guardamos en el store de Next.js
    parsedCookies.forEach((cookie) => {
      cookieStore.set(cookie.name, cookie.value, {
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite as 'lax' | 'strict' | 'none',
        path: cookie.path || '/',
        maxAge: cookie.maxAge,
      });
    });

  return NextResponse.json({ ok: true });
}
