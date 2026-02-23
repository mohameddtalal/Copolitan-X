"use client";
import React from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation({
  currentPage,
  totalPages,
  setCurrentPage,
  pages,
  onPrev,
  onNext,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: Function;
  pages: any[];
  onPrev: () => void;
  onNext: () => void;
}) {
  const pathname = usePathname();
  const isWhiteTheme = pathname !== "/dashboard"; // ✅ only exact /dashboard is dark

  return (
    <div className="flex items-center justify-between shrink-0 px-2 sm:px-4 md:px-3 lg:px-3 xl:px-3 ">
      <div className="flex justify-between w-full items-center mb-1">

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

        {/* Page Indicators */}
        <div className="flex justify-center gap-2 shrink-0 ">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-4 cursor-pointer rounded-full transition-all ${
                currentPage === index
                  ? `w-5 sm:w-7 ${isWhiteTheme ? 'bg-[#777777]' : 'bg-white'}`
                  : `w-3 ${isWhiteTheme ? 'bg-[#B1B1B1]' : 'bg-white/30'}`
              }`}
            />
          ))}
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
    </div>
  );
}