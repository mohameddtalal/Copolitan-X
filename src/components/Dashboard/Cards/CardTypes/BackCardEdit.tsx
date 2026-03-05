"use client";

import React, { useState } from "react";
import styles from "../CardContainer.module.css";
import {XIcon } from "lucide-react";

type EditBackCardProps = {
  card: any;
  onFlip?: () => void;
  onUploadOpen?: () => void;
};

// Each card gets its own upload info based on its size
const cardUploadInfo: Record<number, { width: number; height: number }> = {
  1:  { width: 334, height: 193.67 },
  2:  { width: 334, height: 193 },
  3:  { width: 334, height: 411.33 },
  4:  { width: 334, height: 193 },
  5:  { width: 334, height: 411.33 },
  6:  { width: 334, height: 193.67 },
  7:  { width: 334, height: 193.67 },
  8:  { width: 693, height: 203 },
  9:  { width: 334, height: 193.67 },
  10: { width: 334, height: 411.33 },
  11: { width: 334, height: 411.33 },
  12: { width: 334, height: 193.67 },
  13: { width: 334, height: 193.67 },
  14: { width: 693, height: 203 },
  15: { width: 334, height: 193.67 },
};

export default function EditBackCard({ card, onFlip, onUploadOpen }: EditBackCardProps) {
  const [showInstructions, setShowInstructions] = useState(false);
  const info = cardUploadInfo[card.id] ?? { width: 334, height: 193 };

  const handleUpload = () => {
    onUploadOpen?.();
    setShowInstructions(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full bg-[var(--dark-bg)] rounded-xl sm:rounded-2xl lg:rounded-3xl  overflow-hidden">
      
      {/* Top icons */}
      <div className="absolute top-1 right-1 flex gap-3 z-20">
        {card.lockedImage && !showInstructions && (
          <button 
            onClick={(e) => { e.stopPropagation(); setShowInstructions(true); }}
            className="text-white/70 hover:text-white transition-colors"
            title="Show Instructions"
          >
            <XIcon size={22} />
          </button>
        )}
        <img 
          src="/cards/flipwhiteicon.svg" 
          className="w-4.5 h-4.5 cursor-pointer"
          onClick={(e) => { e.stopPropagation(); onFlip?.(); }}
          title="Flip to Front"
        />
      </div>
  
      {/* Upload button */}
      <button
        onClick={handleUpload}
        className="mb-3 px-5 py-2 rounded-full border border-white text-white text-sm font-semibold hover:bg-white hover:text-black transition-colors z-10"
        style={{ fontFamily: "GT Walsheim",  fontWeight:"600"}}
      >
        Upload
      </button>

      {/* Preview or Info text */}
      {card.lockedImage && !showInstructions ? (
        <>
          <div className="absolute inset-0 w-full h-full z-0">
            <img src={card.lockedImage} alt="Locked Preview" className="w-full h-full object-cover rounded-xl sm:rounded-2xl lg:rounded-3xl" />
          </div>
          {/* Subtle overlay to keep buttons readable */}
          <div className="absolute inset-0 bg-black/20 rounded-xl sm:rounded-2xl lg:rounded-3xl pointer-events-none" />
        </>
      ) : (
        <p
          className="text-white text-center leading-relaxed z-10"
          style={{
            fontFamily: "GT Walsheim",
            fontWeight:"600",
            fontSize: "clamp(0.625rem, 0.4rem + 0.5vw, 0.875rem)",
          }}
        >
          Browse here to start uploading
          <br />
          Supports PNG, JPG, JPEG,
          <br />
          Max size: {info.width}×{info.height} px
        </p>
      )}
    </div>
  );
}