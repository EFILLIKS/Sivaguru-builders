import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import ProjectsSection from "@/components/home/ProjectsSection";
import AboutSection from "@/components/home/AboutSection";
import FAQSection from "@/components/home/FAQSection";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Featured Works & Construction Showcase",
  description:
    "Discover the engineering excellence and craftsmanship of Sivaguru Builders through our showcase of completed works and ongoing developments.",
  alternates: {
    canonical: "/works",
  },
  openGraph: {
    title: "Featured Works & Construction Showcase | Sivaguru Builders",
    description:
      "Showcase of completed architectural, residential, commercial, and interior design works by Sivaguru Builders.",
    url: `${siteConfig.url}/works`,
  },
};

export default function WorksPage() {
  return (
    <div className="relative min-h-screen bg-brand-offwhite">
      {/* Floating Header Navbar */}
      <Navbar activeItem="projects" />

      <main className="pt-16 sm:pt-20">
        <React.Suspense fallback={<div className="min-h-[400px] flex items-center justify-center">Loading works...</div>}>
          <ProjectsSection />
        </React.Suspense>
        <AboutSection />
        <FAQSection />
      </main>
    </div>
  );
}
