"use client";
import { getDescSizeClass, getTitleSizeClass } from '@/app/Shared/Functions';
import styles from "../CardContainer.module.css";
import React, { useState, useRef, useEffect } from 'react';

export default function CardTextImage({ 
  card, 
  onFlip, 
  onColorChange,
  onMenuOpenChange,
  onUploadOpen,
  currentColor
}: { 
  card: any; 
  onFlip?: () => void; 
  onColorChange?: (color: string) => void;
  onMenuOpenChange?: (isOpen: boolean) => void;
  onUploadOpen?: () => void;
  currentColor?: string;
}) {
  const specialCards = [8];
  const isSpecial = specialCards.includes(card.id);

  const [isEditing, setIsEditing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const colorPickerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textareas
  useEffect(() => {
    if (isEditing) {
      if (titleRef.current) {
        titleRef.current.style.height = 'auto';
        titleRef.current.style.height = titleRef.current.scrollHeight + 'px';
      }
      if (descRef.current) {
        descRef.current.style.height = 'auto';
        descRef.current.style.height = descRef.current.scrollHeight + 'px';
      }
    }
  }, [isEditing, title, description]);

  const colors = [
    { name: "Blush Pink", value: "bg-[#FFD3D2]" },
    { name: "Purple", value: "bg-[var(--color-primary)]" },
    { name: "Dark Gray", value: "bg-[var(--dark-bg)]" },
    { name: "Neon Green", value: "bg-[var(--green)]" },
    { name: "White", value: "bg-[white]" },
  ];

  const textColor = card.id === 8 ? "text-black" : "text-white";
  const inputTextColor = card.id === 8 ? "#000" : "#fff";
  const inputBorderColor = card.id === 8 ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)";

  // Notify parent when menu opens/closes
  useEffect(() => {
    onMenuOpenChange?.(showColorPicker);
  }, [showColorPicker, onMenuOpenChange]);

  // Close color picker on outside click
  useEffect(() => {
    if (!showColorPicker) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node)) {
        setShowColorPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showColorPicker]);

  const handleEditToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing((prev) => !prev);
  };

  const icons = (
    <div className={`flex flex-col gap-1 shrink-0 ml-3 absolute right-edit-icons ${showColorPicker ? "z-[999]" : ""}`}>
      {/* Edit / Save icon */}
      <img
        src={
          isEditing
            ? (isSpecial ? "/cards/saveicon.svg" : "/cards/savewhiteicon.svg")
            : (isSpecial ? "/cards/editicon.svg" : "/cards/editwhiteicon.svg")
        }
        className="w-4.5 h-4.5  cursor-pointer"
        onClick={handleEditToggle}
      />
      <img 
        src={isSpecial ? "/cards/uploadicon.svg" : "/cards/uploadwhiteicon.svg"} 
        className="w-4.5 h-4.5   cursor-pointer" 
        onClick={(e) => { e.stopPropagation(); onUploadOpen?.(); }}
      />
      <img
        src={isSpecial ? "/cards/flipicon.svg" : "/cards/flipwhiteicon.svg"}
        className="w-4.5 h-4.5  cursor-pointer"
        onClick={(e) => { e.stopPropagation(); onFlip?.(); }}
      />
      {/* Palette icon + dropdown (opens upward, centered) */}
      <div className="relative" ref={colorPickerRef}>
        <img
          src={isSpecial ? "/cards/paletteicon.svg" : "/cards/palettewhiteicon.svg"}
          className="w-4.5 h-4.5  cursor-pointer"
          onClick={(e) => { e.stopPropagation(); setShowColorPicker(!showColorPicker); }}
        />
        {showColorPicker && (
          <div
            className="absolute z-[9999] bg-[#242424] rounded-2xl p-3 shadow-2xl min-w-[180px]"
            style={{ right: '0%',  top: '-120px' ,transform: "scale(0.7) translateX(20%)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              {colors.map((color) => (
                <div
                  key={color.name}
                  className="flex items-center justify-between gap-3 cursor-pointer rounded-xl px-2 py-1.5 transition-colors group"
                  style={{
                    backgroundColor: hoveredColor === color.name ? 'rgba(255,255,255,0.08)' : 'transparent',
                  }}
                  onMouseEnter={() => setHoveredColor(color.name)}
                  onMouseLeave={() => setHoveredColor(null)}
                  onClick={() => {
                    onColorChange?.(color.value);
                    setShowColorPicker(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full ${color.value} border border-white/10`} />
                    <span className="text-white text-sm font-medium font-gtwalsheim transition-colors" style={{ opacity: (hoveredColor === color.name || currentColor === color.value) ? 1 : 0.75 }}>
                      {color.name}
                    </span>
                  </div>
                  {(currentColor === color.value || hoveredColor === color.name) && (
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className="shrink-0">
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {card.layoutType === "column" ? (
        <div className={`relative flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3 flex-1 ${showColorPicker ? "overflow-visible" : ""}`}>
          <div className="flex flex-row items-start justify-between relative">
            {/* Title inline editable */}
            {isEditing ? (
              <textarea
                ref={titleRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                rows={1}
                className={`w-full bg-transparent outline-none border-none resize-none overflow-hidden ${getTitleSizeClass(card.id)} ${textColor} font-bold`}
                style={{ color: inputTextColor, lineHeight: '1.2' }}
              />
            ) : (
              <h2 className={`whitespace-pre-line ${getTitleSizeClass(card.id)} ${textColor}`}>{title}</h2>
            )}
            {icons}
          </div>
          <div className="flex justify-center items-center flex-1 h-full">
            {card.cardTextImage && <img src={card.cardTextImage} alt={title} className="  object-contain shrink-0 " />}
          </div>
          {/* Description inline editable */}
          {isEditing ? (
            <textarea   
              ref={descRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows={1}
              className={`w-full bg-transparent outline-none border-none resize-none overflow-hidden ${getDescSizeClass(card.id)} ${textColor}`}
              style={{ color: inputTextColor, lineHeight: '1.4' }}
            />
          ) : (
            <p className={`whitespace-pre-line ${getDescSizeClass(card.id)} ${textColor}`}>{description}</p>
          )}
        </div>
      ) : (
        <div className={`relative flex flex-row items-start flex-1 ${showColorPicker ? "overflow-visible" : ""}`}>
          <div className={`flex flex-col flex-1  ${styles[`card-${card.id}`]}`}>
            {/* Title inline editable */}
            {isEditing ? (
              <textarea
                ref={titleRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                rows={1}
                className={`w-full bg-transparent outline-none border-none resize-none overflow-hidden ${getTitleSizeClass(card.id)} ${textColor} font-bold`}
                style={{ color: inputTextColor, lineHeight: '1.2' }}
              />
            ) : (
              <h2 className={`whitespace-pre-line ${getTitleSizeClass(card.id)} ${textColor}`}>{title}</h2>
            )}
          </div>
          <img src={card.cardTextImage} alt={title} className="object-contain shrink-0 mr-8"  />
          {icons}
        </div>
      )}

      <div className={`${styles[`card-icon-${card.id}`]} flex justify-between items-end relative`}>
        {isEditing && card.id!=5 ? (
          <textarea
            ref={descRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"   
            rows={1}
            className={`w-full bg-transparent outline-none border-none resize-none overflow-hidden ${getDescSizeClass(card.id)} ${textColor}`}
            style={{ color: inputTextColor, lineHeight: '1.4' }}
          />
        ) : (
          <p className={`whitespace-pre-line ${getDescSizeClass(card.id)} ${textColor}`}>{card.id === 10 || card.id==5 || card.id==3? "" : description}</p>
        )}
        <img src="/cards/Buttom Icon.svg" alt="icon" className="w-5 h-5 absolute right-0 bottom-[-7]" />
      </div>
    </>
  );
}