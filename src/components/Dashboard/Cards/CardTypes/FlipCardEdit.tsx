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
}

export default function FlipCard({
  card,
  children,
  backContent,
  parentClass,
  childrenClassContainer,
  isFlipped,
}: FlipCardProps) {
  const isVertical = card.id === 8 || card.id === 14;

  return (
    <div
      className={`${parentClass} ${styles["perspective-1000"]} relative rounded-xl sm:rounded-2xl lg:rounded-3xl h-full cursor-pointer`}
      // ❌ No onClick here anymore
    >
      <div
        className={`${isVertical ? styles["flip-wrapper-vertical"] : styles["flip-wrapper"]}
                    ${isFlipped ? (isVertical ? styles["rotate-x-180"] : styles["rotate-y-180"]) : ""}`}
      >
        {/* Front */}
        <div className={`${isVertical ? styles["flip-front-vertical"] : styles["flip-front"]} ${childrenClassContainer}`}>
          {children}
        </div>

        {/* Back */}
        <div className={`${isVertical ? styles["flip-back-vertical"] : styles["flip-back"]} ${childrenClassContainer}`}>
          {backContent}
        </div>
      </div>
    </div>
  );
}