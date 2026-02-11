import React from 'react'




export default function FlipCard({card}:any,{ children }: { children: React.ReactNode }) {
  return (
    
     <div className={`${positionClasses} group perspective-1000 relative rounded-xl sm:rounded-2xl lg:rounded-3xl h-full cursor-pointer`}
           onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`flip-wrapper w-full h-full relative preserve-3d transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isFlipped ? 'rotate-y-180' : ''}`}>
           <div className={`flip-front absolute inset-0 backface-hidden ${commonClasses} z-10`}>
              {renderContent()}
           </div>
           <div className={`flip-back absolute inset-0 backface-hidden ${commonClasses} rotate-y-180`}>
              {/* Empty back face */}
           </div>
        </div>
      </div>
  )
}
