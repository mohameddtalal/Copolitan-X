import React from 'react'
import styles from "../CardContainer.module.css";
import { getDescSizeClass, getTitleSizeClass } from '@/app/Shared/Functions';

export default function TextCard({ card }: any) {
  const specialCards = [6, 7, 12, 13,3,11];
  const isSpecial = specialCards.includes(card.id);

  return (
    <>
      <div className={styles[`card-${card.id}`]}>
        
        {/* Title + Icons in the same row */}
        <div className="flex flex-row items-start justify-between">
          <h2
            className={`mb-0.5 sm:mb-1 md:mb-1.5 lg:mb-2 xl:mb-3 whitespace-pre-line ${getTitleSizeClass(card.id)} ${
              card.id === 8 || card.id === 1 || card.id === 9 || card.id === 15 ? "text-black" : "text-white"
            }`}
          >
            {card.title}
          </h2>

          <div className="flex flex-col gap-2 shrink-0 ml-3">
            <img src={isSpecial ? "/cards/editwhiteicon.svg"    : "/cards/editicon.svg"}    className="w-5 h-5" />
            <img src={isSpecial ? "/cards/uploadwhiteicon.svg"  : "/cards/uploadicon.svg"}  className="w-5 h-5" />
            <img src={isSpecial ? "/cards/flipwhiteicon.svg"    : "/cards/flipicon.svg"}    className="w-5 h-5" />
            <img src={isSpecial ? "/cards/palettewhiteicon.svg" : "/cards/paletteicon.svg"} className="w-5 h-5" />
          </div>
        </div>

        {/* Description unchanged */}
        <p
          className={`whitespace-pre-line ${getDescSizeClass(card.id)} ${
            card.id === 8 || card.id === 1 || card.id === 9 || card.id === 15 ? "text-black" : "text-white"
          }`}
        >
          {card.description}
        </p>

      </div>

      {/* Bottom icon unchanged */}
      <div className={`${styles[`card-icon-${card.id}`]} flex justify-end`}>
        <img
          src="/cards/Buttom Icon.svg"
          alt="icon"
          className="w-6 h-6 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
        />
      </div>
    </>
  );
}