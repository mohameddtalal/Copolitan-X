"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

type NavContextType = {
  selectedTitle: string;
  setSelectedTitle: (value: string) => void;
  selectedButton: string;
  setSelectedButton: (value: string) => void;
};

const NavContext = createContext<NavContextType | null>(null);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Helper to "unslugify" text from URL
  const unslugify = (slug: string) => {
    if (!slug) return "";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const [selectedTitle, setSelectedTitleState] = useState("");
  const [selectedButton, setSelectedButtonState] = useState("");

  // Update state based on pathname
  useEffect(() => {
    if (pathname === "/dashboard") {
      setSelectedTitleState("");
      setSelectedButtonState("");
      return;
    }

    // Pattern: /dashboard/[title]/[button]
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "dashboard" && segments.length >= 2) {
      const urlTitle = unslugify(segments[1]);
      const urlButton = segments[2] ? unslugify(segments[2]) : "";

      // Special cases for specific titles that might not unslugify perfectly
      const titleMap: Record<string, string> = {
        "control-room": "Control Room",
        "operations-center": "Operations Center",
        "security-control": "Security Control",
        "finance-center": "Finance Center",
        "partnerships-network": "Partnerships Network",
        "experience&-engagement-lab": "Experience & Engagement Lab",
        "website-builder": "Website builder",
        "facility-management": "Facility Management",
        "data-hub": "Data Hub"
      };

      const finalTitle = titleMap[segments[1]] || urlTitle;
      
      setSelectedTitleState(finalTitle);
      setSelectedButtonState(urlButton);
    }
  }, [pathname]);

  const setSelectedTitle = (value: string) => {
    setSelectedTitleState(value);
  };

  const setSelectedButton = (value: string) => {
    setSelectedButtonState(value);
  };

  return (
    <NavContext.Provider
      value={{ selectedTitle, setSelectedTitle, selectedButton, setSelectedButton }}
    >
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const context = useContext(NavContext);
  if (!context) throw new Error("useNav must be used inside NavProvider");
  return context;
}