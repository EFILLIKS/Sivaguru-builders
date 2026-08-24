"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/admin/login" && pathname !== "/admin") {
      const hasCookie = typeof window !== "undefined" && document.cookie.includes("admin_session=true");
      const hasStorage = typeof window !== "undefined" && sessionStorage.getItem("admin_session") === "true";
      const isAuthenticated = hasCookie && hasStorage;

      if (!isAuthenticated) {
        router.replace("/admin/login");
      }
    }
  }, [pathname, router]);

  // Standalone page layout for login
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[#FFFAFA]">{children}</div>;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
