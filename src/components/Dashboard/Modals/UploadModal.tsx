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
          scale-75 sm:scale-70 md:scale-80 lg:scale-90 xl:scale-100 origin-center"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header */}
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-[32px] font-semibold italic text-[#7029CF]" style={{ fontFamily: 'Lora, serif' }}>
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
          <div className="bg-[#F1EAFA] p-4 rounded-2xl mb-4 text-[#7029CF]">
            <UploadCloud size={48} />
          </div>
          <p className="text-xl font-medium text-gray-700 mb-1">
            Browse here to start uploading
          </p>
          <p className="text-gray-400 text-sm">
            Supports PNG, JPG, JPEG, SVG, Video
          </p>
          <p className="text-gray-400 text-sm">
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
            style={{ fontFamily: 'GT Walsheim, sans-serif' }}
          >
            Add
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
