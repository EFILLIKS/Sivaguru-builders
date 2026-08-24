"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { getSettings } from "@/lib/repositories/settings";
import { SiteSettings } from "@/types/admin";

export default function FooterSection() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    async function loadSettings() {
      const data = await getSettings();
      setSettings(data);
    }
    loadSettings();

    const handleUpdate = () => {
      loadSettings();
    };

    window.addEventListener("settings_updated", handleUpdate);
    return () => window.removeEventListener("settings_updated", handleUpdate);
  }, []);

  const phone = settings?.phone || "+91 7358640561";
  const email = settings?.email || "sivagurubuilders2022@gmail.com";
  const address = settings?.address || "Andavar Street, Kattuputhur , Trichy, Tamil Nadu - 621207";
  const companyName = settings?.companyName || "Sivaguru Builders";

  return (
    <footer className="flex flex-col items-center bg-[#FFFAFA] w-full px-5 pb-5 pt-10 z-10">
      {/* Main Footer Container with Inset Shadow */}
      <div className="flex flex-col w-full max-w-[1400px] bg-[#FFFAFA] rounded-[20px] shadow-[inset_0px_0px_22.9px_1px_rgba(244,121,32,0.5)] p-6 md:p-[30px] gap-5">
        {/* Top Content Area */}
        <div className="flex flex-col lg:flex-row justify-between items-start pb-[30px] border-b border-black/20 gap-10 lg:gap-[50px] xl:gap-[165px]">
          {/* Left Side: Orange Brand Card */}
          <div className="flex flex-col items-start p-5 gap-5 w-full lg:max-w-[450px] bg-[#F47920] rounded-[12.5px] shrink-0">
            <div className="flex flex-col items-start gap-[10px] w-full">
              <h2 className="text-[28px] md:text-[34px] leading-[36px] md:leading-[42px] uppercase text-white font-normal">
                <span className="lang-en">{companyName}</span>
                <span className="lang-ta">சிவகுரு பில்டர்ஸ்</span>
              </h2>
              <p className="text-[14px] md:text-[16px] leading-[20px] text-[#FFE2C4] font-medium">
                <span className="lang-en">Architecture · Residential Construction · Commercial Construction · Interior Design · Reconstruction</span>
                <span className="lang-ta">கட்டிடக்கலை · குடியிருப்பு கட்டுமானம் · வணிக கட்டுமானம் · உள் வடிவமைப்பு · மறுசீரமைப்பு</span>
              </p>
            </div>
            
            <Link href="/contact" className="w-full">
              <Button theme="dark" className="w-full">
                <span className="lang-en">Start Your Project</span>
                <span className="lang-ta">உங்கள் திட்டத்தை தொடங்குங்கள்</span>
              </Button>
            </Link>
          </div>

          {/* Right Side: Links and Contact Grid */}
          <div className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap justify-between w-full gap-10 lg:gap-10">
            {/* Sections Column */}
            <div className="flex flex-col items-start gap-[10px] min-w-[120px]">
              <h3 className="text-[16px] leading-[20px] font-medium text-[#F47920] mb-1">
                <span className="lang-en">Sections</span>
                <span className="lang-ta">பிரிவுகள்</span>
              </h3>
              <Link href="#about" className="text-[16px] leading-[20px] font-medium text-black/50 hover:text-[#F47920] transition-colors">
                <span className="lang-en">About</span>
                <span className="lang-ta">எங்களைப் பற்றி</span>
              </Link>
              <Link href="#services" className="text-[16px] leading-[20px] font-medium text-black/50 hover:text-[#F47920] transition-colors">
                <span className="lang-en">Services</span>
                <span className="lang-ta">சேவைகள்</span>
              </Link>
              <Link href="#projects" className="text-[16px] leading-[20px] font-medium text-black/50 hover:text-[#F47920] transition-colors">
                <span className="lang-en">Projects</span>
                <span className="lang-ta">திட்டங்கள்</span>
              </Link>
              <Link href="#process" className="text-[16px] leading-[20px] font-medium text-black/50 hover:text-[#F47920] transition-colors">
                <span className="lang-en">Process</span>
                <span className="lang-ta">செயல்முறை</span>
              </Link>
              <Link href="#faq" className="text-[16px] leading-[20px] font-medium text-black/50 hover:text-[#F47920] transition-colors">
                <span className="lang-en">FAQ</span>
                <span className="lang-ta">கேள்விகள்</span>
              </Link>
              <Link href="#contact" className="text-[16px] leading-[20px] font-medium text-black/50 hover:text-[#F47920] transition-colors">
                <span className="lang-en">Contact</span>
                <span className="lang-ta">தொடர்புகொள்ள</span>
              </Link>
            </div>

            {/* Pages Column */}
            <div className="flex flex-col items-start gap-[10px] min-w-[120px]">
              <h3 className="text-[16px] leading-[20px] font-medium text-[#F47920] mb-1">
                <span className="lang-en">Pages</span>
                <span className="lang-ta">பக்கங்கள்</span>
              </h3>
              <Link href="/" className="text-[16px] leading-[20px] font-medium text-black/50 hover:text-[#F47920] transition-colors">
                <span className="lang-en">Home</span>
                <span className="lang-ta">முகப்பு</span>
              </Link>
              <Link href="/projects" className="text-[16px] leading-[20px] font-medium text-black/50 hover:text-[#F47920] transition-colors">
                <span className="lang-en">Projects</span>
                <span className="lang-ta">திட்டங்கள்</span>
              </Link>
              <Link href="/contact" className="text-[16px] leading-[20px] font-medium text-black/50 hover:text-[#F47920] transition-colors">
                <span className="lang-en">Contact Us</span>
                <span className="lang-ta">தொடர்பு கொள்ளவும்</span>
              </Link>
            </div>

            {/* Contact Details Column */}
            <div className="flex flex-col items-start gap-[15px] max-w-[300px]">
              <h3 className="text-[16px] leading-[20px] font-medium text-[#F47920] mb-1">
                <span className="lang-en">Contact Details</span>
                <span className="lang-ta">தொடர்பு விவரங்கள்</span>
              </h3>
              
              <div className="flex flex-row items-center gap-[10px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="rgba(0, 0, 0, 0.5)"/>
                </svg>
                <a href={`mailto:${email}`} className="text-[14px] md:text-[16px] leading-[20px] font-medium text-black/50 hover:text-[#F47920] transition-colors break-all">
                  {email}
                </a>
              </div>

              <div className="flex flex-row items-center gap-[10px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M17 1.01L7 1C5.9 1 5 1.9 5 3V21C5 22.1 5.9 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.9 18.1 1.01 17 1.01ZM17 19H7V5H17V19Z" fill="rgba(0, 0, 0, 0.5)"/>
                </svg>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-[16px] leading-[20px] font-medium text-black/50 hover:text-[#F47920] transition-colors">
                  {phone}
                </a>
              </div>

              <div className="flex flex-row items-start gap-[10px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="rgba(0, 0, 0, 0.5)"/>
                </svg>
                <p className="text-[16px] leading-[20px] font-medium text-black/50">
                  {address}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-4 pt-1">
          <p className="text-[14px] md:text-[16px] leading-[20px] font-medium text-black/50 text-center sm:text-left">
            Copyright@2026
          </p>
          <p className="text-[14px] md:text-[16px] leading-[20px] text-black/50 font-medium text-center sm:text-right">
            Crafted by{" "}
            <a
              href="https://www.efilliks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F47920] transition-colors underline underline-offset-4"
            >
              Efilliks
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
