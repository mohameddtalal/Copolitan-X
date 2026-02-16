"use client";

import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only hide the navbar on auth pages, but keep normal scrolling behaviour
  useEffect(() => {
    const navbar = document.querySelector("nav");

    if (navbar) {
      navbar.style.display = "none";
    }

    return () => {
      if (navbar) {
        navbar.style.display = "";
      }
    };
  }, []);

  return <div style={{ margin: 0, padding: 0 }}>{children}</div>;
}
