import { ReactNode } from "react";
import { getAuthenticatedUser } from '@/lib/session'
import { redirect } from "next/navigation";

interface Props {
  children: ReactNode;
  requiredRole?: "admin" | "user";
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export default async function ProtectedLayout({ children, requiredRole }: Props) {

  // await delay(4000)
  const user = await getAuthenticatedUser(requiredRole)
  console.log(user)

  if (!user?.verify) redirect("/verify");
  if (requiredRole && user.role !== requiredRole) redirect("/");

  return <>{children}</>;
}
