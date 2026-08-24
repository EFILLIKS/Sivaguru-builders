import React, { Suspense } from "react";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import ProjectsSection from "@/components/home/ProjectsSection";
import AboutSection from "@/components/home/AboutSection";
import FAQSection from "@/components/home/FAQSection";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Our Portfolio & Completed Projects",
  description:
    "Explore our extensive portfolio of architectural blueprints, residential homes, commercial developments, and bespoke interior projects built by Sivaguru Builders across Trichy and Tamil Nadu.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Our Portfolio & Completed Projects | Sivaguru Builders",
    description:
      "Explore our portfolio of architectural designs, luxury residences, commercial complexes, and bespoke interiors in Trichy & Tamil Nadu.",
    url: `${siteConfig.url}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-brand-offwhite">
      {/* Floating Header Navbar */}
      <Navbar activeItem="projects" />

      <main className="pt-16 sm:pt-20">
        <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center">Loading projects...</div>}>
          <ProjectsSection />
        </Suspense>
        <AboutSection />
        <FAQSection />
      </main>
    </div>
  );
}
