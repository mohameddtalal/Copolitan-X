"use client";
import React, { useState } from 'react';
import styles from "../CardContainer.module.css";
import { getDescSizeClass, getTitleSizeClass } from '@/app/Shared/Functions';

export default function TextCard({ card, onFlip }: { card: any; onFlip?: () => void }) {
  const specialCards = [6, 7, 12, 13, 3, 11];
  const isSpecial = specialCards.includes(card.id);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [tempTitle, setTempTitle] = useState(card.title);
  const [tempDesc, setTempDesc] = useState(card.description);

  const textColor = card.id === 8 || card.id === 1 || card.id === 9 || card.id === 15 ? "text-black" : "text-white";
  const inputTextColor = card.id === 8 || card.id === 1 || card.id === 9 || card.id === 15 ? "#000" : "#fff";
  const inputBorderColor = card.id === 8 || card.id === 1 || card.id === 9 || card.id === 15 ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)";

  const handleEditOpen = () => { setTempTitle(title); setTempDesc(description); setIsEditing(true); };
  const handleSave = () => { setTitle(tempTitle); setDescription(tempDesc); setIsEditing(false); };
  const handleCancel = () => setIsEditing(false);

  return (
    <>
      <div className={styles[`card-${card.id}`]}>

        {isEditing && (
          <div className="absolute inset-0 z-20 flex flex-col justify-center gap-3 px-4 py-4 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-black/60 backdrop-blur-sm">
            <input
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              placeholder="Title"
              className="w-full rounded-lg px-3 py-2 text-sm font-semibold bg-transparent border outline-none"
              style={{ color: inputTextColor, borderColor: inputBorderColor, fontFamily: "GT Walsheim" }}
            />
            <textarea
              value={tempDesc}
              onChange={(e) => setTempDesc(e.target.value)}
              placeholder="Description"
              rows={3}
              className="w-full rounded-lg px-3 py-2 text-sm bg-transparent border outline-none resize-none"
              style={{ color: inputTextColor, borderColor: inputBorderColor, fontFamily: "GT Walsheim" }}
            />
            <div className="flex gap-2 justify-end">
              <button onClick={handleCancel} className="px-3 py-1 rounded-lg text-xs border" style={{ color: inputTextColor, borderColor: inputBorderColor, fontFamily: "GT Walsheim" }}>Cancel</button>
              <button onClick={handleSave} className="px-3 py-1 rounded-lg text-xs bg-[var(--color-primary)] text-white" style={{ fontFamily: "GT Walsheim" }}>Save</button>
            </div>
          </div>
        )}

        <div className="flex flex-row items-start justify-between">
          <h2 className={`mb-0.5 sm:mb-1 md:mb-1.5 lg:mb-2 xl:mb-3 whitespace-pre-line ${getTitleSizeClass(card.id)} ${textColor}`}>
            {title}
          </h2>
          <div className="flex flex-col gap-2 shrink-0 ml-3">
            <img src={isSpecial ? "/cards/editwhiteicon.svg" : "/cards/editicon.svg"} className="w-5 h-5 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleEditOpen(); }} />
           {(card.id === 3 || card.id === 11) && (
                <img src="/cards/uploadwhiteicon.svg" className="w-5 h-5" />
              )}
            <img
              src={isSpecial ? "/cards/flipwhiteicon.svg" : "/cards/flipicon.svg"}
              className="w-5 h-5 cursor-pointer"
              onClick={(e) => { e.stopPropagation(); onFlip?.(); }}
            />
            <img src={isSpecial ? "/cards/palettewhiteicon.svg" : "/cards/paletteicon.svg"} className="w-5 h-5" />
          </div>
        </div>

        <p className={`whitespace-pre-line ${getDescSizeClass(card.id)} ${textColor}`}>{description}</p>
      </div>

      <div className={`${styles[`card-icon-${card.id}`]} flex justify-end`}>
        <img src="/cards/Buttom Icon.svg" alt="icon" className="w-6 h-6 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      </div>
    </>
  );
}