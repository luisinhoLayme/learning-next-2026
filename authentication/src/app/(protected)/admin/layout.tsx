// src/app/(protected)/admin/layout.tsx
import ProtectedLayout from "../layout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout requiredRole="ADMIN">{children}</ProtectedLayout>;
}
