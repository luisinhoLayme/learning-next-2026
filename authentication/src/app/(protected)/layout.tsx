import { ReactNode } from "react";
import { getAuthenticatedUser } from '@/lib/session'
import { redirect } from "next/navigation";
import { UserProvider } from "@/context/user";
import SidebarWrapper from '@/components/dashboard/sidebar-wrapper'

interface Props {
  children: ReactNode;
}

// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export default async function ProtectedLayout({ children }: Props) {

  const user = await getAuthenticatedUser()

  if (!user?.verify) {
    redirect(`/verify`);
  }

  return <UserProvider user={user}>
    <SidebarWrapper>
      {children}
    </SidebarWrapper>
  </UserProvider>;
}
