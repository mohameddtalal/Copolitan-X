import React from 'react';

export default function Navigation({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-1.5 sm:mb-3 shrink-0">
      <div className="flex gap-2 sm:gap-3 justify-between w-full">
        <button
          onClick={onPrev}
          disabled={currentPage === 0}
          className={`rounded-full p-0.5 sm:p-0.6 md:p-0.8 lg:p-1 xl:p-2 transition-all ${
            currentPage === 0 ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <img
            src={currentPage === 0 ? "/cards/DimmedLeft.svg" : "/cards/Left.svg"}
            alt="Previous"
            className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6"
          />
        </button>

        <button
          onClick={onNext}
          disabled={currentPage === totalPages - 1}
          className={`rounded-full p-0.5 sm:p-0.6 md:p-0.8 lg:p-1 xl:p-2 transition-all ${
            currentPage === totalPages - 1 ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <img
            src={currentPage === totalPages - 1 ? "/cards/DimmedRight.svg" : "/cards/Right.svg"}
            alt="Next"
            className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6"
          />
        </button>
      </div>
    </div>
  );
}
