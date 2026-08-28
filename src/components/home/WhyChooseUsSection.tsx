"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

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
  const rightFeatures = [
    {
      titleEn: "3D Architecture Modeling",
      titleTa: "3D கட்டடக்கலை மாதிரியாக்கம்",
      descEn: "We begin with the purpose of the space—not simply the construction.",
      descTa: "நாங்கள் இடத்தின் நோக்கத்துடன் தொடங்குகிறோம்-வெறும் கட்டுமானத்துடன் அல்ல.",
      img: "/images/process1.png",
      imgAlt: "3D Architecture blueprint drawing",
      imgWidth: "w-[180px] sm:w-[220px] lg:w-[260px]",
      imgHeight: "h-[100px] sm:h-[120px] lg:h-[140px]",
      bottomOffset: "bottom-0 lg:-bottom-1",
    },
    {
      titleEn: "One Integrated Team",
      titleTa: "ஒரு ஒருங்கிணைந்த குழு",
      descEn: "Architecture, construction, and interiors work together instead of isolation.",
      descTa: "கட்டிடக்கலை, கட்டுமானம் மற்றும் உள் அலங்காரம் ஆகியவை தனித்தனியாக இல்லாமல் ஒன்றாக செயல்படுகின்றன.",
      img: "/images/process2.png",
      imgAlt: "Engineers team",
      imgWidth: "w-[160px] sm:w-[200px] lg:w-[220px]",
      imgHeight: "h-[90px] sm:h-[110px] lg:h-[128px]",
      bottomOffset: "bottom-0 lg:bottom-[1px]",
    },
    {
      titleEn: "Clear Communication",
      titleTa: "தெளிவான தகவல் தொடர்பு",
      descEn: "You should always know what is happening and what decisions need to be made.",
      descTa: "என்ன நடக்கிறது மற்றும் என்ன முடிவுகள் எடுக்கப்பட வேண்டும் என்பதை நீங்கள் எப்போதும் தெரிந்து கொள்ள வேண்டும்.",
      img: "/images/process3.png",
      imgAlt: "Client meeting discussion",
      imgWidth: "w-[160px] sm:w-[190px] lg:w-[218px]",
      imgHeight: "h-[130px] sm:h-[160px] lg:h-[185px]",
      bottomOffset: "bottom-0 lg:-bottom-[20px]",
    },
    {
      titleEn: "Attention To Detail",
      titleTa: "விவரங்களில் கவனம்",
      descEn: "From structural work to the final finish, we believe quality lives in the details.",
      descTa: "கட்டமைப்பு வேலை முதல் இறுதி முடிவு வரை, தரம் விவரங்களில் வாழ்கிறது என்று நாங்கள் நம்புகிறோம்.",
      img: "/images/process4.png",
      imgAlt: "Customer support expert",
      imgWidth: "w-[110px] sm:w-[130px] lg:w-[144px]",
      imgHeight: "h-[110px] sm:h-[130px] lg:h-[144px]",
      bottomOffset: "bottom-0 lg:bottom-[1px]",
    },
  ];

  return (
    <section className="flex flex-col items-center bg-[#FFFAFA] w-full pt-[80px] md:pt-[100px] px-4 sm:px-6 lg:px-8 pb-16 z-10 overflow-hidden">
      
      {/* Header Container */}
      <div className="flex flex-col items-center gap-[15px] w-full max-w-[1400px] mb-10 md:mb-14">
        {/* Badge */}
        <div className="flex flex-row items-center p-[5px] pr-[10px] gap-[6px] bg-[#F47920] rounded-[8px] shadow-sm">
          <div className="flex items-center justify-center p-[3px] w-[22px] h-[22px] bg-white rounded-[5px]">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="22" rx="5" fill="white"/>
              <path d="M11 4.3335C14.682 4.3335 17.6666 7.31816 17.6666 11.0002C17.6666 14.6822 14.682 17.6668 11 17.6668C7.31798 17.6668 4.33331 14.6822 4.33331 11.0002C4.33331 7.31816 7.31798 4.3335 11 4.3335ZM11 13.6668C10.8232 13.6668 10.6536 13.7371 10.5286 13.8621C10.4036 13.9871 10.3333 14.1567 10.3333 14.3335C10.3333 14.5103 10.4036 14.6799 10.5286 14.8049C10.6536 14.9299 10.8232 15.0002 11 15.0002H11.0013C11.1781 15.0002 11.3477 14.9299 11.4727 14.8049C11.5977 14.6799 11.668 14.5103 11.668 14.3335C11.668 14.1567 11.5977 13.9871 11.4727 13.8621C11.3477 13.7371 11.1781 13.6668 11.0013 13.6668H11ZM11 7.3335C10.359 7.3335 9.74435 7.58811 9.29114 8.04132C8.83793 8.49453 8.58331 9.10922 8.58331 9.75016C8.58331 9.92697 8.65355 10.0965 8.77857 10.2216C8.9036 10.3466 9.07317 10.4168 9.24998 10.4168C9.42679 10.4168 9.59636 10.3466 9.72138 10.2216C9.84641 10.0965 9.91665 9.92697 9.91665 9.75016C9.91675 9.55349 9.97038 9.36056 10.0718 9.19205C10.1732 9.02355 10.3186 8.88583 10.4923 8.79368C10.6661 8.70152 10.8616 8.6584 11.058 8.66893C11.2544 8.67947 11.4442 8.74327 11.6071 8.85349C11.77 8.96371 11.8998 9.11619 11.9826 9.29458C12.0654 9.47297 12.0981 9.67054 12.0772 9.86609C12.0562 10.0616 11.9824 10.2478 11.8637 10.4046C11.745 10.5614 11.5858 10.6829 11.4033 10.7562C10.9533 10.9362 10.3333 11.3982 10.3333 12.1668V12.3335C10.3333 12.5103 10.4036 12.6799 10.5286 12.8049C10.6536 12.9299 10.8232 13.0002 11 13.0002C11.1768 13.0002 11.3464 12.9299 11.4714 12.8049C11.5964 12.6799 11.6666 12.5103 11.6666 12.3335V12.1695C11.6734 12.1538 11.6832 12.1395 11.6953 12.1275C11.7521 12.0679 11.8219 12.0223 11.8993 11.9942C12.4203 11.785 12.8523 11.401 13.1211 10.9081C13.3899 10.4152 13.4787 9.84409 13.3723 9.29282C13.266 8.74156 12.971 8.24451 12.5381 7.88699C12.1052 7.52947 11.5614 7.33377 11 7.3335Z" fill="#F47920"/>
            </svg>
          </div>
          <span className="text-white text-[12px] leading-[15px] text-center font-medium tracking-wide">
            <span className="lang-en">Why Choose Us</span>
            <span className="lang-ta">ஏன் எங்களை தேர்ந்தெடுக்க வேண்டும்</span>
          </span>
        </div>

        {/* Heading */}
        <h2 className="justify-center text-center text-[26px] sm:text-[30px] md:text-[36px] leading-[34px] sm:leading-[40px] md:leading-[44px] font-bold uppercase text-black w-full max-w-[800px] mx-auto tracking-tight">
          <span className="lang-en">Why Sivaguru Builders</span>
          <span className="lang-ta">ஏன் சிவகுரு பில்டர்ஸ்</span>
        </h2>
      </div>

      {/* Main Grid Layout - Frame 877 Specification */}
      <motion.div 
        variants={containerVariants}
        initial="show"
        animate="show"
        className="flex flex-col gap-4 sm:gap-5 w-full max-w-[1400px] mx-auto"
      >
        
        {/* Top 2-Column Section (Frame 886 Left Card + Frame 891-894 Right Stack) */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 w-full items-stretch">
          
          {/* Frame 886: Left Orange Featured Card */}
          <motion.div 
            variants={itemVariants}
            className="relative w-full lg:w-[554px] shrink-0 bg-[#F47920] rounded-[20px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[480px] sm:min-h-[550px] lg:h-[626px] overflow-hidden shadow-lg z-10"
          >
            {/* Header Text (Frame 892) */}
            <div className="flex flex-col gap-2.5 z-20 max-w-[514px]">
              <h2 className="text-[26px] sm:text-[30px] lg:text-[34px] leading-[34px] sm:leading-[38px] lg:leading-[42px] uppercase text-white font-normal font-['Geologica',sans-serif]">
                <span className="lang-en">Built on thought. Delivered with discipline.</span>
                <span className="lang-ta">சிந்தனையில் கட்டப்பட்டது. ஒழுக்கத்துடன் வழங்கப்பட்டது.</span>
              </h2>
              <p className="text-[14px] sm:text-[16px] leading-[20px] text-[#FFE2C4] font-medium font-['Geologica',sans-serif]">
                <span className="lang-en">You deserve a partner who understands both the vision and the responsibility that comes with it.</span>
                <span className="lang-ta">பார்வை மற்றும் அதனுடன் வரும் பொறுப்பு இரண்டையும் புரிந்து கொள்ளும் கூட்டாளி உங்களுக்குத் தேவை.</span>
              </p>
            </div>

            {/* Bottom House Image (wcu1.png) */}
            <div className="relative w-full h-[280px] sm:h-[340px] lg:h-[420px] shrink-0 z-10 -mb-6 sm:-mb-8 lg:-mb-10">
              <Image 
                src="/images/wcu1.png" 
                alt="Modern luxury house rendering" 
                fill 
                sizes="(max-width: 1024px) 100vw, 554px"
                className="object-contain object-bottom pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Right Stack (Frame 891 - Frame 894): 4 Standard Feature Cards */}
          <div className="flex-1 flex flex-col gap-3.5 sm:gap-4 w-full justify-between">
            {rightFeatures.map((item, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="relative flex flex-col justify-start sm:justify-center p-4 sm:p-6 lg:p-7 pb-20 sm:pb-6 lg:pb-7 gap-1.5 sm:gap-2 w-full min-h-[175px] sm:min-h-[142px] lg:h-[149px] bg-white rounded-[12.5px] shadow-[inset_0px_0px_14.1px_0.3px_rgba(244,121,32,0.3)] overflow-hidden z-10"
              >
                {/* Title */}
                <h3 className="text-[17px] sm:text-[22px] lg:text-[24px] leading-[22px] sm:leading-[28px] lg:leading-[30px] uppercase text-black font-normal font-['Geologica',sans-serif] z-20 w-full sm:max-w-[70%] lg:max-w-[560px]">
                  <span className="lang-en">{item.titleEn}</span>
                  <span className="lang-ta">{item.titleTa}</span>
                </h3>

                {/* Description */}
                <p className="text-[12px] sm:text-[15px] lg:text-[16px] leading-[17px] sm:leading-[20px] text-black/50 font-normal font-['Geologica',sans-serif] z-20 w-full sm:max-w-[70%] lg:max-w-[560px]">
                  <span className="lang-en">{item.descEn}</span>
                  <span className="lang-ta">{item.descTa}</span>
                </p>

                {/* Image Asset - Centered at bottom on mobile, right-aligned on desktop */}
                <div className={`absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-0 ${item.bottomOffset} ${item.imgWidth} ${item.imgHeight} z-10 pointer-events-none opacity-90 sm:opacity-100`}>
                  <Image 
                    src={item.img} 
                    alt={item.imgAlt} 
                    fill 
                    sizes="300px"
                    className="object-contain object-bottom sm:object-right-bottom"
                  />
                </div>

                {/* Bottom Orange Glow SVG (Placed on top of image with higher z-index) */}
                <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none z-30">
                  <svg width="100%" height="45" viewBox="0 0 836 61" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <g filter="url(#filter0_f_227_318)">
                      <path d="M0 61L418 24L836 61H0Z" fill="#F47920"/>
                    </g>
                    <defs>
                      <filter id="filter0_f_227_318" x="-24" y="0" width="884" height="85" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feGaussianBlur stdDeviation="12" result="effect1_foregroundBlur_227_318"/>
                      </filter>
                    </defs>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Frame 895: Bottom Wide Card (Built for long term) */}
        <motion.div 
          variants={itemVariants}
          className="relative flex flex-col justify-start sm:justify-center p-4 sm:p-6 lg:p-7 pb-20 sm:pb-6 lg:pb-7 gap-1.5 sm:gap-2 w-full min-h-[185px] sm:min-h-[149px] lg:h-[149px] bg-white rounded-[12.5px] shadow-[inset_0px_0px_14.1px_0.3px_rgba(244,121,32,0.3)] overflow-hidden z-10"
        >
          {/* Title */}
          <h3 className="text-[17px] sm:text-[22px] lg:text-[24px] leading-[22px] sm:leading-[28px] lg:leading-[30px] uppercase text-black font-normal font-['Geologica',sans-serif] z-20 w-full sm:max-w-[65%] lg:max-w-[700px]">
            <span className="lang-en">Built for long term</span>
            <span className="lang-ta">நீண்ட காலத்திற்கு கட்டப்பட்டது</span>
          </h3>

          {/* Description */}
          <p className="text-[12px] sm:text-[15px] lg:text-[16px] leading-[18px] sm:leading-[20px] text-black/50 font-normal font-['Geologica',sans-serif] z-20 w-full sm:max-w-[60%] lg:max-w-[500px]">
            <span className="lang-en">We focus on creating spaces that remain functional and relevant for years to come.</span>
            <span className="lang-ta">வரும் ஆண்டுகளில் செயல்படக்கூடிய மற்றும் பொருத்தமான இடங்களை உருவாக்குவதில் நாங்கள் கவனம் செலுத்துகிறோம்.</span>
          </p>

          {/* Image Asset - Centered at bottom on mobile, right-aligned on desktop */}
          <div className="absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-0 -bottom-2 sm:-bottom-8 lg:-bottom-[39px] w-[240px] sm:w-[320px] lg:w-[377px] h-[120px] sm:h-[160px] lg:h-[188px] z-10 pointer-events-none opacity-90 sm:opacity-100">
            <Image 
              src="/images/process5.png" 
              alt="Horizontal modern building design" 
              fill 
              sizes="400px"
              className="object-contain object-bottom sm:object-right-bottom"
            />
          </div>

          {/* Bottom Orange Glow SVG (Placed on top of image with higher z-index) */}
          <div className="absolute bottom-0 left-0 w-full flex justify-center pointer-events-none z-30">
            <svg width="100%" height="45" viewBox="0 0 836 61" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <g filter="url(#filter0_f_227_318_wide)">
                <path d="M0 61L418 24L836 61H0Z" fill="#F47920"/>
              </g>
              <defs>
                <filter id="filter0_f_227_318_wide" x="-24" y="0" width="884" height="85" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feGaussianBlur stdDeviation="12" result="effect1_foregroundBlur_227_318"/>
                </filter>
              </defs>
            </svg>
          </div>
        </motion.div>



      </motion.div>
    </section>
  );
}
