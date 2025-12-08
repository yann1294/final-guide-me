"use client";

import AdminOnly from "@/components/auth/AdminOnly";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminOnly>{children}</AdminOnly>;
}
