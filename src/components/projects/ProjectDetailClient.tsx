"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, ChevronRight, X, Maximize2, Images } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import FAQSection from "@/components/home/FAQSection";
import ContactSection from "@/components/home/ContactSection";
import { Project } from "@/types/admin";

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const imagesList = (project.galleryImages && project.galleryImages.length > 0)
    ? project.galleryImages
    : [project.coverImage || "/images/house-image.jpg"];

  const [selectedImage, setSelectedImage] = useState(imagesList[0]);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-[#FFFAFA] text-[#1A1F2A]">
      {/* Navbar */}
      <Navbar activeItem="projects" />

      <main className="pt-24 sm:pt-28 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="max-w-[1400px] mx-auto px-5 mb-6">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-[#F47920] transition-colors">
              <span className="lang-en">Home</span>
              <span className="lang-ta">முகப்பு</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/projects" className="hover:text-[#F47920] transition-colors">
              <span className="lang-en">Projects</span>
              <span className="lang-ta">திட்டங்கள்</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[#F47920] font-semibold">
              <span className="lang-en">{project.name}</span>
              <span className="lang-ta">{project.nameTa || project.name}</span>
            </span>
          </div>
        </div>

        {/* Header Title Section */}
        <div className="max-w-[1400px] mx-auto px-5 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
            <div className="space-y-3 max-w-[850px]">
              {/* Category Pill */}
              <div className="inline-flex items-center px-3 py-1 bg-[#F47920]/10 text-[#F47920] rounded-full text-xs font-semibold uppercase tracking-wider">
                <span className="lang-en">{project.category}</span>
                <span className="lang-ta">{project.categoryTa || project.category}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-black">
                <span className="lang-en">{project.name}</span>
                <span className="lang-ta">{project.nameTa || project.name}</span>
              </h1>

              {/* Location */}
              <p className="flex items-center gap-2 text-sm sm:text-base text-gray-600 font-medium">
                <MapPin className="w-4 h-4 text-[#F47920] shrink-0" />
                <span className="lang-en">{project.location}</span>
                <span className="lang-ta">{project.locationTa || project.location}</span>
              </p>
            </div>

            {/* Back Button */}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-[#F47920] rounded-xl text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#F47920] shadow-xs transition-all shrink-0 self-start md:self-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="lang-en">Back to Projects</span>
              <span className="lang-ta">திட்டங்களுக்கு திரும்பவும்</span>
            </Link>
          </div>
        </div>

        {/* Gallery Hero Viewer */}
        <div className="max-w-[1400px] mx-auto px-5 mb-12">
          <div className="space-y-4">
            {/* Main Featured Image */}
            <div className="relative w-full h-[320px] sm:h-[480px] md:h-[580px] rounded-3xl overflow-hidden shadow-md bg-gray-100 border border-gray-100 group">
              <Image
                src={selectedImage}
                alt={project.name}
                fill
                priority
                sizes="(max-width: 1400px) 100vw, 1400px"
                className="object-cover object-center transition-all duration-500"
              />
              <button
                onClick={() => setLightboxImage(selectedImage)}
                className="absolute top-4 right-4 p-3 bg-black/60 hover:bg-black/80 text-white rounded-2xl backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 cursor-pointer flex items-center gap-2 text-xs font-semibold"
              >
                <Maximize2 className="w-4 h-4" /> View Fullscreen
              </button>
            </div>

            {/* Thumbnails Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {imagesList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative w-24 h-20 sm:w-32 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    selectedImage === imgUrl ? "border-[#F47920] ring-2 ring-[#F47920]/20 scale-105" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={imgUrl} alt={`Gallery ${idx + 1}`} fill sizes="(max-width: 640px) 96px, 128px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Specifications & Overview Grid */}
        <div className="max-w-[1400px] mx-auto px-5 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Columns: Detailed Stories & Specs */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Short Summary Card */}
              {project.shortDescription && (
                <div className="p-6 sm:p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-3">
                  <h3 className="text-sm font-semibold uppercase text-[#F47920] tracking-wider">
                    <span className="lang-en">Executive Summary</span>
                    <span className="lang-ta">திட்ட சுருக்கம்</span>
                  </h3>
                  <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-medium">
                    <span className="lang-en">{project.shortDescription}</span>
                    <span className="lang-ta">{project.shortDescriptionTa || project.shortDescription}</span>
                  </p>
                </div>
              )}

              {/* Detailed Project Overview */}
              {project.projectOverview && (
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold uppercase text-black">
                    <span className="lang-en">Project Overview</span>
                    <span className="lang-ta">திட்டத்தின் கண்ணோட்டம்</span>
                  </h2>
                  <p className="text-base text-gray-700 leading-relaxed font-normal whitespace-pre-line">
                    <span className="lang-en">{project.projectOverview}</span>
                    <span className="lang-ta">{project.projectOverviewTa || project.projectOverview}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: Key Specifications Card */}
            <div className="space-y-6">
              <div className="p-6 sm:p-8 bg-white rounded-3xl border border-gray-100 shadow-md space-y-6">
                <h3 className="text-xl font-bold uppercase text-black border-b border-gray-100 pb-4">
                  <span className="lang-en">Project Specifications</span>
                  <span className="lang-ta">திட்ட விவரங்கள்</span>
                </h3>

                <div className="space-y-4">
                  {/* Category */}
                  <div className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500 font-medium">
                      <span className="lang-en">Category</span>
                      <span className="lang-ta">பிரிவு</span>
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      <span className="lang-en">{project.category}</span>
                      <span className="lang-ta">{project.categoryTa || project.category}</span>
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center justify-between py-2 border-b border-gray-50">
                    <span className="text-sm text-gray-500 font-medium">
                      <span className="lang-en">Location</span>
                      <span className="lang-ta">இடம்</span>
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      <span className="lang-en">{project.location}</span>
                      <span className="lang-ta">{project.locationTa || project.location}</span>
                    </span>
                  </div>

                  {/* Year */}
                  {project.year && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500 font-medium">
                        <span className="lang-en">Completion Year</span>
                        <span className="lang-ta">நிறைவு செய்யப்பட்ட ஆண்டு</span>
                      </span>
                      <span className="text-sm font-semibold text-gray-900">{project.year}</span>
                    </div>
                  )}

                  {/* Area / Size */}
                  {(project.area || project.areaTa) && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500 font-medium">
                        <span className="lang-en">Project Size / Area</span>
                        <span className="lang-ta">திட்டத்தின் பரப்பளவு</span>
                      </span>
                      <span className="text-sm font-semibold text-[#F47920]">
                        <span className="lang-en">{project.area}</span>
                        <span className="lang-ta">{project.areaTa || project.area}</span>
                      </span>
                    </div>
                  )}

                  {/* Floors */}
                  {(project.floors || project.floorsTa) && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-50">
                      <span className="text-sm text-gray-500 font-medium">
                        <span className="lang-en">Floors</span>
                        <span className="lang-ta">தளங்கள்</span>
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        <span className="lang-en">{project.floors}</span>
                        <span className="lang-ta">{project.floorsTa || project.floors}</span>
                      </span>
                    </div>
                  )}

                  {/* Bedrooms / Configuration */}
                  {(project.bedrooms || project.bedroomsTa) && (
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-500 font-medium">
                        <span className="lang-en">Configuration</span>
                        <span className="lang-ta">அமைப்பு</span>
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        <span className="lang-en">{project.bedrooms}</span>
                        <span className="lang-ta">{project.bedroomsTa || project.bedrooms}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* CTA Card */}
                <div className="pt-4 border-t border-gray-100">
                  <Link href="/contact" className="block w-full">
                    <Button theme="dark" className="w-full justify-center">
                      <span className="lang-en">Start Your Project</span>
                      <span className="lang-ta">உங்கள் திட்டத்தை தொடங்குங்கள்</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Full Photo Gallery Grid Section */}
        <div className="max-w-[1400px] mx-auto px-5 mb-16">
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#F47920]/10 text-[#F47920] flex items-center justify-center">
                <Images className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold uppercase text-black">
                  <span className="lang-en">Project Photo Gallery</span>
                  <span className="lang-ta">திட்ட புகைப்பட தொகுப்பு</span>
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  <span className="lang-en">Click any image to enlarge and inspect design details</span>
                  <span className="lang-ta">வடிவமைப்பு விவரங்களை ஆய்வு செய்ய எந்த படத்தையும் கிளிக் செய்யவும்</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {imagesList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxImage(imgUrl)}
                  className="relative h-40 sm:h-52 rounded-2xl overflow-hidden group border border-gray-100 shadow-2xs hover:shadow-md transition-all cursor-pointer"
                >
                  <Image
                    src={imgUrl}
                    alt={`Project Gallery Image ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-5xl h-[75vh]">
              <Image
                src={lightboxImage}
                alt="Full View"
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        )}

        {/* Global FAQs & Contact Section */}
        <div className="mt-16 space-y-16">
          <ContactSection />
          <FAQSection />
        </div>
      </main>
    </div>
  );
}
