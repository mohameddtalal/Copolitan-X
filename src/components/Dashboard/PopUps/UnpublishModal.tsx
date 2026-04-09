import React from 'react'

export default function UnpublishModal({ unpublishModalRow, setUnpublishModalRow, confirmUnpublish }: { unpublishModalRow: any, setUnpublishModalRow: any, confirmUnpublish: any }) {

  return (
      <div className="fixed inset-0 z-[20000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] p-10 max-w-[400px] w-full relative flex flex-col items-center text-center shadow-2xl">
            <button onClick={() => setUnpublishModalRow(null)} className="absolute top-6 right-6 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 15.8571L14.3571 12.2143C14.2388 12.0959 14.2388 11.9041 14.3571 11.7857L18 8.14286C18.5917 7.55116 18.5917 6.59169 18 6C17.4083 5.40831 16.4488 5.40831 15.8571 6L12.2143 9.64286C12.0959 9.7612 11.9041 9.7612 11.7857 9.64286L8.14286 6C7.55116 5.40831 6.59169 5.40831 6 6C5.40831 6.59169 5.40831 7.55116 6 8.14286L9.64286 11.7857C9.7612 11.9041 9.7612 12.0959 9.64286 12.2143L6 15.8571C5.40831 16.4488 5.40831 17.4083 6 18C6.59169 18.5917 7.55116 18.5917 8.14286 18L11.7857 14.3571C11.9041 14.2388 12.0959 14.2388 12.2143 14.3571L15.8571 18C16.4488 18.5917 17.4083 18.5917 18 18C18.5917 17.4083 18.5917 16.4488 18 15.8571Z" fill="#565656"></path>
                </svg>
            </button>
            <div className="w-32 h-32 mb-6 flex items-center justify-center">
              <svg width="165" height="165" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.0762 143.344L66.7718 126.908L43.205 109.248L43.0762 143.344Z" fill="#7029CF"></path>
                <path d="M40.1145 44.2148L3.73403 55.9453C-4.70109 58.6523 3.79842 66.6445 3.79842 66.6445L32.2589 90.4277L66.1926 70.3184L40.1145 44.2148Z" fill="#7029CF"></path>
                <path d="M42.7539 98.4199L104.504 145.148C114.291 151.594 116.803 146.437 116.803 146.437L121.117 136.254L124.014 128.197L71.7939 75.9258C59.9461 85.0137 48.9354 93.5215 42.7539 98.4199Z" fill="#7029CF"></path>
                <path d="M156.726 6.76642L69.8635 34.6746L90.9191 55.7508L120.925 37.9617C120.925 37.9617 108.884 47.243 93.9455 58.7801L134.383 99.2567L164.646 15.0164C166.256 10.7625 161.62 5.92853 156.726 6.76642Z" fill="#7029CF"></path>
                <path d="M36.059 11.9238C33.9985 9.86133 30.5858 9.86133 28.461 11.9238C26.3361 13.9863 26.4005 17.4023 28.461 19.5293L149 140.186C151.06 142.248 154.473 142.248 156.598 140.186C158.722 138.123 158.658 134.707 156.598 132.58L36.059 11.9238Z" fill="#7029CF"></path>
              </svg>
            </div>
            <h2 className="text-[#242424] mb-4 tracking-tight" style={{ fontFamily: "Lora", fontWeight: "500", fontSize: "24px", fontStyle: "italic" }}>Unpublish</h2>
            <p className="text-[#2C2C2C] mb-2 leading-relaxed" style={{ fontFamily: "GT Walsheim", fontWeight: "500", fontSize: "18px" }}>
              Are you sure you want to<br />unpublish this location?
            </p>
            <span className="text-[#7029CF] mb-8 leading-relaxed" style={{ fontFamily: "GT Walsheim", fontWeight: "500", fontSize: "18px" }}>
              {unpublishModalRow?.location}
            </span>
            <div className="flex gap-4 w-full">
              <button onClick={confirmUnpublish} className="flex-1 bg-[#7029CF] cursor-pointer text-white py-3 rounded-[1536px] hover:bg-[#5214a3] transition-all active:scale-95">Confirm</button>
              <button onClick={() => setUnpublishModalRow(null)} className="flex-1 bg-white cursor-pointer text-[#7029CF] py-3 rounded-[1536px] border-2 border-[#7029CF] hover:bg-purple-50 transition-all active:scale-95">Cancel</button>
            </div>
          </div>
        </div>
  )
}
