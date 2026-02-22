import React, { useState } from "react";
import SplitCard from "./CardTypes/SplitCard";
import ImageCard from "./CardTypes/ImageCard";
import CardTextImage from "./CardTypes/CardTextImage";
import TextCard from "./CardTypes/TextCard";
import FlipCard from "./CardTypes/FlipCard";
import styles from "./CardContainer.module.css";

type BackActionListProps = {
  items: string[];
};

const BackActionList = ({ items }: BackActionListProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!items?.length) {
    return null;
  }

  return (
    <div className={`${styles["card-back"]} h-full card-back-scroller overflow-y-auto overflow-x-hidden`}>
      <div className={styles["card-back-inner"]}>
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={`${item}-${index}`}
              className={`${styles["back-item"]} ${
                isActive ? styles["back-item-active"] : ""
              }`}
            >
              <button
                type="button"
                className={styles["back-item-text"]}
                onClick={(event) => {
                  event.stopPropagation();
                  // Toggle active: if clicked again, deactivate
                  setActiveIndex(isActive ? null : index);
                }}
              >
                {item}
              </button>
              <span
                className={`${styles["back-item-dot"]} ${
                  isActive ? styles["back-item-dot-active"] : ""
                }`}
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function CardContainer({ card }: any) {
  const positionClasses =
    card.id === 4
      ? "col-start-4 row-start-1 col-span-1 row-span-2 rounded-xl sm:rounded-2xl lg:rounded-3xl"
      : card.span;

  const commonClasses = `${card.color} rounded-xl sm:rounded-2xl lg:rounded-3xl ${
    !card.isSplit ? "p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-6" : ""
  } flex flex-col justify-between text-white shadow-xl transition-transform cursor-pointer overflow-hidden h-full`;

  const renderContent = () => {
    if (card.isSplit) return <SplitCard card={card} />;
    if (card.image) return <ImageCard card={card} />;
    if (card.cardTextImage) return <CardTextImage card={card} />;
    return <TextCard card={card} />;
  };

  if (card.flippable) {
    return (
      <FlipCard
        card={card}
        parentClass={positionClasses}
        childrenClassContainer={commonClasses}
        backContent={
          <BackActionList items={card.backItems} />
        }
      >
        {renderContent()}
      </FlipCard>
    );
  }

  return (
    <div key={card.id} className={`${positionClasses} ${commonClasses} group relative`}>
      {renderContent()}
    </div>
  );
}