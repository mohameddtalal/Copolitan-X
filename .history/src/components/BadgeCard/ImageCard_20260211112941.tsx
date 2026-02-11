import { motion } from 'framer-motion';
import React from 'react'

export default function ImageCard({card}:any) {
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
