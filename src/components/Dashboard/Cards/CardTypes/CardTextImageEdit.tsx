"use client";
import { getDescSizeClass, getTitleSizeClass } from '@/app/Shared/Functions';
import styles from "../CardContainer.module.css";
import React, { useState } from 'react';

export default function CardTextImage({ card, onFlip }: { card: any; onFlip?: () => void }) {
  const specialCards = [8];
  const isSpecial = specialCards.includes(card.id);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [tempTitle, setTempTitle] = useState(card.title);
  const [tempDesc, setTempDesc] = useState(card.description);

  const textColor = card.id === 8 ? "text-black" : "text-white";
  const inputTextColor = card.id === 8 ? "#000" : "#fff";
  const inputBorderColor = card.id === 8 ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)";

  const handleEditOpen = () => { setTempTitle(title); setTempDesc(description); setIsEditing(true); };
  const handleSave = () => { setTitle(tempTitle); setDescription(tempDesc); setIsEditing(false); };
  const handleCancel = () => setIsEditing(false);

  const EditModal = (
    <div className="absolute inset-0 z-20 flex flex-col justify-center gap-3 px-4 py-4 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-black/60 backdrop-blur-sm">
      <input value={tempTitle} onChange={(e) => setTempTitle(e.target.value)} placeholder="Title" className="w-full rounded-lg px-3 py-2 text-sm font-semibold bg-transparent border outline-none" style={{ color: inputTextColor, borderColor: inputBorderColor, fontFamily: "GT Walsheim" }} />
      <textarea value={tempDesc} onChange={(e) => setTempDesc(e.target.value)} placeholder="Description" rows={3} className="w-full rounded-lg px-3 py-2 text-sm bg-transparent border outline-none resize-none" style={{ color: inputTextColor, borderColor: inputBorderColor, fontFamily: "GT Walsheim" }} />
      <div className="flex gap-2 justify-end">
        <button onClick={handleCancel} className="px-3 py-1 rounded-lg text-xs border" style={{ color: inputTextColor, borderColor: inputBorderColor, fontFamily: "GT Walsheim" }}>Cancel</button>
        <button onClick={handleSave} className="px-3 py-1 rounded-lg text-xs bg-[var(--color-primary)] text-white" style={{ fontFamily: "GT Walsheim" }}>Save</button>
      </div>
    </div>
  );

  const icons = (
    <div className="flex flex-col gap-2 shrink-0 ml-3">
      <img src={isSpecial ? "/cards/editicon.svg" : "/cards/editwhiteicon.svg"} className="w-5 h-5 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleEditOpen(); }} />
      <img src={isSpecial ? "/cards/uploadicon.svg" : "/cards/uploadwhiteicon.svg"} className="w-5 h-5" />
      <img
        src={isSpecial ? "/cards/flipicon.svg" : "/cards/flipwhiteicon.svg"}
        className="w-5 h-5 cursor-pointer"
        onClick={(e) => { e.stopPropagation(); onFlip?.(); }}
      />
      <img src={isSpecial ? "/cards/paletteicon.svg" : "/cards/palettewhiteicon.svg"} className="w-5 h-5" />
    </div>
  );

  return (
    <>
      {card.layoutType === "column" ? (
        <div className="relative flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3 flex-1">
          {isEditing && EditModal}
          <div className="flex flex-row items-start justify-between">
            <h2 className={`whitespace-pre-line ${getTitleSizeClass(card.id)} ${textColor}`}>{title}</h2>
            {icons}
          </div>
          <div className="flex justify-center items-center flex-1 h-full">
            {card.cardTextImage && <img src={card.cardTextImage} alt={title} className="w-20 h-20 sm:w-15 sm:h-15 md:w-18 md:h-18 lg:w-20 lg:h-20 xl:w-22 xl:h-22 object-contain shrink-0" />}
          </div>
          <p className={`whitespace-pre-line ${getDescSizeClass(card.id)} ${textColor}`}>{description}</p>
        </div>
      ) : (
        <div className="relative flex flex-row gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3 items-start h-full">
          {isEditing && EditModal}
          <div className={`flex flex-col flex-1 gap-0.5 sm:gap-0.5 md:gap-1 lg:gap-1.5 xl:gap-2 ${styles[`card-${card.id}`]}`}>
            <h2 className={`whitespace-pre-line ${getTitleSizeClass(card.id)} ${textColor}`}>{title}</h2>
          </div>
          <img src={card.cardTextImage} alt={title} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 object-contain shrink-0" />
          {icons}
        </div>
      )}

      <div className={`${styles[`card-icon-${card.id}`]} flex justify-between items-end`}>
        <p className={`whitespace-pre-line ${getDescSizeClass(card.id)} ${textColor}`}>{card.id === 10 ? "" : description}</p>
        <img src="/cards/Buttom Icon.svg" alt="icon" className="w-6 h-6 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      </div>
    </>
  );
}