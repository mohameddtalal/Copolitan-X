 export const getTitleSizeClass = (id: number) => {
    if ([3, 5, 8, 10, 11, 14].includes(id)) return "title-lg";
     if ([ 4].includes(id)) return "title-md";
    if ([1, 6, 7,9,15,12,13].includes(id)) return "title-sm";
    return "title-md";
  };

  export const getDescSizeClass = (id: number) => {
    if ([3, 5, 8, 10, 11, 14].includes(id)) return "desc-lg";
    if ([12,13,4].includes(id)) return "desc-md";
    if ([1, 6,9,15, 7].includes(id)) return "desc-sm";
    return "desc-md";
  };

    const positionClasses = card.id === 4 ? "col-start-4 row-start-1 col-span-1 row-span-2 rounded-xl sm:rounded-2xl lg:rounded-3xl" : card.span;
  const commonClasses = `${card.color} rounded-xl sm:rounded-2xl lg:rounded-3xl ${!card.isSplit ? "p-2 sm:p-2.5 md:p-3 lg:p-4 xl:p-6" : ""} flex flex-col justify-between text-white shadow-xl transition-transform cursor-pointer overflow-hidden h-full`;