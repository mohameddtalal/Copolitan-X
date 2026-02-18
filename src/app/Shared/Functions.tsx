 import Image from "next/image";


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

  export const BrandHeader = () => (
      <div >
          <Image
         style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "clamp(2.1875rem, 1.9388rem + 1.1054vw, 3rem)",
            }}

              src="/login/logo.svg"
              alt="COPOLITAN"
              width={197}
              height={13}
              priority
          />
      </div>
  );
   export const WhiteBrandHeader = () => (
      <div >
          <Image
         style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "clamp(2.1875rem, 1.9388rem + 1.1054vw, 3rem)",
            }}

              src="/login/logoblack.svg"
              alt="COPOLITAN"
              width={197}
              height={13}
              priority
          />
      </div>
  );