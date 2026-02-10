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
    <div className="flex items-center justify-between  shrink-0 px-1 sm:px-1 md:px-1 lg:px-2 xl:px-3  ">
      <div className="flex  justify-between w-full items-center mb-2">
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
            className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6"
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
            className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6"
          />
        </button>
      </div>
    </div>
  );
}
