import { motion } from "framer-motion";
import styles from "./BadgeCard.module.css";
import { useState } from "react";
import SplitCard from "./SplitCard";
import { getDescSizeClass, getTitleSizeClass } from "@/app/Shared/Functions";
import ImageCard from "./ImageCard";
import CardTextImage from "./CardTextImage";
import TextCard from "./TextCard";
import FlipCard from "./FlipCard";

export default function BadgeCard({ card }: any) {


 
const positionClasses = card.id === 4 ? "col-start-4 row-start-1 col-span-1 row-span-2 rounded-xl sm:rounded-2xl lg:rounded-3xl" : card.span;
const commonClasses = `${card.color} rounded-xl sm:rounded-2xl lg:rounded-3xl ${!card.isSplit ? "p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-6" : ""} flex flex-col justify-between text-white shadow-xl transition-transform cursor-pointer overflow-hidden h-full`;

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
    return <TextCard card={card}/>
  };

  
  if (card.flippable) {
    return <FlipCard card={card} parentClass={positionClasses} >
      {renderContent()}
    </FlipCard>
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