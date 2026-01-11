"use client";

import { useUser } from "@/context/user/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RequireRole({
  role,
  children,
}: {
  role: "ADMIN" | "USER";
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== role) {
      router.replace("/dashboard");
    }
  }, [user, role, router]);

  if (!user || user.role !== role) return null;

  return <>{children}</>;
}
