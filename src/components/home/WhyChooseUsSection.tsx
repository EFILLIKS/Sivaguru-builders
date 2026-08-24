"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { AnimatedHeading } from "@/components/ui/HeadingText";

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export default function WhyChooseUsSection() {
const features = [
    {
      titleEn: "3D Design",
      titleTa: "3D வடிவமைப்பு",
      descEn: "We begin with the purpose of the space—not simply the construction.",
      descTa: "நாங்கள் இடத்தின் நோக்கத்துடன் தொடங்குகிறோம்-வெறும் கட்டுமானத்துடன் அல்ல.",
    },
    {
      titleEn: "One Integrated Team",
      titleTa: "ஒரு ஒருங்கிணைந்த குழு",
      descEn: "Architecture, construction, and interiors work together instead of isolation.",
      descTa: "கட்டிடக்கலை, கட்டுமானம் மற்றும் உள் அலங்காரம் ஆகியவை தனித்தனியாக இல்லாமல் ஒன்றாக செயல்படுகின்றன.",
    },
    {
      titleEn: "Clear Communication",
      titleTa: "தெளிவான தகவல் தொடர்பு",
      descEn: "You should always know what is happening and what decisions need to be made.",
      descTa: "என்ன நடக்கிறது மற்றும் என்ன முடிவுகள் எடுக்கப்பட வேண்டும் என்பதை நீங்கள் எப்போதும் தெரிந்து கொள்ள வேண்டும்.",
    },
    {
      titleEn: "Attention To Detail",
      titleTa: "விவரங்களில் கவனம்",
      descEn: "From structural work to the final finish, we believe quality lives in the details.",
      descTa: "கட்டமைப்பு வேலை முதல் இறுதி முடிவு வரை, தரம் விவரங்களில் வாழ்கிறது என்று நாங்கள் நம்புகிறோம்.",
    },
  ];

  return (
    <section className="flex flex-col items-center bg-[#FFFAFA] w-full pt-[100px] px-5 pb-5 z-10 overflow-hidden">
      
      {/* Header Container */}
      <div className="flex flex-col items-center gap-[15px] w-full max-w-[1400px] mb-12">
        {/* Badge */}
        <div className="flex flex-row items-center p-[5px] pr-[10px] gap-[6px] bg-[#F47920] rounded-[8px]">
          <div className="flex items-center justify-center p-[3px] w-[22px] h-[22px] bg-white rounded-[5px]">
            {/* Provided SVG Icon */}
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="22" rx="5" fill="white"/>
              <path d="M11 4.3335C14.682 4.3335 17.6666 7.31816 17.6666 11.0002C17.6666 14.6822 14.682 17.6668 11 17.6668C7.31798 17.6668 4.33331 14.6822 4.33331 11.0002C4.33331 7.31816 7.31798 4.3335 11 4.3335ZM11 13.6668C10.8232 13.6668 10.6536 13.7371 10.5286 13.8621C10.4036 13.9871 10.3333 14.1567 10.3333 14.3335C10.3333 14.5103 10.4036 14.6799 10.5286 14.8049C10.6536 14.9299 10.8232 15.0002 11 15.0002H11.0013C11.1781 15.0002 11.3477 14.9299 11.4727 14.8049C11.5977 14.6799 11.668 14.5103 11.668 14.3335C11.668 14.1567 11.5977 13.9871 11.4727 13.8621C11.3477 13.7371 11.1781 13.6668 11.0013 13.6668H11ZM11 7.3335C10.359 7.3335 9.74435 7.58811 9.29114 8.04132C8.83793 8.49453 8.58331 9.10922 8.58331 9.75016C8.58331 9.92697 8.65355 10.0965 8.77857 10.2216C8.9036 10.3466 9.07317 10.4168 9.24998 10.4168C9.42679 10.4168 9.59636 10.3466 9.72138 10.2216C9.84641 10.0965 9.91665 9.92697 9.91665 9.75016C9.91675 9.55349 9.97038 9.36056 10.0718 9.19205C10.1732 9.02355 10.3186 8.88583 10.4923 8.79368C10.6661 8.70152 10.8616 8.6584 11.058 8.66893C11.2544 8.67947 11.4442 8.74327 11.6071 8.85349C11.77 8.96371 11.8998 9.11619 11.9826 9.29458C12.0654 9.47297 12.0981 9.67054 12.0772 9.86609C12.0562 10.0616 11.9824 10.2478 11.8637 10.4046C11.745 10.5614 11.5858 10.6829 11.4033 10.7562C10.9533 10.9362 10.3333 11.3982 10.3333 12.1668V12.3335C10.3333 12.5103 10.4036 12.6799 10.5286 12.8049C10.6536 12.9299 10.8232 13.0002 11 13.0002C11.1768 13.0002 11.3464 12.9299 11.4714 12.8049C11.5964 12.6799 11.6666 12.5103 11.6666 12.3335V12.1695C11.6734 12.1538 11.6832 12.1395 11.6953 12.1275C11.7521 12.0679 11.8219 12.0223 11.8993 11.9942C12.4203 11.785 12.8523 11.401 13.1211 10.9081C13.3899 10.4152 13.4787 9.84409 13.3723 9.29282C13.266 8.74156 12.971 8.24451 12.5381 7.88699C12.1052 7.52947 11.5614 7.33377 11 7.3335Z" fill="#F47920"/>
            </svg>
          </div>
          <span className="text-white text-[12px] leading-[15px] text-center font-normal">
            <span className="lang-en">Why Choose Us</span>
            <span className="lang-ta">ஏன் எங்களை தேர்ந்தெடுக்க வேண்டும்</span>
          </span>
        </div>

        {/* Heading */}
        <h2 className="justify-center text-center text-[24px] sm:text-[28px] md:text-[30px] leading-[32px] sm:leading-[38px] font-medium uppercase text-black w-full max-w-[800px] mx-auto">
          <span className="lang-en">Why Sivaguru Builders</span>
          <span className="lang-ta">ஏன் சிவகுரு பில்டர்ஸ்</span>
        </h2>
      </div>

      {/* Main Content Layout with Framer Motion Stagger */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col lg:flex-row gap-5 w-full max-w-[1400px]"
      >
        
        {/* Left Orange Feature Card */}
        <motion.div 
          variants={itemVariants}
          className="relative w-full lg:w-[450px] shrink-0 bg-[#F47920] rounded-[20px] p-6 sm:p-8 lg:p-10 flex flex-col gap-[10px] min-h-[480px] sm:min-h-[520px] lg:h-[538px] overflow-hidden shadow-lg"
        >
          <h2 className="text-[26px] sm:text-[30px] lg:text-[34px] leading-[32px] sm:leading-[38px] lg:leading-[42px] uppercase text-white font-normal z-10 w-full max-w-[410px]">
            <span className="lang-en">Built on thought. Delivered with discipline.</span>
            <span className="lang-ta">சிந்தனையில் கட்டப்பட்டது. ஒழுக்கத்துடன் வழங்கப்பட்டது.</span>
          </h2>
          <p className="text-[14px] sm:text-[16px] leading-[18px] sm:leading-[20px] text-[#FFE2C4] font-medium z-10 w-full max-w-[410px]">
            <span className="lang-en">You deserve a partner who understands both the vision and the responsibility that comes with it.</span>
            <span className="lang-ta">பார்வை மற்றும் அதனுடன் வரும் பொறுப்பு இரண்டையும் புரிந்து கொள்ளும் கூட்டாளி உங்களுக்குத் தேவை.</span>
          </p>
          {/* Left building asset */}
          <div className="absolute left-0 right-0 bottom-0 w-full lg:w-[450px] h-[300px] sm:h-[320px] lg:h-[450px] pointer-events-none">
             <Image 
                src="/images/wcu1.png" 
                alt="Modern building design" 
                fill 
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-contain object-bottom"
              />
          </div>
        </motion.div>

        {/* Right Content Area (Grid + Wide Card) */}
        <div className="flex-1 flex flex-col gap-5 w-full">
          
          {/* 2x2 Grid for smaller cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="relative flex flex-col items-start p-5 gap-[10px] w-full min-h-[166px] bg-white rounded-[12.5px] shadow-[inset_0px_0px_14.1px_0.3px_rgba(244,121,32,0.3)] overflow-hidden"
              >
                <h3 className="text-[20px] md:text-[24px] leading-[30px] uppercase text-black z-10 font-normal">
                  <span className="lang-en">{feature.titleEn}</span>
                  <span className="lang-ta">{feature.titleTa}</span>
                </h3>
                <p className="text-[14px] md:text-[16px] leading-[20px] text-black/50 z-10 w-full max-w-[415px]">
                  <span className="lang-en">{feature.descEn}</span>
                  <span className="lang-ta">{feature.descTa}</span>
                </p>

                {/* Bottom Glow SVG Overlay */}
                <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none opacity-80">
                  <svg width="100%" height="50" viewBox="0 0 455 50" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_72_167)">
                      <path d="M5 50L227.5 24L450 50H5Z" fill="#F47920"/>
                    </g>
                    <defs>
                      <filter id="filter0_f_72_167" x="-19" y="0" width="493" height="74" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="12" result="effect1_foregroundBlur_72_167"/>
                      </filter>
                    </defs>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Wide Card */}
          <motion.div 
            variants={itemVariants}
            className="relative flex flex-col items-start p-5 md:p-8 pb-32 md:pb-8 gap-[10px] w-full min-h-[300px] md:min-h-[166px] bg-white rounded-[12.5px] shadow-[inset_0px_0px_14.1px_0.3px_rgba(244,121,32,0.3)] overflow-hidden"
          >
            <h3 className="text-[20px] md:text-[24px] leading-[30px] uppercase text-black z-10 font-normal w-full max-w-[890px]">
              <span className="lang-en">Built For Long Term</span>
              <span className="lang-ta">நீண்ட காலத்திற்கு கட்டப்பட்டது</span>
            </h3>
            <p className="text-[14px] md:text-[16px] leading-[20px] text-black/50 z-10 w-full max-w-[500px]">
              <span className="lang-en">We focus on creating spaces that remain functional and relevant for years to come.</span>
              <span className="lang-ta">வரும் ஆண்டுகளில் செயல்படக்கூடிய மற்றும் பொருத்தமான இடங்களை உருவாக்குவதில் நாங்கள் கவனம் செலுத்துகிறோம்.</span>
            </p>

            {/* Bottom Glow SVG Overlay for Wide Card */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none opacity-80 z-30">
              <svg width="100%" height="50" viewBox="0 0 455 50" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f_72_167_wide)">
                  <path d="M5 50L227.5 24L450 50H5Z" fill="#F47920"/>
                </g>
                <defs>
                  <filter id="filter0_f_72_167_wide" x="-19" y="0" width="493" height="74" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="12" result="effect1_foregroundBlur_72_167"/>
                  </filter>
                </defs>
              </svg>
            </div>

            {/* Right horizontal building asset */}
            <div className="absolute right-0 bottom-[-20px] md:-bottom-[44px] w-full max-w-[300px] md:max-w-[429px] h-[150px] md:h-[214px] z-20">
               <Image 
                  src="/images/wcu2.png" 
                  alt="Modern horizontal building design" 
                  fill 
                  sizes="(max-width: 768px) 300px, 429px"
                  className="object-contain object-right-bottom"
                />
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
