"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./Navigation.module.css";

interface AnimatedToggleProps {
  onToggle?: (state: "signin" | "homepage") => void;
}

export default function AnimatedToggle({ onToggle }: AnimatedToggleProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "homepage">("homepage");
  const [logoUp, setLogoUp] = useState(false);

  const handleTabClick = (tab: "signin" | "homepage", e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveTab(tab);
    onToggle?.(tab);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLogoUp((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center translate-x-[-12px]">
      <div className="flex items-center relative">

          {/* Logo Part - Circular Button */}
   <motion.div 
  className="w-9 h-9 rounded-full bg-black flex items-center justify-center border border-white/10 shadow-lg relative overflow-hidden z-20"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleLogoClick}
>
  <AnimatePresence mode="wait">
    <motion.div
      key={logoUp ? "logo1" : "logo2"}   // 👈 هنا التعديل
      initial={{ y: 20, opacity: 0, rotate: -45 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      exit={{ y: -20, opacity: 0, rotate: 45 }}
      transition={{ duration: 0.3, ease: "backOut" }}
      className="flex items-center justify-center"
    >
      <Image 
        src="/cards/X.svg" 
        alt="Logo" 
        width={16} 
        height={16}
        className="brightness-0 invert-[0.7]"
      />
    </motion.div>
  </AnimatePresence>
</motion.div>

        {/* Connecting Line */}
        <div className={`${styles.line}`} />

        {/* Text Part - Pill Shape */}
        <div className="bg-black rounded-full px-5 py-2 border border-white/10 flex items-center gap-4 text-[12px] font-bold font-gtwalsheim shadow-lg z-20 -ml-1">
          <span
            className={`transition-all duration-300 relative cursor-pointer ${activeTab === "signin" ? "text-[#00FFA6]" : "text-white/40"}`}
            onClick={(e) => handleTabClick("signin", e)}
          >
            Sign In
            {activeTab === "signin" && (
              <motion.div
                layoutId="underline"
                className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#00FFA6]"
              />
            )}
          </span>
          <span className="text-white/10 font-thin">|</span>
          <span
            className={`transition-all duration-300 relative cursor-pointer ${activeTab === "homepage" ? "text-[#00FFA6]" : "text-white/40"}`}
            onClick={(e) => handleTabClick("homepage", e)}
          >
            Homepage
            {activeTab === "homepage" && (
              <motion.div
                layoutId="underline"
                className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#00FFA6]"
              />
            )}
          </span>
        </div>

      </div>
    </div>
  );
}