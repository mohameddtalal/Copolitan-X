import React, { useState } from 'react'

import styles from "./BadgeCard.module.css";


export default function FlipCard({card,children, parentClass,childrenClassContainer}:any) {
const [isFlipped, setIsFlipped] = useState(false);

  return (
    
     <div className={`${parentClass} group ${styles["perspective-1000"]} relative rounded-xl sm:rounded-2xl lg:rounded-3xl h-full cursor-pointer`}
           onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`${styles["flip-wrapper"]} w-full h-full relative preserve-3d transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isFlipped ? 'rotate-y-180' : ''}`}>
           <div className={`${styles["flip-front"]} absolute inset-0 backface-hidden ${childrenClassContainer} z-10`}>
              {children}
           </div>
           <div className={`${styles["flip-back"]} absolute inset-0 backface-hidden ${childrenClassContainer} rotate-y-180`}>
              {/* Empty back face */}
           </div>
        </div>
      </div>
  )
}
