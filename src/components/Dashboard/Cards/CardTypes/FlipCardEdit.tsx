"use client";
import React from "react";
import styles from "../CardContainer.module.css";

interface FlipCardProps {
  card: any;
  children: React.ReactNode;
  backContent: React.ReactNode;
  parentClass?: string;
  childrenClassContainer?: string;
  isFlipped: boolean;
  isMenuOpen?: boolean;
}

export default function FlipCard({
  card,
  children,
  backContent,
  parentClass,
  childrenClassContainer,
  isFlipped,
  isMenuOpen,
}: FlipCardProps) {
  const isVertical = card.id === 8 || card.id === 14;

  return (
    <div
      className={`${parentClass} ${styles["perspective-1000"]} relative rounded-xl sm:rounded-2xl lg:rounded-3xl h-full cursor-pointer ${isMenuOpen ? "!overflow-visible" : ""}`}
    >
      <div
        className={`${isVertical ? styles["flip-wrapper-vertical"] : styles["flip-wrapper"]}
                    ${isFlipped ? (isVertical ? styles["rotate-x-180"] : styles["rotate-y-180"]) : ""}
                    ${isMenuOpen ? "!overflow-visible" : ""}`}
        style={isMenuOpen ? { transformStyle: 'flat' } : {}}
      >
        {/* Front */}
        <div 
          className={`${isVertical ? styles["flip-front-vertical"] : styles["flip-front"]} ${childrenClassContainer}`}
          style={isMenuOpen ? { backfaceVisibility: 'visible', overflow: 'visible' } : {}}
        >
          {children}
        </div>

        {/* Back */}
        <div 
          className={`${isVertical ? styles["flip-back-vertical"] : styles["flip-back"]} ${childrenClassContainer}`}
          style={isMenuOpen ? { backfaceVisibility: 'visible', overflow: 'visible' } : {}}
        >
          {backContent}
        </div>
      </div>
    </div>
  );
}