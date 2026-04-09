"use client";
import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { X, UploadCloud, Image as ImageIcon } from "lucide-react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardId: number;
  onUpload?: (file: File) => void;
}

export default function UploadModal({ isOpen, onClose, cardId, onUpload }: UploadModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
     <div 
          className="bg-white rounded-[40px] w-full max-w-[600px] p-8 relative shadow-2xl animate-in fade-in zoom-in duration-300
          scale-60 sm:scale-45 md:scale-55 lg:scale-70 xl:scale-95 origin-center"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header */}
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-[32px] font-semibold italic text-[#7029CF]" style={{ fontFamily: 'Lora' }}>
            Upload Images
          </h2>
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-[#7029CF] hover:opacity-70 transition-opacity"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          className={`
            border-2 border-dashed rounded-[32px] p-10 flex flex-col items-center justify-center cursor-pointer transition-all
            ${isDragging ? "border-[#7029CF] bg-[#7029CF]/5" : "border-[#7029CF]/30 hover:border-[#7029CF]/60"}
          `}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,video/*"
          />
          <div className=" p-4 rounded-2xl mb-4 text-[#7029CF]">
            <svg xmlns="http://www.w3.org/2000/svg" width="77" height="82" viewBox="0 0 77 82" fill="none">
            <path d="M24.6611 11.1668C21.7736 11.3773 17.9688 12.2195 15.8332 13.0918C9.24611 15.8139 5.72697 20.8219 4.41857 29.334C4.14786 31.0033 4.13283 32.2666 4.13283 45.501C4.13283 61.3371 4.11779 61.1115 5.11036 65.0969C6.96017 72.4961 11.502 77.0229 18.9463 78.8877C22.8264 79.8652 22.8264 79.8652 38.5723 79.8652C54.1979 79.8652 54.1377 79.8652 57.8824 78.9479C66.936 76.7221 71.583 70.8568 72.711 60.2543C73.0418 57.2314 73.0418 38.6131 72.711 37.9814C72.2297 37.049 70.9815 36.4926 69.9588 36.7633C69.267 36.9588 68.4699 37.7408 68.2744 38.4477C68.1842 38.7184 68.124 40.5982 68.124 42.6135V46.268L67.1164 45.4559C64.8906 43.6813 63.5672 43.2 60.9053 43.185C59.3111 43.1699 58.86 43.2301 57.9727 43.5158C55.9274 44.2076 56.1981 43.9971 47.8213 51.2158C43.2194 55.1861 40.8733 57.0811 40.3319 57.3367C39.7153 57.6225 39.2942 57.7127 38.4369 57.7127C37.0082 57.6977 36.3465 57.427 34.8426 56.1637C34.1658 55.5922 33.1883 54.9305 32.677 54.6748C30.0902 53.3965 27.0223 53.3063 24.4656 54.4342C23.9994 54.6447 20.5104 56.8855 16.7506 59.4121C12.9758 61.9537 9.83263 63.9689 9.77247 63.8938C9.57697 63.6832 9.20099 61.4574 9.02052 59.4873C8.90021 58.1789 8.87013 53.5469 8.91525 44.2227C8.9754 29.9355 8.9754 29.9807 9.75743 26.9729C11.1861 21.4686 14.4647 18.19 19.969 16.7613C22.8113 16.0244 23.4881 15.9793 33.1582 15.8891C42.0613 15.7988 42.3471 15.7838 42.8584 15.483C43.7307 14.9717 44.0916 14.2949 44.0315 13.3023C43.9563 12.3248 43.5502 11.6631 42.7983 11.3021C42.3471 11.0916 41.3545 11.0615 33.8049 11.0916C29.1578 11.1066 25.0371 11.1367 24.6611 11.1668ZM62.725 48.3133C63.101 48.4787 64.4695 49.5314 65.7779 50.6293L68.1391 52.6445L68.0639 56.3291C67.9887 60.0738 67.8082 61.7883 67.2367 64.0291C65.8231 69.5334 62.5295 72.827 57.0252 74.2406C53.867 75.0527 53.7918 75.0527 38.6475 75.0527C23.6836 75.0527 23.2024 75.0377 20.2697 74.3008C17.3221 73.5789 15.0963 72.4209 13.3969 70.7365C12.4945 69.8342 11.6072 68.7063 11.7426 68.601C12.3592 68.0896 25.8192 59.1564 26.3455 58.9008C27.8945 58.1639 29.8647 58.3744 31.158 59.4121C33.8951 61.6229 35.1885 62.2695 37.309 62.465C39.4897 62.6756 41.3395 62.3297 43.084 61.3672C43.6104 61.0664 46.9791 58.2992 51.175 54.6898C56.2733 50.3285 58.5442 48.4637 58.9953 48.2982C59.3412 48.1779 59.7322 48.0426 59.8526 47.9975C60.3188 47.832 62.0633 48.0275 62.725 48.3133Z" fill="#7029CF"/>
            <path d="M56.6198 11.3181C56.3641 11.4685 54.5895 13.183 52.6645 15.138C49.7319 18.1158 49.1303 18.7925 49.025 19.2738C48.6791 20.7777 49.777 22.1914 51.2659 22.1914C52.2133 22.1914 52.6043 21.9658 54.018 20.5822L55.3414 19.2738V26.2369C55.3414 33.1548 55.3414 33.215 55.6723 33.8015C56.6198 35.4859 59.011 35.4408 59.8381 33.7113C60.1389 33.0947 60.1539 32.839 60.1539 26.1767V19.2738L61.4774 20.5822C62.9061 21.9808 63.2821 22.1914 64.2596 22.1914C65.3424 22.1914 66.2147 21.4545 66.4703 20.3115C66.726 19.1535 66.5907 18.9429 62.8309 15.138C60.9059 13.183 59.1313 11.4685 58.8756 11.3181C58.635 11.1828 58.1237 11.0625 57.7477 11.0625C57.3717 11.0625 56.8604 11.1828 56.6198 11.3181Z" fill="#7029CF"/>
            <path d="M26.6621 24.1454C25.3838 24.4763 24.9025 24.7169 23.6393 25.6042C21.4736 27.1382 20.1051 29.8151 20.09 32.5673C20.075 35.0337 20.9022 37.079 22.6316 38.8235C26.0906 42.3427 31.61 42.3427 35.1141 38.8235C36.8436 37.094 37.6707 35.0487 37.6557 32.5673C37.6256 26.8976 32.1514 22.7017 26.6621 24.1454ZM30.6174 29.0782C32.3469 29.9655 33.2342 31.9056 32.7229 33.6651C32.407 34.7329 31.7453 35.6052 30.8731 36.1315C30.2414 36.5075 30.0008 36.5526 28.8729 36.5526C27.7449 36.5526 27.5043 36.5075 26.8727 36.1315C26.0004 35.6052 25.3387 34.7329 25.0229 33.6651C24.4363 31.6349 25.6545 29.4993 27.8201 28.7925C28.4367 28.5819 29.9557 28.7474 30.6174 29.0782Z" fill="#7029CF"/>
            </svg>
          </div>
          <p className="text-xl font-medium text-gray-700 mb-1" style={{ fontFamily: 'Gt walsheim' }}>
            Browse here to start uploading
          </p>
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'Gt walsheim' }}>
            Supports PNG, JPG, JPEG, SVG, Video
          </p>
          <p className="text-gray-400 text-sm" style={{ fontFamily: 'Gt walsheim' }}>
            Max. xxx MB
          </p>
        </div>

        {/* File Preview (Conditional) */}
        {selectedFile && (
          <div className="mt-8 flex items-center gap-4 animate-in slide-in-from-bottom-4 duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
              {selectedFile.type.startsWith('image/') ? (
                <img 
                  src={URL.createObjectURL(selectedFile)} 
                  alt="preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-800 uppercase tracking-tight">
                {selectedFile.name.split('.')[0]}
              </p>
              <p className="text-gray-400 text-sm font-medium">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
          </div>
        )}

        {/* Progress Bar (Visual Only for now) */}
        {selectedFile && (
          <div className="mt-6 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#7029CF] w-[100%] transition-all duration-500"></div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              if (selectedFile) {
                onUpload?.(selectedFile);
              }
            }}
            disabled={!selectedFile}
            className={`
              bg-[#7029CF] text-white px-12 py-3 rounded-full font-semibold text-lg transition-all
              ${!selectedFile ? "opacity-50 cursor-not-allowed" : "hover:bg-[#5d22ad] hover:scale-105 active:scale-95 shadow-lg"}
            `}
            style={{ fontFamily: 'GT Walsheim' }}
          >
            Add
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
