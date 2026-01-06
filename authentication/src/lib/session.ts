import 'server-only'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/lib/schemas/env";
import { cache } from 'react';
import { User } from '@/interfaces/auth.interface';

export const getAuthenticatedUser = cache(async() => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) redirect("/sign-in");

  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/status`, {
    headers: { 'Cookie': `accessToken=${accessToken};` },
    cache: "no-store",
  });

  if (!res.ok) {
    redirect('/api/auth/logout')
  }

  const { user }: { user: User } = await res.json();

  return user;
})

