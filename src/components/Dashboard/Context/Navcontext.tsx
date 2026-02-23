"use client";

import { createContext, useContext, useState } from "react";

type NavContextType = {
  selectedTitle: string;
  setSelectedTitle: (value: string) => void;
  selectedButton: string;
  setSelectedButton: (value: string) => void;
};

const NavContext = createContext<NavContextType | null>(null);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedButton, setSelectedButton] = useState("");

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