"use client";
import { usePathname } from "next/navigation";
import { useEffect, ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Only exact /dashboard page gets dark theme
    if (pathname === "/dashboard") {
      document.documentElement.classList.add("dashboard");
    } else {
      document.documentElement.classList.remove("dashboard");
    }
  }, [pathname]);

  return <>{children}</>;
}