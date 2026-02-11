'use client'
import { getDescSizeClass, getTitleSizeClass } from "@/app/Shared/Functions";
import styles from "./BadgeCard.module.css";



export default function SplitCard({ card }: any){
    return(   
        <div className="flex flex-col h-full gap-2 sm:gap-3 lg:gap-4  ">
          {/* Top section - Profile and info in row */}
          <div className="flex flex-row items-center gap-2 sm:gap-3 p-1.5 sm:p-2 md:p-2.5 lg:p-3 xl:p-4 bg-[#7029CF] rounded-xl sm:rounded-2xl lg:rounded-3xl">
            {/* Profile Image */}
            {card.profileImage && (
              <img
                src={card.profileImage}
                alt={card.title}
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full shrink-0 object-cover"
              />
            )}
            {/* Title and Description in column */}
            <div className="flex flex-col justify-center flex-1">
              <h2
                className={`lora-semibold-italic whitespace-pre-line ${getTitleSizeClass(card.id)}`}
              >
                {card.title}
              </h2>
              <p
                className={`font-gtwalsheim whitespace-pre-line ${getDescSizeClass(card.id)}`}
              >
                {card.description}
              </p>
            </div>
          </div>
          {/* Bottom section - Character Image */}
          <div className= {`rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden flex items-center justify-center ${styles[`card-image-${card.id}`]}`} >
            {card.characterImage && (
              <img
                src={card.characterImage}
                alt="character"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      );
}