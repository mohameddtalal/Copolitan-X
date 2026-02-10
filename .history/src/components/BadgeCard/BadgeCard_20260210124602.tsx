import { motion } from "framer-motion";
import styles from "./BadgeCard.module.css";

export default function BadgeCard({ card }: any) {
  const getTitleSizeClass = (id: number) => {
    if ([3, 5, 8, 10, 11, 14].includes(id)) return "title-lg";
    if ([9, 12, 13, 15].includes(id)) return "title-md";
    if ([ 6, 7].includes(id)) return "title-sm";
    return "title-md";
  };

  const getDescSizeClass = (id: number) => {
    if ([3, 5, 8, 10, 11, 14].includes(id)) return "desc-lg";
    if ([9, 12, 12, 15].includes(id)) return "desc-md";
    if ([1, 6, 7].includes(id)) return "desc-sm";
    return "desc-md";
  };

  const renderContent = () => {
    if (card.isSplit) {
      return (
        <div className="flex flex-col h-full gap-2 sm:gap-3 lg:gap-4 sm:gap-3 ">
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

    if (card.image) {
      return (
        <>
          <div className="absolute inset-0">
            {card.id === 2 ? (
              <>
                <motion.img
                  src="/cards/frame.svg"
                  alt="frame"
                  className="w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                />
                <img
                  src="/cards/X.svg"
                  alt="X"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 object-contain"
                />
              </>
            ) : (
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full"
              />
            )}
          </div>

          <div className="relative z-10 mt-auto">
            <h2
              className={`mb-1 md:mb-1.5 lg:mb-2 xl:mb-3 lora-semibold-italic whitespace-pre-line ${getTitleSizeClass(card.id)}`}
            >
              {card.title}
            </h2>
            <p
              className={` line-clamp-2 font-gtwalsheim whitespace-pre-line ${getDescSizeClass(card.id)}`}
            >
              {card.description}
            </p>
          </div>
        </>
      );
    }

    if (card.cardImage) {
      return (
        <>
          {card.layoutType === "column" ? (
            // Column layout for card 5: image below title (smaller)
            <div className="flex flex-col gap-1 sm:gap-1 md:gap-2 lg:gap-3 xl:gap-4 flex-1">
              <h2
                className={`lora-semibold-italic whitespace-pre-line ${getTitleSizeClass(card.id)} ${card.id === 8 ? "text-black" : "text-white"}`}
              >
                {card.title}
              </h2>
              <div className="flex justify-center items-center flex-1">
                <img
                  src={card.cardImage}
                  alt={card.title}
                  className="w-15 h-15 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-15 lg:h-15 xl:w-20 xl:h-20 object-contain"
                />
              </div>
              <p
                className={` font-gtwalsheim whitespace-pre-line ${getDescSizeClass(card.id)} ${card.id === 8 ? "text-black" : "text-white"}`}
              >
                {card.description}
              </p>
            </div>
          ) : (
            // Row layout for card 8: title, description, and image all in one row
            <div className="flex flex-row gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3 items-start h-full">
              <div
                className={`flex flex-col flex-1 gap-0.5 sm:gap-0.5 md:gap-1 lg:gap-1.5 xl:gap-2 ${styles[`card-${card.id}`]}`}
              >
                <h2
                  className={`lora-semibold-italic whitespace-pre-line ${getTitleSizeClass(card.id)} ${card.id === 8 ? "text-black" : "text-white"}`}
                >
                  {card.title}
                </h2>
                <p
                  className={` font-gtwalsheim whitespace-pre-line ${getDescSizeClass(card.id)} ${card.id === 8 ? "text-black" : "text-white"}`}
                >
                  {card.description}
                </p>
              </div>
              <img
                src={card.cardImage}
                alt={card.title}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:w-20 object-contain shrink-0"
              />
            </div>
          )}
          <div className={`${styles[`card-icon-${card.id}`]} flex justify-end`}>
            {/*flex justify-end*/}
            <img
              src="/cards/Buttom Icon.svg"
              alt="icon"
              className="w-4 h-4 sm:w-4 sm:h-4 lg:w-7 lg:h-7"
            />
          </div>
        </>
      );
    }

    // Default card
    return (
      <>
        <div className={styles[`card-${card.id}`]}>
          <h2
            className={`mb-0.5 sm:mb-1 md:mb-1.5 lg:mb-2 xl:mb-3 lora-semibold-italic whitespace-pre-line ${getTitleSizeClass(card.id)} ${card.id === 8 || card.id === 1 || card.id === 9 || card.id === 15 ? "text-black" : "text-white"}`}
          >
            {card.title}
          </h2>
          <p
            className={` font-gtwalsheim whitespace-pre-line ${getDescSizeClass(card.id)} ${card.id === 8 || card.id === 1 || card.id === 9 || card.id === 15 ? "text-black" : "text-white"}`}
          >
            {card.description}
          </p>
        </div>
        <div className={`${styles[`card-icon-${card.id}`]} flex justify-end `}>
          {/*shrink-0 mt-auto*/}
          <img
            src="/cards/Buttom Icon.svg"
            alt="icon"
            className="w-4 h-4 sm:w-4 sm:h-4 lg:w-7 lg:h-7"
          />
        </div>
      </>
    );
  };

  const positionClasses = card.id === 4 ? "col-start-4 row-start-1 col-span-1 row-span-2 rounded-xl sm:rounded-2xl lg:rounded-3xl" : card.span;
  const commonClasses = `${card.color} rounded-xl sm:rounded-2xl lg:rounded-3xl ${!card.isSplit ? "p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-6" : ""} flex flex-col justify-between text-white shadow-xl transition-transform cursor-pointer overflow-hidden`;

  if (card.flippable) {
    return (
      <div className={`${positionClasses} group perspective-1000 relative rounded-xl sm:rounded-2xl lg:rounded-3xl`}>
        <div className="flip-wrapper w-full h-full relative preserve-3d transition-transform duration-500">
           <div className={`flip-front absolute inset-0 backface-hidden ${commonClasses} z-10`}>
              {renderContent()}
           </div>
           <div className={`flip-back absolute inset-0 backface-hidden ${commonClasses} rotate-y-180`}>
              {/* Empty back face */}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div
      key={card.id}
      className={`${positionClasses} ${commonClasses} group relative`}
    >
      {renderContent()}
    </div>
  );
}
