"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Star, MoveLeft, MoveRight, Loader2, ImagePlus } from "lucide-react";

interface ImageUploaderProps {
  coverImage?: string;
  galleryImages: string[];
  onCoverChange: (url: string) => void;
  onGalleryChange: (urls: string[]) => void;
}

export function ImageUploader({
  coverImage = "",
  galleryImages,
  onCoverChange,
  onGalleryChange,
}: ImageUploaderProps) {
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) return data.url;
      }
    } catch (e) {
      console.warn("Cloudinary upload failed, converting device file to Data URL:", e);
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  };

  // Handle Cover Upload (Only 1 file allowed)
  const handleCoverUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setIsUploadingCover(true);
    setUploadError(null);

    try {
      const url = await uploadFile(fileArray[0]);
      onCoverChange(url);
    } catch (err: any) {
      setUploadError(err?.message || "Failed to upload cover image");
    } finally {
      setIsUploadingCover(false);
    }
  };

  // Handle Gallery Upload (0 or more files allowed)
  const handleGalleryUpload = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setIsUploadingGallery(true);
    setUploadError(null);

    try {
      const uploadedUrls = await Promise.all(fileArray.map((file) => uploadFile(file)));
      onGalleryChange([...galleryImages, ...uploadedUrls]);
    } catch (err: any) {
      setUploadError(err?.message || "Failed to upload gallery images");
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    const updated = galleryImages.filter((_, idx) => idx !== index);
    onGalleryChange(updated);
  };

  const handleMoveImage = (index: number, direction: "left" | "right") => {
    const targetIdx = direction === "left" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= galleryImages.length) return;

    const updated = [...galleryImages];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    onGalleryChange(updated);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {uploadError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium">
          {uploadError}
        </div>
      )}

      {/* ============================================================ */}
      {/* 1. COVER IMAGE UPLOADER (Only 1 allowed) */}
      {/* ============================================================ */}
      <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-200 space-y-3">
        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          disabled={isUploadingCover}
          onChange={(e) => {
            if (e.target.files) handleCoverUpload(e.target.files);
          }}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#F47920] fill-current" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
              1. Cover Image (Required - Only 1 Image Allowed)
            </h4>
          </div>
          {coverImage && (
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Cover Image Set
            </span>
          )}
        </div>

        {coverImage ? (
          <div className="relative group w-full sm:w-[320px] h-[200px] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <Image src={coverImage} alt="Cover image" fill sizes="(max-width: 640px) 100vw, 320px" className="object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="px-3 py-1.5 bg-white text-[#F47920] text-xs font-semibold rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Change Cover Image
              </button>
              <button
                type="button"
                onClick={() => onCoverChange("")}
                className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
              >
                Remove Cover Image
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => !isUploadingCover && coverInputRef.current?.click()}
            className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all bg-white ${
              isUploadingCover ? "opacity-60 cursor-not-allowed border-gray-300" : "border-gray-200 hover:border-[#F47920] hover:bg-[#F47920]/5"
            }`}
          >
            <div className="p-2.5 bg-[#F47920]/10 text-[#F47920] rounded-full mb-2">
              {isUploadingCover ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Upload className="w-5 h-5" />
              )}
            </div>
            <p className="text-xs font-semibold text-gray-800">
              {isUploadingCover ? "Uploading Cover Image..." : "Upload Cover Image"}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">Click to choose 1 main image</p>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* 2. GALLERY IMAGES UPLOADER (Optional - 0, 1, or Multiple) */}
      {/* ============================================================ */}
      <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImagePlus className="w-4 h-4 text-[#F47920]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
              2. Gallery Images (Optional - 0, 1, or Multiple Images)
            </h4>
          </div>
          <span className="text-xs font-semibold text-gray-500">
            {galleryImages.length} {galleryImages.length === 1 ? "Image" : "Images"} Uploaded
          </span>
        </div>

        {/* Gallery Dropzone */}
        <div
          onClick={() => !isUploadingGallery && galleryInputRef.current?.click()}
          className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all bg-white ${
            isUploadingGallery ? "opacity-60 cursor-not-allowed border-gray-300" : "border-gray-200 hover:border-[#F47920] hover:bg-[#F47920]/5"
          }`}
        >
          <input
            ref={galleryInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            disabled={isUploadingGallery}
            onChange={(e) => {
              if (e.target.files) handleGalleryUpload(e.target.files);
            }}
          />
          <div className="p-2.5 bg-[#F47920]/10 text-[#F47920] rounded-full mb-2">
            {isUploadingGallery ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <ImagePlus className="w-5 h-5" />
            )}
          </div>
          <p className="text-xs font-semibold text-gray-800">
            {isUploadingGallery ? "Uploading Gallery Photos..." : "Upload Gallery Photos"}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">Click or drag multiple files from your device</p>
        </div>

        {/* Gallery Images Grid */}
        {galleryImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
            {galleryImages.map((url, idx) => (
              <div
                key={idx}
                className="relative group h-[120px] rounded-xl overflow-hidden border border-gray-200 shadow-xs"
              >
                <Image src={url} alt={`Gallery ${idx + 1}`} fill sizes="(max-width: 640px) 50vw, 200px" className="object-cover" />

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      title="Remove Image"
                      className="p-1 bg-white/20 hover:bg-red-600 text-white rounded-md transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Reorder Left / Right */}
                  <div className="flex items-center justify-center gap-2">
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => handleMoveImage(idx, "left")}
                        className="p-1 bg-white/20 hover:bg-white text-white hover:text-black rounded-md cursor-pointer"
                      >
                        <MoveLeft className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {idx < galleryImages.length - 1 && (
                      <button
                        type="button"
                        onClick={() => handleMoveImage(idx, "right")}
                        className="p-1 bg-white/20 hover:bg-white text-white hover:text-black rounded-md cursor-pointer"
                      >
                        <MoveRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
