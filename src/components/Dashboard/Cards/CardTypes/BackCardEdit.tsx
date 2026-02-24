"use client";

import React from "react";
import styles from "../CardContainer.module.css";

type EditBackCardProps = {
  card: any;
  onFlip?: () => void;
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

export default function EditBackCard({ card, onFlip }: EditBackCardProps) {
  const info = cardUploadInfo[card.id] ?? { width: 334, height: 193 };

  const handleUpload = () => {
    // upload logic here — trigger file input
    document.getElementById(`upload-input-${card.id}`)?.click();
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full bg-[var(--dark-bg)] rounded-xl px-6 py-4">
      
      {/* Reset icon - top right */}
     <img src= "/cards/flipwhiteicon.svg"    className="w-5 h-5 absolute top-6 right-3 cursor-pointer" 
        onClick={(e) => { e.stopPropagation(); onFlip?.(); }}
      />
  
      {/* Hidden file input */}
      <input
        id={`upload-input-${card.id}`}
        type="file"
        accept=".png,.jpg,.jpeg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) console.log("uploaded file:", file.name);
        }}
      />

      {/* Upload button */}
      <button
        onClick={handleUpload}
        className="mb-4 px-6 py-2 rounded-full border border-white text-white text-sm font-semibold hover:bg-white hover:text-black transition-colors"
        style={{ fontFamily: "GT Walsheim",  fontWeight:"600"}}
      >
        Upload
      </button>

      {/* Info text */}
      <p
        className="text-white text-center leading-relaxed"
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
    </div>
  );
}