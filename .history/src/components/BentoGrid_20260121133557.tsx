import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BentoGrid = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
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
        [
            { id: 14, title: "Data Hub", description: "A streamlined repository for all data collect, analyze, and access key metrics to drive informed decisions.", color: "bg-[#242424]", span: "col-span-1 row-span-1" },
            { id: 2, title: "", description: "", color: "bg-[var(--background)]", span: "col-span-1 row-span-1", image: "/cards/CIRCULAR TEXT.svg" },
            { id: 4, title: "fatma Ashraf", description: "Co-founder", color: "bg-[var(--background)]", span: "col-span-1 row-span-2", isSplit: true, profileImage: "/cards/profile.svg", characterImage: "/cards/character.svg" },
        ],
    ];

    const nextPage = () => currentPage < pages.length - 1 && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 0 && setCurrentPage(currentPage - 1);

    return (
        <div className="w-full h-full p-1 sm:p-1 md:p-2 lg:p-3 xl:p-5 flex flex-col overflow-hidden">

            {/* Navigation */}
            <div className="flex items-center justify-between mb-3 sm:mb-5 shrink-0">
                <div className="flex gap-3 justify-between w-full">
                    <button onClick={prevPage} disabled={currentPage === 0}>
                        <img src={currentPage === 0 ? "/cards/Buttom Icon(1).svg" : "/cards/Buttom Icon(2).svg"} className="w-5 h-5" />
                    </button>
                    <button onClick={nextPage} disabled={currentPage === pages.length - 1}>
                        <img src={currentPage === pages.length - 1 ? "/cards/Buttom Icon(3).svg" : "/cards/Buttom Icon5.svg"} className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-hidden w-full min-h-0">
                <div
                    className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ transform: `translateX(-${currentPage * 100}%)` }}
                >
                    {pages.map((page, pageIndex) => (
                        <div key={pageIndex} className="min-w-full h-full px-4 flex items-center justify-center">
                            <div className="grid grid-cols-4 grid-rows-3 gap-4 w-full h-full">
                                {page.map(card => (
                                    <div key={card.id} className={`${card.color} ${card.span} rounded-3xl p-4 flex flex-col justify-between text-white`}>

                                        <h2 className="text-[clamp(11px,2vw,18px)] leading-[clamp(16px,2.5vw,22px)] font-lora italic">
                                            {card.title}
                                        </h2>

                                        <p className="text-[clamp(10px,1.4vw,14px)] leading-[clamp(14px,2vw,18px)] font-gtwalsheim opacity-90">
                                            {card.description}
                                        </p>

                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-6">
                {pages.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`h-2 rounded-full transition-all duration-300 ease-in-out ${currentPage === i ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default BentoGrid;
