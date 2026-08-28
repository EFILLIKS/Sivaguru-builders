"use client";

import { useState, useEffect, useRef } from "react";

const processSteps = [
  {
    num: "01",
    titleEn: "Plan",
    titleTa: "திட்டமிடல்",
    descEn: "Materials, specifications, timelines, costs, and execution are carefully planned before work begins.",
    descTa: "பணி தொடங்குவதற்கு முன் பொருட்கள், விவரக்குறிப்புகள், காலக்கெடுக்கள் மற்றும் செலவுகள் கவனமாக திட்டமிடப்படுகின்றன.",
  },
  {
    num: "02",
    titleEn: "Design",
    titleTa: "வடிவமைப்பு",
    descEn: "We translate those requirements into thoughtful architectural and interior solutions.",
    descTa: "அந்தத் தேவைகளை சிந்தனைமிக்க கட்டடக்கலை மற்றும் உள் தீர்வுகளாக நாங்கள் மாற்றுகிறோம்.",
  },
  {
    num: "03",
    titleEn: "Build",
    titleTa: "கட்டுமானம்",
    descEn: "Materials, specifications, timelines, costs, and execution are carefully planned before work begins.",
    descTa: "துல்லியமான மற்றும் தரமான கைவினைத்திறனுடன் கட்டுமானம் திறம்பட செய்யப்படுகிறது.",
  },
  {
    num: "04",
    titleEn: "Refine",
    titleTa: "மேம்படுத்துதல்",
    descEn: "Every important detail is reviewed from structure to finishes.",
    descTa: "கட்டமைப்பு முதல் முடிவு வரை ஒவ்வொரு முக்கிய விவரமும் மதிப்பாய்வு செய்யப்படுகிறது.",
  },
  {
    num: "05",
    titleEn: "Deliver",
    titleTa: "ஒப்படைத்தல்",
    descEn: "A completed space that's ready to live in, work in, and grow with.",
    descTa: "வாழ்வதற்கும், வேலை செய்வதற்கும் தயார் நிலையில் உள்ள பூர்த்தி செய்யப்பட்ட இடம்.",
  },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const targetCenter = viewportHeight * 0.5;

      let currentActive: number | null = null;
      let minDistance = Infinity;

      cardRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;

        if (rect.top <= targetCenter + 100) {
          const distance = Math.abs(cardCenter - targetCenter);
          if (distance < minDistance) {
            minDistance = distance;
            currentActive = index;
          }
        }
      });

      setActiveStep(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="process" className="flex flex-col items-center bg-white w-full pt-[80px] md:pt-[100px] px-4 sm:px-6 lg:px-8 pb-20 z-10">
      
      {/* Header Container */}

      <div className="flex flex-col items-center gap-[15px] w-full max-w-[1440px] mb-12 md:mb-16">
        
        {/* Badge */}
        <div className="flex flex-row items-center p-[5px] pr-[10px] gap-[6px] bg-[#F47920] rounded-[8px] shadow-sm">
          <div className="flex items-center justify-center p-[3px] w-[22px] h-[22px] bg-white rounded-[5px]">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="22" rx="5" fill="white"/>
              <path d="M11 4.33325C7.32331 4.33325 4.33331 7.32325 4.33331 10.9999C4.33331 14.6766 7.32331 17.6666 11 17.6666C14.6766 17.6666 17.6666 14.6766 17.6666 10.9999C17.6666 7.32325 14.6766 4.33325 11 4.33325ZM12.8133 13.5199L10.5 11.2066V7.32992H11.5V10.7933L13.52 12.8133L12.8133 13.5199Z" fill="#F47920"/>
            </svg>
          </div>
          <span className="text-white text-[12px] leading-[15px] text-center font-medium tracking-wide">
            <span className="lang-en">Process</span>
            <span className="lang-ta">செயல்முறை</span>
          </span>
        </div>

        {/* Heading */}
        <h2 className="justify-center text-center text-[26px] sm:text-[30px] md:text-[36px] leading-[34px] sm:leading-[40px] md:leading-[44px] font-bold uppercase text-black w-full max-w-[800px] mx-auto tracking-tight">
          <span className="lang-en">Our Start To End Approach</span>
          <span className="lang-ta">எங்கள் தொடக்கம் முதல் முடிவு வரையிலான அணுகுமுறை</span>
        </h2>
      </div>

      {/* Responsive Stepper Container - Width fills parent up to max 1440px */}
      <div className="relative w-full max-w-[1440px] mx-auto px-2 sm:px-4">
        
        {/* Continuous Vertical Timeline Line */}
        <div className="absolute left-[39px] sm:left-[51px] top-8 bottom-8 w-[2px] bg-[#F47920]/30 z-0" />

        {/* Dynamic Progress Indicator Line */}
        <div
          className="absolute left-[39px] sm:left-[51px] top-8 w-[2px] bg-[#F47920] z-0 transition-all duration-500 ease-out"
          style={{
            height:
              activeStep === null
                ? "0%"
                : `${Math.min(100, ((activeStep + 1) / processSteps.length) * 100)}%`,
          }}
        />

        {/* Steps List */}
        <div className="flex flex-col gap-6 sm:gap-8 relative z-10 w-full">
          {processSteps.map((step, index) => {
            const isReachedOrPassed = activeStep !== null && index <= activeStep;
            const isActive = activeStep === index;

            return (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`group flex items-start gap-4 sm:gap-6 p-5 sm:p-7 rounded-[22px] bg-white transition-all duration-400 border w-full ${
                  isActive
                    ? "border-[#F47920]/40 shadow-[0_12px_35px_-6px_rgba(244,121,32,0.18)] ring-1 ring-[#F47920]/20 scale-[1.005]"
                    : "border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                }`}
              >
                {/* Node Circle / Check Icon */}
                <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                  <div
                    className={`w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] rounded-full flex items-center justify-center transition-all duration-400 ${
                      isReachedOrPassed
                        ? "bg-[#F47920] text-white shadow-[0_4px_14px_rgba(244,121,32,0.4)]"
                        : "bg-white border-2 border-black/15 text-black/30"
                    }`}
                  >
                    {isReachedOrPassed ? (
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-black/20" />
                    )}
                  </div>
                </div>

                {/* Content Box with Requested Vertical Layout Structure */}
                <div className="flex flex-col flex-1 w-full gap-1">
                  
                  {/* Step Indicator Label (Line 1) */}
                  <div>
                    <span
                      className={`inline-block text-[12px] sm:text-[13px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider transition-colors ${
                        isActive
                          ? "bg-[#F47920]/10 text-[#F47920]"
                          : "bg-black/5 text-black/40"
                      }`}
                    >
                      Step {step.num}
                    </span>
                  </div>

                  {/* Title (Line 2) */}
                  <h3
                    className={`text-[20px] sm:text-[24px] md:text-[26px] font-bold leading-tight transition-colors ${
                      isActive ? "text-black" : "text-black/80"
                    }`}
                  >
                    <span className="lang-en">{step.titleEn}</span>
                    <span className="lang-ta">{step.titleTa}</span>
                  </h3>

                  {/* Description (Line 3) */}
                  <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-[22px] sm:leading-[24px] text-black/60 mt-0.5">
                    <span className="lang-en">{step.descEn}</span>
                    <span className="lang-ta">{step.descTa}</span>
                  </p>

                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}



