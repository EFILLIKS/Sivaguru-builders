import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import ServicesSection from "@/components/home/ServicesSection";
import ProcessSection from "@/components/home/ProcessSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import FAQSection from "@/components/home/FAQSection";
import ContactSection from "@/components/home/ContactSection";
import { siteConfig } from "@/lib/config/site";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Construction & Architectural Services",
  description:
    "Explore our full suite of professional services: Architectural Planning, Residential Construction, Commercial Projects, Interior Design, and Building Reconstruction in Tamil Nadu.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Construction & Architectural Services | Sivaguru Builders",
    description:
      "Architectural Planning, Residential Construction, Commercial Construction, Interior Design, and Building Reconstruction services.",
    url: `${siteConfig.url}/services`,
  },
};

const servicesData = [
  {
    name: "Architectural Planning & Design",
    description: "Custom floor plans, 3D structural designs, elevation modeling, and local municipal approval assistance.",
    serviceType: "Architectural Design",
    url: `${siteConfig.url}/services#architecture`,
  },
  {
    name: "Residential Construction",
    description: "End-to-end luxury villa and custom home construction tailored to your specifications and lifestyle.",
    serviceType: "Residential Construction",
    url: `${siteConfig.url}/services#residential`,
  },
  {
    name: "Commercial Construction",
    description: "Scalable construction solutions for retail outlets, office spaces, warehouses, and commercial complexes.",
    serviceType: "Commercial Construction",
    url: `${siteConfig.url}/services#commercial`,
  },
  {
    name: "Bespoke Interior Design",
    description: "Modern modular kitchens, custom cabinetry, ambient lighting, and aesthetic space transformations.",
    serviceType: "Interior Design",
    url: `${siteConfig.url}/services#interior`,
  },
  {
    name: "Building Reconstruction & Renovation",
    description: "Structural retrofitting, space optimization, structural enhancements, and complete building modernization.",
    serviceType: "Building Reconstruction",
    url: `${siteConfig.url}/services#reconstruction`,
  },
];

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-brand-offwhite">
      <JsonLd type="Service" data={servicesData} />

      {/* Floating Header Navbar */}
      <Navbar activeItem="services" />

      <main className="pt-16 sm:pt-20">
        <ServicesSection />
        <ProcessSection />
        <WhyChooseUsSection />
        <FAQSection />
        <ContactSection />
      </main>
    </div>
  );
}
