"use client";
import React, { useState } from "react";
import SplitCard from "./CardTypes/SplitCard";
import ImageCard from "./CardTypes/ImageCard";
import TextCardEdit from "./CardTypes/TextCardEdit";
import FlipCardEdit from "./CardTypes/FlipCardEdit";
import CardTextImageEdit from "./CardTypes/CardTextImageEdit";
import SplitCardEdit from "./CardTypes/SplitCardEdit";
import BackCardEdit from "./CardTypes/BackCardEdit";
import UploadModal from "../Modals/UploadModal";
import styles from "./CardContainer.module.css"

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
  pageIndex:number
}

export default function CardContainer({ card,pageIndex }: CardContainerProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [bgColor, setBgColor] = useState(card.color || "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadTarget, setUploadTarget] = useState<"cardTextImage" | "characterImage" | "lockedImage" | null>(null);

  // States for dynamic images
  const [cardTextImage, setCardTextImage] = useState(card.cardTextImage || "");
  const [characterImage, setCharacterImage] = useState(card.characterImage || "");
  const [lockedImage, setLockedImage] = useState(""); // Start empty as requested

  const positionClasses =
    card.id === 4
      ? `card-grid-${card.id} col-span-1 row-span-2 rounded-xl sm:rounded-2xl lg:rounded-3xl  scrollbar-hide `
      : card.span +` card-grid-${card.id} ${card.id==10&&pageIndex==2?"order-card-3":""}`;

  const hasAccess = card.hasAccess !== false;
  // If a locked image is uploaded, we treat it as "Locked" for the front face visualization
  const isLocked = Boolean(lockedImage);

  const commonClasses = `
    ${bgColor}
    rounded-xl sm:rounded-2xl lg:rounded-3xl
      ${!card.isSplit ? `grid-padding card-grid-${card.id} ` : ""}
    flex flex-col justify-between
    text-white ${card.id !==2 && !isMenuOpen ? " scrollbar-hide ":""}
    transition-transform cursor-default
    ${isMenuOpen ? "overflow-visible" : "overflow-hidden"}
    h-full 
  `;

  const backCommonClasses = `
  ${bgColor}
  rounded-xl sm:rounded-2xl lg:rounded-3xl
  flex flex-col justify-between
  text-white ${card.id !==2 && !isMenuOpen ? " scrollbar-hide ":""}
  transition-transform cursor-default
  ${isMenuOpen ? "overflow-visible" : "overflow-hidden"}
  h-full 
`;

  const handleOpenUpload = (target: "cardTextImage" | "characterImage" | "lockedImage") => {
    setUploadTarget(target);
    setIsUploadModalOpen(true);
  };

  const handleUploadComplete = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (uploadTarget === "cardTextImage") setCardTextImage(result);
      else if (uploadTarget === "characterImage") setCharacterImage(result);
      else if (uploadTarget === "lockedImage") setLockedImage(result);
    };
    reader.readAsDataURL(file);
    setIsUploadModalOpen(false);
    setUploadTarget(null);
  };

  const renderContent = () => {
    // Merge card data with local state
    const enhancedCard = { ...card, cardTextImage, characterImage, lockedImage };

    if (card.isSplit) return <SplitCardEdit card={enhancedCard} onUploadOpen={() => handleOpenUpload("characterImage")} />;
    if (card.image) return <ImageCard card={enhancedCard} />;
    
    // If it has a cardTextImage (or we just uploaded one), use CardTextImageEdit
    if (cardTextImage || card.cardTextImage) {
      return (
        <CardTextImageEdit 
          card={enhancedCard} 
          onFlip={() => setIsFlipped((p) => !p)} 
          onColorChange={(color) => setBgColor(color)} 
          onMenuOpenChange={setIsMenuOpen} 
          onUploadOpen={() => handleOpenUpload("cardTextImage")} 
          currentColor={bgColor}
        />
      );
    }
    
    return (
      <TextCardEdit 
        card={enhancedCard} 
        onFlip={() => setIsFlipped((p) => !p)} 
        onColorChange={(color) => setBgColor(color)} 
        onMenuOpenChange={setIsMenuOpen} 
        onUploadOpen={() => handleOpenUpload("cardTextImage")} 
        currentColor={bgColor}
      />
    );
  };

  return (
    <>
      {card.flippable === true || card.flippable === false ? (
        <div className={`${positionClasses} relative ${isMenuOpen ? "z-[9999] !overflow-visible" : ""}`}>
          <FlipCardEdit
            card={card}
            parentClass="w-full h-full"
            childrenClassContainer={commonClasses}
            backChildrenClassContainer={backCommonClasses}
            backContent={<BackCardEdit card={{...card, lockedImage}} onFlip={() => setIsFlipped((p) => !p)} onUploadOpen={() => handleOpenUpload("lockedImage")} onRemoveImage={() => setLockedImage("")} />}
            isFlipped={isFlipped}
            isMenuOpen={isMenuOpen}
          >
            {renderContent()}
          </FlipCardEdit>
        </div>
      ) : (
        <div key={card.id} className={`${positionClasses} ${commonClasses} group relative ${isMenuOpen ? "z-[9999] !overflow-visible" : ""}`}>
          {renderContent()}
        </div>
      )}

      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => {
          setIsUploadModalOpen(false);
          setUploadTarget(null);
        }} 
        cardId={card.id}
        onUpload={handleUploadComplete}
      />
    </>
  );
}