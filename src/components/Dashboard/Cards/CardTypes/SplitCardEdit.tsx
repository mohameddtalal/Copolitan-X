'use client';
import { getDescSizeClass, getTitleSizeClass } from "@/app/Shared/Functions";
import styles from "../CardContainer.module.css";
import { usePathname } from "next/navigation";

type SplitCardProps = {
  card: any;
};

export default function SplitCard({ card }: SplitCardProps) {
  const pathname = usePathname();
  const isWhiteTheme = pathname !== "/dashboard";

  return (
    <div
      className={`
        flex flex-col h-full gap-2 sm:gap-3 lg:gap-4 
        rounded-xl sm:rounded-2xl lg:rounded-3xl
        ${isWhiteTheme ? "bg-white text-black" : "bg-[var(--background)] text-white"} shadow-xl
      `}
    >
      {/* Top section - Profile and info */}
      <div
        className={`
          flex flex-row items-center gap-2 sm:gap-3 
          p-1 sm:p-1 md:p-1.5 lg:p-2 xl:p-2 
          rounded-xl sm:rounded-2xl lg:rounded-3xl
          bg-[var(--color-primary)]
        `}
      >
        {card.profileImage && (
          <img
            src={card.profileImage}
            alt={card.title}
            className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full shrink-0 object-cover"
          />
        )}
        <div className="flex flex-col justify-center flex-1">
          <h2 className={`whitespace-pre-line text-white ${getTitleSizeClass(card.id)}`}>
            {card.title}
          </h2>
          <p className={`whitespace-pre-line text-white ${getDescSizeClass(card.id)}`}>
            {card.description}
          </p>
        </div>
      </div>

      {/* Bottom section - Character Image with upload icon */}
      <div className={`relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden flex items-center justify-center ${styles[`card-image-${card.id}`]} ${isWhiteTheme ? "bg-gray-100" : "bg-[var(--dark-bg)]"}`}>
        
        {/* Upload icon - top right corner */}
        <div className="absolute top-5 right-2 z-10">
          <img
            src="/cards/uploadicon.svg"
            alt="upload"
            className="w-5 h-5"
          />
        </div>

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