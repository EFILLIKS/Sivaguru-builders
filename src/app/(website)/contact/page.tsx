import React from "react";
import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import ContactSection from "@/components/home/ContactSection";
import AboutSection from "@/components/home/AboutSection";
import FAQSection from "@/components/home/FAQSection";
import { siteConfig } from "@/lib/config/site";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch for Your Construction Project",
  description:
    "Contact Sivaguru Builders to discuss your project requirements, request a custom architectural consultation, or get a quotation for your building project.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Sivaguru Builders",
    description:
      "Get in touch with Sivaguru Builders for architecture, construction, and interior design consultations in Tamil Nadu.",
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-brand-offwhite">
      <JsonLd type="Organization" />

      {/* Floating Header Navbar */}
      <Navbar activeItem="contact" />

      <main className="pt-16 sm:pt-20">
        <ContactSection />
        <AboutSection />
        <FAQSection />
      </main>
    </div>
  );
}
