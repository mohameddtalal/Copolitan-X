import React from 'react';

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
  setCurrentPage:Function,
  pages:any[],
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between  shrink-0 px-2 sm:px-4 md:px-3 lg:px-3 xl:px-3  ">
      <div className="flex  justify-between w-full items-center mb-1">
        <button
          onClick={onPrev}
          disabled={currentPage === 0}
          className={`rounded-full  transition-all ${
            currentPage === 0 ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <img
            src={currentPage === 0 ? "/cards/DimmedLeft.svg" : "/cards/Left.svg"}
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
                        className={`h-4 cursor-pointer rounded-full transition-all ${currentPage === index ? 'w-5 sm:w-7 bg-white' : 'w-3 bg-white/30'
                            }`}
                    />
                ))}
            </div>
        <button
          onClick={onNext}
          disabled={currentPage === totalPages - 1}
          className={`rounded-full transition-all   ${
            currentPage === totalPages - 1 ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          <img
            src={currentPage === totalPages - 1 ? "/cards/DimmedRight.svg" : "/cards/Right.svg"}
            alt="Next"
            className="w-7 h-7 sm:w-7 sm:h-7 lg:w-9 lg:h-9"
          />
        </button>
      </div>
    </div>
  );
}
