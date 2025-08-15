"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuthStore from "@/stores/authStore";
import { isAdmin } from "@/lib/auth/role";

export default function AdminOnly({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();

  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // Prevent hydration flash: wait until mounted
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const allowed = mounted && isAuthenticated && isAdmin(user);

  useEffect(() => {
    if (!mounted) return;

    // Not authenticated or not admin → redirect to login with a return path
    if (!allowed) {
      const next = encodeURIComponent(pathname || "/admin");
      router.replace(`/login/admin`);
    }
  }, [allowed, mounted, pathname, router]);

  if (!mounted) {
    // optional: your spinner
    return (
      <div className="circular-loader-container">
        <div className="circular-loader"></div>
      </div>
    );
  }

  // While redirecting, render nothing to avoid flicker
  if (!allowed) return null;

  return <>{children}</>;
}
