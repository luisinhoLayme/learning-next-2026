import { ReactNode } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/lib/schemas/env";
import { authService, setCookie } from "@/lib/services/auth.service";

interface Props {
  children: ReactNode;
  requiredRole?: "admin" | "user";
}

export default async function ProtectedLayout({ children, requiredRole }: Props) {
  const cookieStore = await cookies()

  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) redirect("/sign-in");

  let res = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/status`, {
    headers: { 'Cookie': `accessToken=${accessToken};` },
    cache: "no-store",
  });

  // if (res.status === 401 && refreshToken) {
  //
  //   // const refreshRes = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
  //   //   method: "POST",
  //   //   headers: { 'Cookie': `refreshToken=${refreshToken}` }
  //   // });
  //   // const cookiesHeaders: string[] = refreshRes.headers.getSetCookie()
  //   // await setCookie(cookiesHeaders)
  //   // console.log('hola')
  //   const refreshRes = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh-token`, {
  //     // method: "POST",
  //     // credentials: 'include',
  //     // headers: { "Content-Type": "application/json" },
  //     headers: { "Cookie": cookieStore.toString() },
  //   });
  //   // const refreshRes = await authService.refershToken()
  //
  //   if (!refreshRes.ok) redirect("/sign-in");
  //
  //   accessToken = cookieStore.get("accessToken")?.value;
  //
  //   res = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/status`, {
  //     headers: { 'Cookie': `accessToken=${accessToken};` },
  //     cache: "no-store",
  //   });
  // }

  if (!res.ok) redirect("/sign-in");

  const { user } = await res.json();

  if (!user?.verify) redirect("/sign-in");
  if (requiredRole && user.role !== requiredRole) redirect("/");

  return <>{children}</>;
}
