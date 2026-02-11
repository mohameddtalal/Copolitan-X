import { motion } from "framer-motion";
import styles from "./BadgeCard.module.css";
import { useState } from "react";
import SplitCard from "./SplitCard";
import { getDescSizeClass, getTitleSizeClass } from "@/app/Shared/Functions";
import ImageCard from "./ImageCard";
import CardTextImage from "./CardTextImage";

export default function BadgeCard({ card }: any) {
  const [isFlipped, setIsFlipped] = useState(false);

 

  const renderContent = () => {
    if (card.isSplit) {
      return <SplitCard card={card}/>
    }

    if (card.image) {
      return <ImageCard card={card}/>
    }

    if (card.cardTextImage) {
      return <CardTextImage card={card}/>
    }

    // Default card
    return <CardText card={}
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