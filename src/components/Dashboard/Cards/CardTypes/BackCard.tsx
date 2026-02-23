"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useNav } from "@/components/Dashboard/Context/Navcontext";
import styles from "../CardContainer.module.css";

type BackCardProps = {
  items: string[];
  title: string; // 👈 we need card title
};

// Convert text to URL friendly format
const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-");

export default function BackCard({ items, title }: BackCardProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();
  const { setSelectedTitle, setSelectedButton } = useNav();

  if (!items?.length) return null;

  return (
    <div
      className={`${styles["card-back"]} h-full card-back-scroller overflow-y-auto overflow-x-hidden`}
    >
      <div className={styles["card-back-inner"]}>
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={`${item}-${index}`}
              className={`${styles["back-item"]} ${
                isActive ? styles["back-item-active"] : ""
              }`}
            >
              <button
                type="button"
                className={styles["back-item-text"]}
                onClick={(event) => {
                  event.stopPropagation();

                  // 1️⃣ Set active state
                  setActiveIndex(isActive ? null : index);

                  // 2️⃣ Update Navbar
                  setSelectedTitle(title);
                  setSelectedButton(item);

                  // 3️⃣ Navigate dynamically
                  router.push(
                    `/dashboard/${slugify(title)}/${slugify(item)}`
                  );
                }}
              >
                {item}
              </button>

              <span
                className={`${styles["back-item-dot"]} ${
                  isActive ? styles["back-item-dot-active"] : ""
                }`}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="8.5"
                    cy="8.5"
                    r="8"
                    fill="#006B3A"
                    stroke="#00FF8B"
                  />
                  <circle cx="8.5" cy="8.5" r="4" fill="#00FF8B" />
                </svg>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}