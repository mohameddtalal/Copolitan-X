import { getDescSizeClass, getTitleSizeClass } from '@/app/Shared/Functions';
import styles from "../CardContainer.module.css";
import React from 'react'

export default function CardTextImage({card}:any) {
  return (
        <>
          {card.layoutType === "column" ? (
            // Column layout for card 5: image below title (smaller)
            <div className={`flex flex-col gap-1 sm:gap-1 md:gap-2 lg:gap-3 xl:gap-4 flex-1`}>
              <h2
                className={`lora-semibold-italic whitespace-pre-line ${getTitleSizeClass(card.id)} ${card.id === 8 ? "text-black" : "text-white"}`}
              >
                {card.title}
              </h2>
              <div className="flex justify-center items-center flex-1">
                <img
                  src={card.cardTextImage}
                  alt={card.title}
                  className="w-18 h-18 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-17 lg:h-17 xl:w-24 xl:h-24 object-contain"
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
              className="w-6 h-6 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
            />
          </div>
        </>
      );
}
