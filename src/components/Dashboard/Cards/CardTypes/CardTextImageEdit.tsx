import { getDescSizeClass, getTitleSizeClass } from '@/app/Shared/Functions';
import styles from "../CardContainer.module.css";
import React from 'react'

export default function CardTextImage({ card }: any) {
  const specialCards = [8]; // 3D-style (dark) icons
  const isSpecial = specialCards.includes(card.id);

  const icons = (
    <div className="flex flex-col gap-2 shrink-0 ml-3">
      <img src={isSpecial ? "/cards/editicon.svg"    : "/cards/editwhiteicon.svg"}    className="w-5 h-5" />
      <img src={isSpecial ? "/cards/uploadicon.svg"  : "/cards/uploadwhiteicon.svg"}  className="w-5 h-5" />
      <img src={isSpecial ? "/cards/flipicon.svg"    : "/cards/flipwhiteicon.svg"}    className="w-5 h-5" />
      <img src={isSpecial ? "/cards/paletteicon.svg" : "/cards/palettewhiteicon.svg"} className="w-5 h-5" />
    </div>
  );

  return (
    <>
      {card.layoutType === "column" ? (
        // Column layout for card 5: image below title (smaller)
        <div className={`flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3 flex-1`}>

          {/* Title + Icons in same row */}
          <div className="flex flex-row items-start justify-between">
            <h2
              className={`whitespace-pre-line ${getTitleSizeClass(card.id)} ${card.id === 8 ? "text-black" : "text-white"}`}
            >
              {card.title}
            </h2>
            {icons}
          </div>

          <div className="flex justify-center items-center flex-1 h-full">
            {card.cardTextImage && (
              <img
                src={card.cardTextImage}
                alt={card.title}
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
          <p
            className={`whitespace-pre-line ${getDescSizeClass(card.id)} ${card.id === 8 ? "text-black" : "text-white"}`}
          >
            {card.description}
          </p>
        </div>
      ) : (
        // Row layout for card 8: title, description, and image all in one row
         <div className="flex flex-row gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3 items-start h-full">
          <div
            className={`flex flex-col flex-1 gap-0.5 sm:gap-0.5 md:gap-1 lg:gap-1.5 xl:gap-2 ${styles[`card-${card.id}`]}`}
          >
            <h2
              className={`whitespace-pre-line ${getTitleSizeClass(card.id)} ${card.id === 8 ? "text-black" : "text-white"}`}
            >
              {card.title}
            </h2>
          </div>

          <img
            src={card.cardTextImage}
            alt={card.title}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 object-contain shrink-0"
          />
              {icons}
            </div>
      )}

      <div className={`${styles[`card-icon-${card.id}`]} flex justify-between items-end`}>
        <p
          className={`whitespace-pre-line ${getDescSizeClass(card.id)} ${card.id === 8 ? "text-black" : "text-white"}`}
        >
          {card.id === 10  ? "" : card.description}
        </p>
        <img
          src="/cards/Buttom Icon.svg"
          alt="icon"
          className="w-6 h-6 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
        />
      </div>
    </>
  );
}