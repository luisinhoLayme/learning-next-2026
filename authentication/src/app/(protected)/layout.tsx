import { ReactNode } from "react";
import { getAuthenticatedUser } from '@/lib/session'
import { redirect } from "next/navigation";
import { UserProvider } from "@/context/user";

interface Props {
  children: ReactNode;
  requiredRole?: "ADMIN" | "USER";
}

// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export default async function ProtectedLayout({ children, requiredRole }: Props) {

  const user = await getAuthenticatedUser()

  if (!user?.verify) {
    redirect(`/verify`);
  }
  if (requiredRole && user.role !== requiredRole) redirect("/");

  return <UserProvider user={user}>
    {children}
  </UserProvider>;
}
