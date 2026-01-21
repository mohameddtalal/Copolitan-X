export default function Navigation() {
      const [currentPage, setCurrentPage] = useState(0);
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
            { id: 8, title: "Operations \nCenter", description: "Central hub linking key operational tasks for seamless tracking, reporting, and workflow management.", color: "bg-[var(--green)]", span: "col-span-2 row-span-1", cardImage: "/cards/card8.svg", layoutType: "row" },
        ],
        // Page 2
        [
            { id: 9, title: "Partnerships Network", description: "Oversee and manage all partnerships, deals, and strategic collaborations", color: "bg-[#FFD3D2]", span: "col-span-1 row-span-1" },
            { id: 2, title: "", description: "", color: "bg-[var(--background)]", span: "col-span-1 row-span-1", image: "/cards/CIRCULAR TEXT.svg" },
            { id: 11, title: "Security \nControl", description: "Serves as the central command center of the platform, giving administrators full oversight and configuration power across the entire system.", color: "bg-[#242424]", span: "col-span-1 row-span-2", cardImage: "/cards/card11.svg", layoutType: "column" },
            { id: 4, title: "fatma Ashraf", description: "Co-founder", color: "bg-[var(--background)]", span: "col-span-1 row-span-2", isSplit: true, profileImage: "/cards/profile.svg", characterImage: "/cards/character.svg" },
            { id: 12, title: "Finance Center", description: "A control panel for streamlined financial records and insights collaborations.", color: "bg-[#242424]", span: "col-span-1 row-span-2" },
            { id: 13, title: "Experience& \nEngagement Lab", description: "A tools lab that drives engagement and growth where experience is refined and elevated.", color: "bg-[#242424]", span: "col-span-1 row-span-1" },
            { id: 14, title: "Data Hub", description: "A streamlined repository for all data collect, analyze, and access key metrics to drive informed decisions.", color: "bg-[#242424]", span: "col-span-1 row-span-1" },
            { id: 15, title: "Facility \nManagement ", description: "Central hub linking key operational tasks for seamless tracking, reporting, and workflow management.", color: "bg-[#242424]", span: "col-span-2 row-span-1", cardImage: "/cards/card15.svg", layoutType: "row" },
        ],
        // Page 3
        [
            { id: 16, title: "Data Hub", description: "A streamlined repository for all data collect, analyze, and access key metrics to drive informed decisions.", color: "bg-[#FFD3D2]", span: "col-span-1 row-span-1" },
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
    );
}
