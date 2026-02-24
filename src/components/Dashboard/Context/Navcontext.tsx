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

  const [selectedTitle, setSelectedTitleState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`nav_title_${pathname}`) ?? "";
    }
    return "";
  });

  const [selectedButton, setSelectedButtonState] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(`nav_button_${pathname}`) ?? "";
    }
    return "";
  });

  // When pathname changes, load saved values for that route
// When pathname changes, load saved values for that route
  useEffect(() => {
    if (pathname === "/dashboard") {
      localStorage.removeItem("nav_title_/dashboard");
      localStorage.removeItem("nav_button_/dashboard");
      setSelectedTitleState("");
      setSelectedButtonState("");
      return;
    }

    const savedTitle = localStorage.getItem(`nav_title_${pathname}`) ?? "";
    const savedButton = localStorage.getItem(`nav_button_${pathname}`) ?? "";
    setSelectedTitleState(savedTitle);
    setSelectedButtonState(savedButton);
  }, [pathname]);

  // Wrap setters to also save to localStorage keyed by pathname
  const setSelectedTitle = (value: string) => {
    localStorage.setItem(`nav_title_${pathname}`, value);
    setSelectedTitleState(value);
  };

  const setSelectedButton = (value: string) => {
    localStorage.setItem(`nav_button_${pathname}`, value);
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