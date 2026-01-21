import React, { useState } from 'react';
import { motion } from 'framer-motion';
const BentoGrid = () => {
    const [currentPage, setCurrentPage] = useState(0);

    // Dummy data for cards - 3 pages × 12 cards each
    const pages = [
        // Page 1
        [
            { id: 1, title: "Bookings Planner", description: "A centralized view of all planned and on-demand bookings in one place.", color: "bg-[var(--green)]", span: "col-span-1 row-span-1" },
            { id: 2, title: "", description: "", color: "bg-[var(--background)]", span: "col-span-1 row-span-1", image: "/cards/CIRCULAR TEXT.svg" },
            { id: 3, title: "Control Room", description: "Serves as the central command center of the platform, giving administrators full oversight and configuration power across the entire system.", color: "bg-[#242424]", span: "col-span-1 row-span-2" },
            { id: 4, title: "fatma Ashraf", description: "Co-founder", color: "bg-[var(--background)]", span: "col-span-1 row-span-2", isSplit: true, profileImage: "/cards/profile.svg", characterImage: "/cards/character.svg" },
            { id: 5, title: "Growth Leads", description: "Pipeline to manage potential members and opportunities, converting them into long-term community members.", color: "bg-[#7029CF]", span: "col-span-1 row-span-2", cardImage: "/cards/card5.svg", layoutType: "column" },
            { id: 6, title: "People of the Circle", description: "The circle represents our community of members who are connected through shared spaces, ideas, and experiences.", color: "bg-[#242424]", span: "col-span-1 row-span-1" },
            { id: 7, title: "Insights", description: "A dashboard for real-time data on bookings, revenue, members, and workspace performance — all at a glance.", color: "bg-[#242424]", span: "col-span-1 row-span-1" },
            { id: 8, title: "Operations Center", description: "Central hub linking key operational tasks for seamless tracking, reporting, and workflow management.", color: "bg-[var(--green)]", span: "col-span-2 row-span-1", cardImage: "/cards/card8.svg", layoutType: "row" },
        ],
        // Page 2
        [
            { id: 9, title: "Partnerships Network", description: "Oversee and manage all partnerships, deals, and strategic collaborations", color: "bg-[#FFD3D2]", span: "col-span-1 row-span-1" },
            { id: 2, title: "", description: "", color: "bg-[var(--background)]", span: "col-span-1 row-span-1", image: "/cards/CIRCULAR TEXT.svg" },
            { id: 11, title: "Security Control", description: "Serves as the central command center of the platform, giving administrators full oversight and configuration power across the entire system.", color: "bg-[#242424]", span: "col-span-1 row-span-2", cardImage: "/cards/card11.svg", layoutType: "column" },
            { id: 4, title: "fatma Ashraf", description: "Co-founder", color: "bg-[var(--background)]", span: "col-span-1 row-span-2", isSplit: true, profileImage: "/cards/profile.svg", characterImage: "/cards/character.svg" },
            { id: 12, title: "Finance Center", description: "A control panel for streamlined financial records and insights collaborations.", color: "bg-[#242424]", span: "col-span-1 row-span-2" },
            { id: 13, title: "Experience & Engagement Lab", description: "A tools lab that drives engagement and growth where experience is refined and elevated.", color: "bg-[#242424]", span: "col-span-1 row-span-1" },
            { id: 14, title: "Data Hub", description: "A streamlined repository for all data collect, analyze, and access key metrics to drive informed decisions.", color: "bg-[#242424]", span: "col-span-1 row-span-1" },
            { id: 15, title: "Facility Management ", description: "Central hub linking key operational tasks for seamless tracking, reporting, and workflow management.", color: "bg-[#242424]", span: "col-span-2 row-span-1", cardImage: "/cards/card15.svg", layoutType: "row" },
        ],
        // Page 3
        [
            { id: 14, title: "Data Hub", description: "A streamlined repository for all data collect, analyze, and access key metrics to drive informed decisions.", color: "bg-[#242424]", span: "col-span-1 row-span-1" },
            { id: 2, title: "", description: "", color: "bg-[var(--background)]", span: "col-span-1 row-span-1", image: "/cards/CIRCULAR TEXT.svg" },
            { id: 4, title: "fatma Ashraf", description: "Co-founder", color: "bg-[var(--background)]", span: "col-span-1 row-span-2", isSplit: true, profileImage: "/cards/profile.svg", characterImage: "/cards/character.svg" },


        ],
    ];

    const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

   return (
        <div className="w-full h-full p-1 sm:p-1 md:p-2 lg:p-3 xl:p-5 flex flex-col overflow-hidden">
            {/* Navigation Section */}
            <div className="flex items-center justify-between mb-3 sm:mb-5 shrink-0">
                <div className="flex gap-2 sm:gap-3 justify-between w-full" style={{ marginRight: 'clamp(1rem, 0rem + 3.125vw, 1.5rem)', marginLeft: 'clamp(1rem, 0rem + 3.125vw, 1.5rem)' }}>
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className={`rounded-full p-0.5 sm:p-1 md:p-1.5 lg:p-2 xl:p-3 transition-all ${currentPage === 0
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'
                            }`}
                    >
                        <img
                            src={currentPage === 0 ? "/cards/Buttom Icon(1).svg" : "/cards/Buttom Icon(2).svg"}
                            alt="Previous"
                            className="w-2 h-2 sm:w-3 sm:h-3 lg:w-5 lg:h-5"
                        />
                    </button>

                    <button
                        onClick={nextPage}
                        disabled={currentPage === pages.length - 1}
                        className={`rounded-full p-0.5 sm:p-1 md:p-1.5 lg:p-2 xl:p-3 transition-all ${currentPage === pages.length - 1
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'
                            }`}
                    >
                        <img
                            src={currentPage === pages.length - 1 ? "/cards/Buttom Icon(3).svg" : "/cards/Buttom Icon5.svg"}
                            alt="Next"
                            className="w-2 h-2 sm:w-3 sm:h-3 lg:w-5 lg:h-5"
                        />
                    </button>
                </div>
            </div>

      {/* Grid Container */}
      <div className="flex-1 overflow-hidden w-full min-h-0">
        <div
          className="flex h-full w-full "
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {pages.map((page, pageIndex) => (
            <div key={pageIndex} className="min-w-full h-full px-1.5 sm:px-3 md:px-4 lg:px-5 xl:px-6 flex items-center justify-center">
              <div className="grid grid-cols-4 grid-rows-3 gap-2 sm:gap-3 lg:gap-4 w-full h-full auto-rows-fr">
                {page.map((card) => (
                  <div
                    key={card.id}
                    className={`${card.color} ${card.span} rounded-xl sm:rounded-2xl lg:rounded-3xl ${!card.isSplit ? 'p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-6' : ''} flex flex-col justify-between text-white shadow-xl  transition-transform cursor-pointer group overflow-hidden relative`}
                  >
                    {card.isSplit ? (
                      // Split layout card (Profile card)
                      <div className="flex flex-col h-full gap-2 sm:gap-3">
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
                                                        <h2 className="text-[clamp(14px,2.5vw,24px)] leading-[clamp(22px,3vw,30px)] lora-semibold-italic">{card.title}</h2>
                                                        <p className="text-[clamp(12px,1.8vw,16px)] leading-[clamp(18px,2.5vw,24px)] opacity-90 font-gtwalsheim">{card.description}</p>
                                                    </div>
                                                </div>
                        {/* Bottom section - Character Image */}
                        <div className="rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden flex items-end justify-center flex-1">
                          {card.characterImage && (
                            <img 
                              src={card.characterImage} 
                              alt="character"
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      </div>
                    ) : card.image ? (
                      // Card with image
                      <>
                        <div className="absolute inset-0">
                          {card.id === 2 ? (
                            <motion.img
                              src={card.image} 
                              alt={card.title}
                              className="w-full h-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 10,
                                ease: "linear",
                                repeat: Infinity,
                              }}
                            />
                          ) : (
                            <img 
                              src={card.image} 
                              alt={card.title}
                              className="w-full h-full"
                            />
                          )}
                        </div>
                        <div className="relative z-10 mt-auto">
                          <h2 className="text-[clamp(14px,2.5vw,24px)] leading-[clamp(22px,3vw,30px)] mb-1 md:mb-1.5 lg:mb-2 xl:mb-3 lora-semibold-italic">{card.title}</h2>
                          <p className="text-[clamp(12px,1.8vw,16px)] leading-[clamp(18px,2.5vw,24px)] opacity-90 line-clamp-2 font-gtwalsheim">{card.description}</p>
                        </div>
                        <div className="relative z-10 flex justify-end mt-1.5 sm:mt-2 md:mt-2.5 lg:mt-3 xl:mt-4">
                          <img 
                            src="/cards/Buttom Icon.svg" 
                            alt="icon"
                            className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                          />
                        </div>
                      </>
                    ) : card.cardImage ? (
                      // Card with inline image (column or row layout)
                      <>
                        {card.layoutType === 'column' ? (
                          // Column layout for card 5: image below title (smaller)
                          <div className="flex flex-col gap-2 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-5 flex-1">
                            <h2 className={`text-[clamp(14px,2.5vw,24px)] leading-[clamp(22px,3vw,30px)] lora-semibold-italic ${card.id === 8  ? 'text-black' : 'text-white'}`}>{card.title}</h2>
                            <div className="flex justify-center items-center flex-1">
                              <img 
                                src={card.cardImage} 
                                alt={card.title}
                                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 object-contain"
                              />
                            </div>
                            <p className={`text-[clamp(12px,1.8vw,16px)] leading-[clamp(18px,2.5vw,24px)] opacity-90 line-clamp-3 font-gtwalsheim ${card.id === 8 ? 'text-black' : 'text-white'}`}>{card.description}</p>
                          </div>
                        ) : (
                          // Row layout for card 8: title, description, and image all in one row
                          <div className="flex flex-row gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5 xl:gap-3 items-start h-full">
                            <div className="flex flex-col flex-1 gap-0.5 sm:gap-0.5 md:gap-1 lg:gap-1.5 xl:gap-2">
                              <h2 className={`text-[clamp(14px,2.5vw,24px)] leading-[clamp(22px,3vw,30px)] lora-semibold-italic ${card.id === 8 ? 'text-black' : 'text-white'}`}>{card.title}</h2>
                              <p className={`text-[clamp(12px,1.8vw,16px)] leading-[clamp(18px,2.5vw,24px)] opacity-90 font-gtwalsheim  ${card.id === 8 ? 'text-black' : 'text-white'}`}>{card.description}</p>
                            </div>
                            <img 
                              src={card.cardImage} 
                              alt={card.title}
                              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:w-20 object-contain shrink-0"
                            />
                          </div>
                        )}
                        <div className="flex justify-end">
                          <img 
                            src="/cards/Buttom Icon.svg" 
                            alt="icon"
                            className="w-4 h-4 sm:w-4 sm:h-4 lg:w-7 lg:h-7"
                          />
                        </div>
                      </>
                    ) : (
                      // Card without image
                      <>
                        <div>
                          <h2 className={`text-[clamp(14px,2.5vw,24px)] leading-[clamp(22px,3vw,30px)] mb-0.5 sm:mb-1 md:mb-1.5 lg:mb-2 xl:mb-3 lora-semibold-italic ${card.id === 8 || card.id === 1|| card.id===9? 'text-black' : 'text-white'}`}>{card.title}</h2>
                          <p className={`text-[clamp(12px,1.8vw,16px)] leading-[clamp(18px,2.5vw,24px)] opacity-90 line-clamp-3 font-gtwalsheim ${card.id === 8 || card.id === 1 || card.id===9? 'text-black' : 'text-white'}`}>{card.description}</p>
                        </div>
                        <div className="flex justify-end shrink-0 mt-auto">
                          <img 
                            src="/cards/Buttom Icon.svg" 
                            alt="icon"
                            className="w-4 h-4 sm:w-4 sm:h-4 lg:w-7 lg:h-7"
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Page Indicators */}
      <div className="flex justify-center gap-2 mt-4 sm:mt-6 shrink-0">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`h-2 rounded-full transition-all ${
              currentPage === index ? 'w-6 sm:w-8 bg-white' : 'w-2 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
export default BentoGrid;
