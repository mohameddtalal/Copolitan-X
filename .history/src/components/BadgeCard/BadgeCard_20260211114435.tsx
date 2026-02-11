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
    return <FlipCard card={card} 
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