import React from 'react'

export default function PublishModal({ 
  publishModalRow, 
  setPublishModalRow, 
  confirmPublish,
  message,
}: { 
  publishModalRow: any, 
  setPublishModalRow: any, 
  confirmPublish: any,
  message?: string
}) {
    
  return (
   <div className="fixed inset-0 z-[20000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] p-10 max-w-[400px] w-full relative flex flex-col items-center text-center shadow-2xl">
            <button onClick={() => setPublishModalRow(null)} className="absolute top-6 right-6 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 15.8571L14.3571 12.2143C14.2388 12.0959 14.2388 11.9041 14.3571 11.7857L18 8.14286C18.5917 7.55116 18.5917 6.59169 18 6C17.4083 5.40831 16.4488 5.40831 15.8571 6L12.2143 9.64286C12.0959 9.7612 11.9041 9.7612 11.7857 9.64286L8.14286 6C7.55116 5.40831 6.59169 5.40831 6 6C5.40831 6.59169 5.40831 7.55116 6 8.14286L9.64286 11.7857C9.7612 11.9041 9.7612 12.0959 9.64286 12.2143L6 15.8571C5.40831 16.4488 5.40831 17.4083 6 18C6.59169 18.5917 7.55116 18.5917 8.14286 18L11.7857 14.3571C11.9041 14.2388 12.0959 14.2388 12.2143 14.3571L15.8571 18C16.4488 18.5917 17.4083 18.5917 18 18C18.5917 17.4083 18.5917 16.4488 18 15.8571Z" fill="#565656"></path>
                </svg>
            </button>
            <div className="w-32 h-32 mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" fill="none">
                <g clipPath="url(#clip0_publish)">
                  <path d="M173.127 0.288672C173.042 0.315742 172.952 0.278476 172.868 0.309765L4.11754 63.5911C2.26867 64.2865 0.960859 65.96 0.7341 67.9273C0.507342 69.8947 1.39855 71.8205 3.04633 72.9174L40.0424 97.5782L53.5769 154.131C53.6124 154.279 53.7038 154.398 53.7512 154.541C54.9676 158.251 59.6396 159.428 62.4345 156.633L88.9093 130.159L129.609 157.293C132.558 159.27 136.623 157.794 137.607 154.352L179.794 6.69556C180.927 2.72149 177.197 -1.01774 173.127 0.288672ZM66.4051 107.556C65.5318 108.44 65.2688 109.157 64.9626 110.272C64.9587 110.293 64.9496 110.312 64.9457 110.333L59.0612 131.729L50.6772 96.6947L132.354 40.69L66.4051 107.556Z" fill="#7029CF" />
                  <path d="M35.3691 144.607C33.3093 142.548 29.9719 142.547 27.9121 144.607L1.54486 170.975C-0.514952 173.035 -0.514952 176.372 1.54486 178.432C3.60502 180.492 6.9417 180.492 9.00186 178.432L35.3691 152.064C37.4289 150.005 37.4289 146.667 35.3691 144.607Z" fill="#7029CF" />
                  <path d="M35.3691 112.967C33.3093 110.907 29.9719 110.907 27.9121 112.967L1.54486 139.334C-0.514952 141.394 -0.514952 144.731 1.54486 146.791C3.60502 148.851 6.9417 148.851 9.00186 146.791L35.3691 120.424C37.4289 118.364 37.4289 115.027 35.3691 112.967Z" fill="#7029CF" />
                </g>
                <defs><clipPath id="clip0_publish"><rect width="180" height="180" fill="white" /></clipPath></defs>
              </svg>
            </div>
            <h2 className="text-[#242424] mb-4 tracking-tight" style={{ fontFamily: "Lora", fontWeight: "500", fontSize: "24px", fontStyle: "italic" }}>Publish</h2>
            <p className="text-[#2C2C2C] mb-2 leading-relaxed" style={{ fontFamily: "GT Walsheim", fontWeight: "500", fontSize: "18px" }}>
              {message || (publishModalRow?.location ? "Are you sure you want to publish this location?" : "Are you sure you want to publish these changes?")}
            </p>
            {publishModalRow?.location && (
              <span className="text-[#7029CF] mb-8 leading-relaxed" style={{ fontFamily: "GT Walsheim", fontWeight: "500", fontSize: "18px" }}>
                {publishModalRow?.location}
              </span>
            )}
            <div className="flex gap-4 w-full mt-4">
              <button onClick={confirmPublish} className="flex-1 bg-[#7029CF] cursor-pointer text-white py-3 rounded-[1536px] hover:bg-[#5214a3] transition-all active:scale-95">Confirm</button>
              <button onClick={() => setPublishModalRow(null)} className="flex-1 bg-white cursor-pointer text-[#7029CF] py-3 rounded-[1536px] border-2 border-[#7029CF] hover:bg-purple-50 transition-all active:scale-95">Cancel</button>
            </div>
          </div>
        </div>
  )
}
