4[]import { getDescSizeClass, getTitleSizeClass } from '@/app/Shared/Functions';
import styles from "./BadgeCard.module.css";
import React from 'react'

export default function CardTextImage({card}:any) {
  return (
        <>
          {card.layoutType === "column" ? (
            // Column layout for card 5: image below title (smaller)
            <div className={` flex flex-col gap-1 sm:gap-1 md:gap-2 lg:gap-3 xl:gap-4 flex-1`}>
              <h2
                className={`lora-semibold-italic whitespace-pre-line ${getTitleSizeClass(card.id)} ${card.id === 8 ? "text-black" : "text-white"}`}
              >
                {card.title}
              </h2>
              <div className="flex justify-center items-center flex-1">
                <img
                  src={card.cardTextImage}
                  alt={card.title}
                  className="w-15 h-15 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-15 lg:h-15 xl:w-20 xl:h-20 object-contain"
                />
              </div>
              <p
                className={` font-gtwalsheim whitespace-pre-line ${getDescSizeClass(card.id)} ${card.id === 8 ? "text-black" : "text-white"}`}
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
                  className={`lora-semibold-italic whitespace-pre-line ${getTitleSizeClass(card.id)} ${card.id === 8 ? "text-black" : "text-white"}`}
                >
                  {card.title}
                </h2>
                <p
                  className={` font-gtwalsheim whitespace-pre-line ${getDescSizeClass(card.id)} ${card.id === 8 ? "text-black" : "text-white"}`}
                >
                  {card.description}
                </p>
              </div>
              <img
                src={card.cardTextImage}
                alt={card.title}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16  xl:w-20 object-contain shrink-0"
              />
            </div>
          )}
          <div className={`${styles[`card-icon-${card.id}`]} flex justify-end`}>
            {/*flex justify-end*/}
            <img
              src="/cards/Buttom Icon.svg"
              alt="icon"
              className="w-4 h-4 sm:w-4 sm:h-4 lg:w-7 lg:h-7"
            />
          </div>
        </>
      );
}
