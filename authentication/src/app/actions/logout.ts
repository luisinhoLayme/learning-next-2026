// app/actions/auth.ts
'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  // redirect() dentro de una Server Action invalida el caché automáticamente
  redirect("/");
}
