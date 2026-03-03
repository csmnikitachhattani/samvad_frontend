"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("loginusertypename");

    // Always allow login page
    if (pathname === "/login") {
      setLoading(false);
      return;
    }

    if (!role) {
      router.replace("/login");
      return;
    }

    // Department can ONLY access /admin
    if (role === "Department") {
      if (!pathname.startsWith("/admin")) {
        router.replace("/admin");
        return;
      }
    }

    // Newspaper can ONLY access /newspaper
    if (role === "Newspaper") {
      if (!pathname.startsWith("/newspaper")) {
        router.replace("/newspaper");
        return;
      }
    }

    setLoading(false);
  }, [pathname]);

  if (loading) return null;

  return children;
}