import { cookies } from "next/headers";
import { env } from "../schemas/env";

export async function refreshTokenAction() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) return { success: false };

  try {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Cookie': `refreshToken=${refreshToken}` }
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) throw new Error("Failed to refresh");

    const result = await response.json();

    // REPLICAR COOKIES (Igual que hiciste en el Login)
    const rawCookies = response.headers.getSetCookie();
    rawCookies.forEach(cookieStr => {
      const [nameValue] = cookieStr.split(';');
      const [name, value] = nameValue.split('=');
      cookieStore.set(name.trim(), value.trim(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
    });

    return { success: true };
  } catch (error) {
    // Si falla, borramos cookies para forzar re-login
    // cookieStore.delete('accessToken');
    // cookieStore.delete('refreshToken');
    return { success: false };
  }
}
