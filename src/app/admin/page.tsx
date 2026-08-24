"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingState } from "@/components/admin/LoadingState";

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasCookie = document.cookie.includes("admin_session=true");
      const hasStorage = sessionStorage.getItem("admin_session") === "true";
      const isAuthenticated = hasCookie && hasStorage;

      if (isAuthenticated) {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/admin/login");
      }
    }
  }, [router]);

  return <LoadingState message="Redirecting to Admin Portal..." />;
}
