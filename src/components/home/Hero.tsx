"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AnimatedHeading } from "@/components/ui/HeadingText";
import { FadeInBlock } from "@/components/ui/Paratext";

export function Hero() {
  return (
    <section className="relative w-full h-[100dvh] min-h-screen overflow-hidden bg-white">
      {/* 1. Background Image (Bg) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Bg.png"
          alt="Sivaguru Builders architectural background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Rectangle 5: Top Gradient Multiply Overlay */}
        <div
          className="absolute top-0 left-0 w-full h-[350px] lg:h-[407px] mix-blend-multiply pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, #EFAA91 0%, rgba(255, 124, 77, 0) 100%)",
          }}
        />
      </div>

      {/* 2. Front Image Overlay (front.png) */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <Image
          src="/images/front.png"
          alt="Sivaguru Builders front building feature"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* 3. Large 3D-style Brand Name Overlay (SIVAGURU) */}
      <div className="absolute top-[210px] sm:top-[110px] lg:top-[20px] left-0 w-full flex justify-center z-[3] lg:z-[1] pointer-events-none px-4 overflow-visible">
        <motion.h1
          initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.4,
            delay: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="font-['Geologica',sans-serif] font-semibold text-[60px] sm:text-[13vw] md:text-[150px] lg:text-[210px] leading-normal tracking-[0.7px] text-center select-none bg-clip-text text-transparent flex items-center justify-center pt-2 pb-1"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #FFFFFF 0%, rgba(255, 220, 178, 0) 100%)",
          }}
        >
          <span className="lang-en py-1">SIVAGURU</span>
          <span className="lang-ta pt-4 pb-2 leading-[1.25]">சிவகுரு</span>
        </motion.h1>
      </div>

      {/* 4. Bottom Green Gradient Frame with Backdrop Blur (Frame 870: 297px on mobile, 278px on desktop) */}
      <div
        className="absolute bottom-0 left-0 w-full h-[297px] lg:h-[278px] z-[3] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(91, 112, 28, 0) 0%, #5B701C 100%)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
        }}
      />

      {/* 5. Main Content Layer */}
      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pb-6 lg:pb-10 flex flex-col justify-end">
        {/* Mobile: stacked; Desktop: 2 columns (Left: Title + Buttons; Right: Paragraph + Badge) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 lg:gap-12 w-full">
          
          {/* Left Column (Mobile & Desktop) */}
          <div className="max-w-[672px] w-full flex flex-col items-start gap-2.5 sm:gap-4 lg:gap-6">
            
            {/* Mobile-only Badge (Frame 864) */}
            <FadeInBlock delay={0.3} className="lg:hidden">
              <div className="flex items-center gap-[10px] bg-white rounded-[39px] px-[16px] py-[10px] h-[36px]">
                {/* Overlapping Avatars */}
                <div className="flex items-center">
                  <img
                    src="https://i.pinimg.com/736x/fc/79/f8/fc79f81dcb4c5497c58949208a2cc7b3.jpg"
                    alt="Avatar 1"
                    className="w-[16px] h-[16px] rounded-full border border-[#F47920] shrink-0 object-cover object-center"
                  />
                  <img
                    src="https://i.pinimg.com/1200x/d0/18/d3/d018d3646a7d320d800a428b66d7c768.jpg"
                    alt="Avatar 2"
                    className="w-[16px] h-[16px] rounded-full border border-[#F47920] shrink-0 -ml-[8px] object-cover object-center"
                  />
                  <img
                    src="https://i.pinimg.com/736x/3f/9d/63/3f9d631918ad6ea230515d80d608fd04.jpg"
                    alt="Avatar 3"
                    className="w-[16px] h-[16px] rounded-full border border-[#F47920] shrink-0 -ml-[8px] object-cover object-center"
                  />
                </div>
                <span className="font-['Geologica',sans-serif] font-light text-[12px] leading-[15px] text-[#F47920] whitespace-nowrap">
                  <span className="lang-en">Building with purpose.</span>
                  <span className="lang-ta">நோக்கத்துடன் உருவாக்குகிறது.</span>
                </span>
              </div>
            </FadeInBlock>

            {/* Headline */}
            <h2 className="font-['Geologica',sans-serif] font-medium text-[24px] sm:text-4xl lg:text-[48px] leading-[30px] sm:leading-tight lg:leading-[60px] tracking-[0.7px] capitalize text-white">
              <span className="lang-en">Building Your Dreams with Quality &amp; Trust</span>
              <span className="lang-ta">தரத்தில் சிறப்பு, நம்பிக்கையில் உறுதி</span>
            </h2>

            {/* Mobile-only Description Paragraph */}
            <FadeInBlock delay={0.7} className="w-full lg:hidden">
              <p className="lang-en font-['Geologica',sans-serif] font-normal text-[10px] sm:text-sm leading-[12px] sm:leading-relaxed tracking-[0.7px] capitalize text-[#FFE2C4] max-w-[659px]">
                From concept to completion, Sivaguru Builders delivers
                high-quality residential, commercial, and renovation projects
                with precision, transparency, and on-time delivery.
              </p>
              <p className="lang-ta font-['Geologica',sans-serif] font-normal text-[10px] sm:text-sm leading-[12px] sm:leading-relaxed tracking-[0.7px] capitalize text-[#FFE2C4] max-w-[659px]">
                கருத்து முதல் நிறைவு வரை, சிவகுரு பில்டர்ஸ் தரம், வெளிப்படைத்தன்மை மற்றும் சரியான நேரத்தில் குடியிருப்பு, வணிகத் திட்டங்களை வழங்குகிறது.
              </p>
            </FadeInBlock>

            {/* Container for Buttons */}
            <FadeInBlock delay={0.9} className="relative z-20 w-full mt-2 lg:mt-4">
              <div className="flex flex-row items-center gap-[20px] lg:gap-[32px] w-full max-w-[380px] lg:max-w-none">
                <Link href="/contact" className="flex-1 lg:flex-initial inline-block">
                  <Button theme="dark" className="w-full text-[12px] sm:text-[14px]">
                    <span className="lang-en">Start Your Project</span>
                    <span className="lang-ta">திட்டத்தை தொடங்குங்கள்</span>
                  </Button>
                </Link>
                <Link href="/projects" className="flex-1 lg:flex-initial inline-block">
                  <Button theme="light" className="w-full text-[12px] sm:text-[14px]">
                    <span className="lang-en">Explore Our Work</span>
                    <span className="lang-ta">பணிகளை ஆராயுங்கள்</span>
                  </Button>
                </Link>
              </div>
            </FadeInBlock>
          </div>

          {/* Right Column (Desktop Only: Paragraph at top right / Badge at bottom right) */}
          <div className="hidden lg:flex flex-col items-end gap-5 max-w-[480px] w-full text-right pb-2">
            {/* Trust Badge at Top Right above paragraph */}
            <FadeInBlock delay={0.3}>
              <div className="flex items-center gap-[10px] bg-white rounded-[39px] px-[16px] py-[10px] h-[36px] shadow-sm">
                <div className="flex items-center">
                  <img
                    src="https://i.pinimg.com/736x/fc/79/f8/fc79f81dcb4c5497c58949208a2cc7b3.jpg"
                    alt="Avatar 1"
                    className="w-[16px] h-[16px] rounded-full border border-[#F47920] shrink-0 object-cover object-center"
                  />
                  <img
                    src="https://i.pinimg.com/1200x/d0/18/d3/d018d3646a7d320d800a428b66d7c768.jpg"
                    alt="Avatar 2"
                    className="w-[16px] h-[16px] rounded-full border border-[#F47920] shrink-0 -ml-[8px] object-cover object-center"
                  />
                  <img
                    src="https://i.pinimg.com/736x/3f/9d/63/3f9d631918ad6ea230515d80d608fd04.jpg"
                    alt="Avatar 3"
                    className="w-[16px] h-[16px] rounded-full border border-[#F47920] shrink-0 -ml-[8px] object-cover object-center"
                  />
                </div>
                <span className="font-['Geologica',sans-serif] font-light text-[12px] leading-[15px] text-[#F47920] whitespace-nowrap">
                  <span className="lang-en">Building with purpose.</span>
                  <span className="lang-ta">நோக்கத்துடன் உருவாக்குகிறது.</span>
                </span>
              </div>
            </FadeInBlock>

            {/* Desktop Description Paragraph */}
            <FadeInBlock delay={0.7} className="w-full">
              <p className="lang-en font-['Geologica',sans-serif] font-medium text-[16px] leading-[22px] tracking-[0.7px] capitalize text-[#FFE2C4]">
                From Concept To Completion, Sivaguru Builders Delivers High-Quality
                Residential, Commercial, And Renovation Projects With Precision,
                Transparency, And On-Time Delivery.
              </p>
              <p className="lang-ta font-['Geologica',sans-serif] font-medium text-[16px] leading-[22px] tracking-[0.7px] capitalize text-[#FFE2C4]">
                கருத்து முதல் நிறைவு வரை, சிவகுரு பில்டர்ஸ் தரம், வெளிப்படைத்தன்மை மற்றும் சரியான நேரத்தில் குடியிருப்பு, வணிகத் திட்டங்களை வழங்குகிறது.
              </p>
            </FadeInBlock>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
