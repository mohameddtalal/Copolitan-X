export default function Navigation() {
    const [currentPage, setCurrentPage] = useState(0);
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
