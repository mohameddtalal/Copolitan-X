import React from 'react'
import styles from "../CardContainer.module.css";
import { getDescSizeClass, getTitleSizeClass } from '@/app/Shared/Functions';
export default function TextCard({card}:any) {
 return (
      <>
        <div className={styles[`card-${card.id}`]}>
          <h2
            className={`mb-0.5 sm:mb-1 md:mb-1.5 lg:mb-2 xl:mb-3 lora-semibold-italic whitespace-pre-line ${getTitleSizeClass(card.id)} ${card.id === 8 || card.id === 1 || card.id === 9 || card.id === 15 ? "text-black" : "text-white"}`}
          >
            {card.title}
          </h2>
          <p
            className={` font-gtwalsheim whitespace-pre-line ${getDescSizeClass(card.id)} ${card.id === 8 || card.id === 1 || card.id === 9 || card.id === 15 ? "text-black" : "text-white"}`}
          >
            {card.description}
          </p>
        </div>
        <div className={`${styles[`card-icon-${card.id}`]} flex justify-end `}>
          {/*shrink-0 mt-auto*/}
          <img
            src="/cards/Buttom Icon.svg"
            alt="icon"
            className="w-6 h-6 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
          />
        </div>
      </>
    );
}
