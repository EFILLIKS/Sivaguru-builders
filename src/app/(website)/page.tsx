import { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import ProcessSection from "@/components/home/ProcessSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import FAQSection from "@/components/home/FAQSection";
import ContactSection from "@/components/home/ContactSection";
import { siteConfig } from "@/lib/config/site";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Sivaguru Builders | Architecture, Construction & Interior Design in Tamil Nadu",
  description:
    "Premier architectural planning, custom residential & commercial construction, and luxury interior design firm in Tamil Nadu. Explore our portfolio and get in touch today.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sivaguru Builders | Architecture, Construction & Interior Design",
    description:
      "Premier architectural planning, custom residential & commercial construction, and luxury interior design firm in Tamil Nadu.",
    url: siteConfig.url,
  },
};

const homeFaqs = [
  {
    question: "What services does Sivaguru Builders provide?",
    answer: "We provide architecture, residential construction, commercial construction, interior design, and reconstruction services.",
  },
  {
    question: "Do you take up individual house construction?",
    answer: "Yes. Our residential construction services can be tailored to individual home projects based on the client's design, requirements, site, and specifications.",
  },
  {
    question: "Can you manage the complete project?",
    answer: "Yes. Depending on your requirements, we can support the project from architectural planning through construction and interior completion.",
  },
  {
    question: "Do you undertake commercial projects?",
    answer: "Yes. We undertake commercial construction projects based on the project's scope, size, requirements, and location.",
  },
  {
    question: "How do I start a project with Sivaguru Builders?",
    answer: "Tell us about your project, site, requirements, and vision. Our team will understand your needs and guide you through the next steps.",
  },
  {
    question: "Can you redesign or reconstruct an existing building?",
    answer: "Yes. Our reconstruction service focuses on transforming existing spaces through renovation, structural changes, and improved planning.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-brand-offwhite">
      <JsonLd type="FAQPage" data={homeFaqs} />

      {/* Floating Header Navbar */}
      <Navbar />

      {/* Main Hero Section */}
      <main>
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <WhyChooseUsSection />
        <FAQSection />
        <ContactSection />
      </main>
    </div>
  );
}
