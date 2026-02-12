"use client";

import { createContext, useContext, useState } from "react";

const NavContext = createContext<any>(null);

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
  return useContext(NavContext);
}
