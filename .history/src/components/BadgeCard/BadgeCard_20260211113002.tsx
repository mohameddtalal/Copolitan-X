import { motion } from "framer-motion";
import styles from "./BadgeCard.module.css";
import { useState } from "react";
import SplitCard from "./SplitCard";
import { getDescSizeClass, getTitleSizeClass } from "@/app/Shared/Functions";

export default function BadgeCard({ card }: any) {
  const [isFlipped, setIsFlipped] = useState(false);

 

  const renderContent = () => {
    if (card.isSplit) {
      return <SplitCard card={card}/>
    }

    if (card.image) {
      return <
    }

    if (card.cardImage) {
      return (
        <>
          {card.layoutType === "column" ? (
            // Column layout for card 5: image below title (smaller)
            <div className="flex flex-col gap-1 sm:gap-1 md:gap-2 lg:gap-3 xl:gap-4 flex-1">
              <h2
                className={`lora-semibold-italic whitespace-pre-line ${getTitleSizeClass(card.id)} ${card.id === 8 ? "text-black" : "text-white"}`}
              >
                {card.title}
              </h2>
              <div className="flex justify-center items-center flex-1">
                <img
                  src={card.cardImage}
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
                src={card.cardImage}
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

    // Default card
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
            className="w-4 h-4 sm:w-4 sm:h-4 lg:w-7 lg:h-7"
          />
        </div>
      </>
    );
  };

  const positionClasses = card.id === 4 ? "col-start-4 row-start-1 col-span-1 row-span-2 rounded-xl sm:rounded-2xl lg:rounded-3xl" : card.span;
  const commonClasses = `${card.color} rounded-xl sm:rounded-2xl lg:rounded-3xl ${!card.isSplit ? "p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-6" : ""} flex flex-col justify-between text-white shadow-xl transition-transform cursor-pointer overflow-hidden h-full`;

  if (card.flippable) {
    return (
      <div className={`${positionClasses} group perspective-1000 relative rounded-xl sm:rounded-2xl lg:rounded-3xl h-full cursor-pointer`}
           onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`flip-wrapper w-full h-full relative preserve-3d transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isFlipped ? 'rotate-y-180' : ''}`}>
           <div className={`flip-front absolute inset-0 backface-hidden ${commonClasses} z-10`}>
              {renderContent()}
           </div>
           <div className={`flip-back absolute inset-0 backface-hidden ${commonClasses} rotate-y-180`}>
              {/* Empty back face */}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div
      key={card.id}
      className={`${positionClasses} ${commonClasses} group relative`}
    >
      {renderContent()}
    </div>
  );
}