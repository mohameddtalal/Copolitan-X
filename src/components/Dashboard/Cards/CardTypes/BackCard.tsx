import React, { useState } from "react";
import styles from "../CardContainer.module.css";

type BackCardProps = {
  items: string[];
};

export default function BackCard({ items }: BackCardProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
              {/* Button text */}
              <button
                type="button"
                className={styles["back-item-text"]}
                onClick={(event) => {
                  event.stopPropagation();
                  // Toggle active: if clicked again, deactivate
                  setActiveIndex(isActive ? null : index);
                }}
              >
                {item}
              </button>

              {/* Dot SVG */}
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
                  <circle cx="8.5" cy="8.5" r="8" fill="#006B3A" stroke="#00FF8B" />
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