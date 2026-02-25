"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import AnimatedToggle from './AnimatedToggle';

export default function Navigation({
  currentPage,
  totalPages,
  setCurrentPage,
  pages,
  onPrev,
  onNext,
  showToggle,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Function;
  pages: any[];
  onPrev: () => void;
  onNext: () => void;
  showToggle?: boolean;
}) {
  const pathname = usePathname();
  const isWhiteTheme = pathname !== "/dashboard"; // ✅ only exact /dashboard is dark

  return (
    <div className="flex items-end justify-between shrink-0 mb-1 mt-2 relative" style={{ paddingInline: 'var(--container-margin)' }}>
      {/* Prev Button */}
      <button
        onClick={onPrev}
        disabled={currentPage === 0}
        className={`rounded-full transition-all ${
          currentPage === 0 ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <img
          src={
            currentPage === 0
              ? isWhiteTheme ? "/cards/DimmedLeft-white.svg" : "/cards/DimmedLeft.svg"
              : isWhiteTheme ? "/cards/Left-white.svg" : "/cards/Left.svg"
          }
          alt="Previous"
          className="w-7 h-7 sm:w-7 sm:h-7 lg:w-9 lg:h-9"
        />
      </button>

      {/* Center Section: Toggle + Indicators */}
      <div className="flex flex-col items-center gap-4">
        {showToggle && <AnimatedToggle />}
        
        {/* Page Indicators */}
        <div className="flex justify-center gap-3 shrink-0 ">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-4 rounded-full transition-all duration-300 ${
                currentPage === index
                  ? `w-12 ${isWhiteTheme ? 'bg-[#777777]' : 'bg-white'}`
                  : `w-4 ${isWhiteTheme ? 'bg-[#B1B1B1]' : 'bg-white/30'}`
              }`}
            />
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
        className={`rounded-full transition-all ${
          currentPage === totalPages - 1 ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <img
          src={
            currentPage === totalPages - 1
              ? isWhiteTheme ? "/cards/DimmedRight-white.svg" : "/cards/DimmedRight.svg"
              : isWhiteTheme ? "/cards/Right-white.svg" : "/cards/Right.svg"
          }
          alt="Next"
          className="w-7 h-7 sm:w-7 sm:h-7 lg:w-9 lg:h-9"
        />
      </button>
    </div>
  );
}