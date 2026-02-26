"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./Navigation.module.css";

interface AnimatedToggleProps {
  onToggle?: (state: "signin" | "homepage") => void;
  activeTab?: "signin" | "homepage";
}

export default function AnimatedToggle({ onToggle, activeTab: externalActiveTab }: AnimatedToggleProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<"signin" | "homepage">("homepage");
  const [isMLogo, setIsMLogo] = useState(false);

  const activeTab = externalActiveTab || internalActiveTab;

  const handleTabClick = (tab: "signin" | "homepage", e: React.MouseEvent) => {
    e.stopPropagation();
    setInternalActiveTab(tab);
    onToggle?.(tab);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMLogo((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center translate-x-[-12px]">
      <div className="flex items-center relative">

        {/* Logo Part - Circular Button */}
        <motion.div
          className={`w-9 h-9 rounded-full ${isMLogo ? "bg-[var(--color-primary)]" : "bg-black"} flex items-center justify-center border border-white/10 shadow-lg relative overflow-hidden z-20`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogoClick}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isMLogo ? "m-logo" : "x-logo"}
              initial={{ y: 20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.3, ease: "backOut" }}
              className="flex items-center justify-center"
            >
              <Image
                src={isMLogo ? "/cards/mlogo.svg" : "/cards/logogreen.svg"}
                alt="Logo"
                width={20}
                height={20}
                className={isMLogo ? "  saturate-[10000%] hue-rotate-[10deg]" : ""}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Connecting Line */}
        <div 
          className={`${styles.line}`} 
          style={{ 
            backgroundColor: isMLogo ? "var(--color-primary)" : "black",
            opacity: 1
          }} 
        />

        {/* Text Part - Pill Shape with Outer Border */}
        <div className={`p-[1px] ${isMLogo ? "bg-[var(--color-primary)]" : "bg-white/20"} rounded-full z-20 -ml-1`}>
          <div className={`${isMLogo ? "bg-[var(--color-primary)]" : "bg-black"} rounded-full px-5 py-2 border border-white/10 flex items-center gap-4 text-[12px] font-bold font-gtwalsheim shadow-lg`}>
            <span
              className={`transition-all duration-300 relative cursor-pointer ${activeTab === "signin" ? (isMLogo ? "text-yellow-300" : "text-[#00FFA6]") : (isMLogo ? "text-white/60" : "text-white/40")}`}
              onClick={(e) => handleTabClick("signin", e)}
            >
              Sign In
              {activeTab === "signin" && (
                <motion.div
                  layoutId="underline"
                  className={`absolute -bottom-1 left-0 right-0 h-[1.5px] ${isMLogo ? "bg-yellow-300" : "bg-[#00FFA6]"}`}
                />
              )}
            </span>
            <span className={`font-thin ${isMLogo ? "text-white/20" : "text-white/10"}`}>|</span>
            <span
              className={`transition-all duration-300 relative cursor-pointer ${activeTab === "homepage" ? (isMLogo ? "text-yellow-300" : "text-[#00FFA6]") : (isMLogo ? "text-white/60" : "text-white/40")}`}
              onClick={(e) => handleTabClick("homepage", e)}
            >
              Homepage
              {activeTab === "homepage" && (
                <motion.div
                  layoutId="underline"
                  className={`absolute -bottom-1 left-0 right-0 h-[1.5px] ${isMLogo ? "bg-yellow-300" : "bg-[#00FFA6]"}`}
                />
              )}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}