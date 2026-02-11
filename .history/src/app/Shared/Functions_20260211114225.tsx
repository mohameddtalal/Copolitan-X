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

  