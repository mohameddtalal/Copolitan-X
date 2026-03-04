"use client";
import React from "react";
import SplitCard from "./CardTypes/SplitCard";
import ImageCard from "./CardTypes/ImageCard";
import CardTextImage from "./CardTypes/CardTextImage";
import TextCard from "./CardTypes/TextCard";
import FlipCard from "./CardTypes/FlipCard";
import BackCard from "./CardTypes/BackCard";

type LockedImageCardProps = {
  src: string;
  alt?: string;
};

const LockedImageCard = ({ src, alt }: LockedImageCardProps) => (
  <div className="absolute inset-0">
    <img src={src} alt={alt || "Locked"} className="w-full h-full object-cover" />
  </div>
);

const BackActionList = ({ items, title }: { items: string[]; title: string }) => {
  return <BackCard items={items} title={title} />;
};

interface CardContainerProps {
  card: any;
  pageIndex:any
}

export default function CardContainer({ card,pageIndex }: CardContainerProps) {
  const positionClasses =
    card.id === 4
       ? `card-grid-${card.id} col-span-1 row-span-2 rounded-xl sm:rounded-2xl lg:rounded-3xl  overflow-x-hidden scrollbar-hide`
      : card.span +` card-grid-${card.id} ${card.id==10&&pageIndex==2?"order-card-3":""}`;

  const hasAccess = card.hasAccess !== false;
  const isLocked = !hasAccess && Boolean(card.lockedImage);

 const commonClasses = `
  ${card.color}
  rounded-xl sm:rounded-2xl lg:rounded-3xl
  ${!card.isSplit ? `grid-padding card-grid-${card.id}` : ""}
  flex flex-col justify-between
  text-white
  transition-transform cursor-pointer
  overflow-hidden h-full
`;

  const lockedClasses = `${commonClasses} cursor-default`;

  const renderContent = () => {
    if (card.isSplit) return <SplitCard card={card} />;
    if (card.image) return <ImageCard card={card} />;
    if (card.cardTextImage) return <CardTextImage card={card} />;
    return <TextCard card={card} />;
  };

  if (isLocked) {
    return (
      <div key={card.id} className={`${positionClasses} ${lockedClasses} group relative`}>
        <LockedImageCard src={card.lockedImage} alt={card.title} />
      </div>
    );
  }

  if (card.flippable) {
    return (
      <FlipCard
        card={card}
        parentClass={positionClasses}
        childrenClassContainer={commonClasses}
        backContent={<BackActionList items={card.backItems} title={card.title} />}
      >
        {renderContent()}
      </FlipCard>
    );
  }

  return (
    <div key={card.id} className={`${positionClasses} ${commonClasses}  group relative`}>
      {renderContent()}
    </div>
  );
}