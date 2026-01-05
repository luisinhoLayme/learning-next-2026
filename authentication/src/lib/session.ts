import 'server-only'; // Garantiza que esta lógica de tokens nunca se filtre
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/lib/schemas/env";
import { cache } from 'react';
import { User } from '@/interfaces/auth.interface';

export const getAuthenticatedUser = cache(async(requiredRole?: 'admin' | 'user') => {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  console.log('seseion: xd: ',accessToken)

  if (!refreshToken) redirect("/sign-in");

  let res = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/status`, {
    headers: { 'Cookie': `accessToken=${accessToken};` },
    cache: "no-store",
  });

  console.log(res.status)
  if (res.status === 401) {
    const xd = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/auth/prueba`)
    // console.log(xd.headers)
    // cookieStore.set('hola', 'hows it going.')
  }
  if (!res.ok) {
    redirect("/sign-in");
    // redirect('/api/auth/logout')
  }

  const { user } = await res.json();

  return user as User;
})

