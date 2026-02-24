"use client";
import React, { useState } from "react";
import SplitCard from "./CardTypes/SplitCard";
import ImageCard from "./CardTypes/ImageCard";
import TextCardEdit from "./CardTypes/TextCardEdit";
import FlipCardEdit from "./CardTypes/FlipCardEdit";
import CardTextImageEdit from "./CardTypes/CardTextImageEdit";
import SplitCardEdit from "./CardTypes/SplitCardEdit";
import BackCardEdit from "./CardTypes/BackCardEdit";

type LockedImageCardProps = {
  src: string;
  alt?: string;
};

const LockedImageCard = ({ src, alt }: LockedImageCardProps) => (
  <div className="absolute inset-0">
    <img src={src} alt={alt || "Locked"} className="w-full h-full object-cover" />
  </div>
);

interface CardContainerProps {
  card: any;
}

export default function CardContainer({ card }: CardContainerProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const positionClasses =
    card.id === 4
      ? "col-start-4 row-start-1 col-span-1 row-span-2 rounded-xl sm:rounded-2xl lg:rounded-3xl"
      : card.span;

  const hasAccess = card.hasAccess !== false;
  const isLocked = !hasAccess && Boolean(card.lockedImage);

  const commonClasses = `
    ${card.color}
    rounded-xl sm:rounded-2xl lg:rounded-3xl
    ${!card.isSplit ? "p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-6" : ""}
    flex flex-col justify-between
    text-white
    transition-transform cursor-pointer
    overflow-hidden h-full
  `;

  const renderContent = () => {
    if (card.isSplit) return <SplitCardEdit card={card} />;
    if (card.image) return <ImageCard card={card} />;
    if (card.cardTextImage) return <CardTextImageEdit card={card} onFlip={() => setIsFlipped((p) => !p)} />;
    return <TextCardEdit card={card} onFlip={() => setIsFlipped((p) => !p)} />;
  };

  if (isLocked) {
    return (
      <div key={card.id} className={`${positionClasses} ${commonClasses} cursor-default group relative`}>
        <LockedImageCard src={card.lockedImage} alt={card.title} />
      </div>
    );
  }

  if(card.flippable === true || card.flippable === false) {
    return (
      <FlipCardEdit
        card={card}
        parentClass={positionClasses}
        childrenClassContainer={commonClasses}
        backContent={<BackCardEdit card={card} onFlip={() => setIsFlipped((p) => !p)} />}
        isFlipped={isFlipped}
      >
        {renderContent()}
      </FlipCardEdit>
    );
  }

  return (
    <div key={card.id} className={`${positionClasses} ${commonClasses} group relative`}>
      {renderContent()}
    </div>
  );
}