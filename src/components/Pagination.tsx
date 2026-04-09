type Props = {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const getPageNumbers = () => {
    if (totalPages <= 1) return [1];

    if (currentPage >= totalPages) {
      return [Math.max(1, totalPages - 1), totalPages];
    }

    const pages = new Set<number | string>();
    
    pages.add(currentPage);
    
    if (currentPage + 1 < totalPages) {
      pages.add(currentPage + 1);
    }
    
    if (currentPage + 1 < totalPages - 1) {
      pages.add("...");
    }
    
    if (currentPage < totalPages) {
      pages.add(totalPages);
    }

    return Array.from(pages);
  };

  const pageStart = (currentPage - 1) * pageSize;
  const pageEnd = Math.min(pageStart + pageSize, totalItems);

  return (
    <div key={`pagination-fresh-${totalPages}`} className="mt-8 flex justify-between items-center px-4 w-full">
      
      {/* LEFT: Navigation */}
      <div className="flex items-center gap-1.5">

        {/* First */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          className="w-8 h-8 rounded-full bg-[#EAEAEA] flex items-center justify-center text-[#999] hover:bg-[#D5D5D5] transition-colors disabled:opacity-40 disabled:hover:bg-[#EAEAEA] cursor-pointer disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11.5 12.5L7 8L11.5 3.5M6.5 12.5L2 8L6.5 3.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>

        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="w-8 h-8 rounded-full bg-[#EAEAEA] flex items-center justify-center text-[#999] hover:bg-[#D5D5D5] transition-colors disabled:opacity-40 disabled:hover:bg-[#EAEAEA] cursor-pointer disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M10 12L6 8L10 4" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>

        {/* Pages */}
        <div className="flex items-center gap-2 mx-1">
          {getPageNumbers().map((p, i) =>
            p === "..." ? (
              <span
                key={`ellipsis-${i}`}
                className="w-8 h-8 flex items-center justify-center text-xs text-[#999] tracking-widest"
              >
                ...
              </span>
            ) : (
              <button
                key={`page-${p}`}
                onClick={() => onPageChange(p as number)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all cursor-pointer ${
                  currentPage === p
                    ? "bg-[#7029CF] text-white shadow-md shadow-[#7029cf]/20"
                    : "text-[#555] hover:text-[#7029CF] hover:bg-[#F3E8FF]"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="w-8 h-8 rounded-full bg-[#EAEAEA] flex items-center justify-center text-[#999] hover:bg-[#D5D5D5] transition-colors disabled:opacity-40 disabled:hover:bg-[#EAEAEA] cursor-pointer disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6 4L10 8L6 12" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>

        {/* Last */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className="w-8 h-8 rounded-full bg-[#EAEAEA] flex items-center justify-center text-[#999] hover:bg-[#D5D5D5] transition-colors disabled:opacity-40 disabled:hover:bg-[#EAEAEA] cursor-pointer disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.5 3.5L9 8L4.5 12.5M9.5 3.5L14 8L9.5 12.5" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </button>
      </div>

      {/* RIGHT: Status and All button */}
      <div className="flex items-center gap-6">
        <span className="text-[11px] text-[#A3A3A3] font-medium font-['GT_Walsheim']">
          Displaying {totalItems === 0 ? 0 : pageStart + 1}-{pageEnd} of {totalItems} records
        </span>

        <button
          onClick={() => onPageChange(1)}
          className="bg-[#EAEAEA] px-9 py-2.5 rounded-full text-[13px] font-semibold text-[#555] hover:bg-[#D5D5D5] transition-colors cursor-pointer"
        >
          All
        </button>
      </div>
    </div>
  );
}