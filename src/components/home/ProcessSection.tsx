import { AnimatedHeading } from "@/components/ui/HeadingText";

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
  return (
    <section id="process" className="flex flex-col items-center bg-[#FFFAFA] w-full pt-[100px] px-5 pb-5 z-10">
      
      {/* Header Container */}
      <div className="flex flex-col items-center gap-[15px] w-full max-w-[1400px] mb-5">
        
        {/* Badge */}
        <div className="flex flex-row items-center p-[5px] pr-[10px] gap-[6px] bg-[#F47920] rounded-[8px]">
          <div className="flex items-center justify-center p-[3px] w-[22px] h-[22px] bg-white rounded-[5px]">
            {/* Batch Icon SVG */}
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="22" rx="5" fill="white"/>
              <path d="M11 4.33325C7.32331 4.33325 4.33331 7.32325 4.33331 10.9999C4.33331 14.6766 7.32331 17.6666 11 17.6666C14.6766 17.6666 17.6666 14.6766 17.6666 10.9999C17.6666 7.32325 14.6766 4.33325 11 4.33325ZM12.8133 13.5199L10.5 11.2066V7.32992H11.5V10.7933L13.52 12.8133L12.8133 13.5199Z" fill="#F47920"/>
            </svg>
          </div>
          <span className="text-white text-[12px] leading-[15px] text-center font-normal">
            <span className="lang-en">Process</span>
            <span className="lang-ta">செயல்முறை</span>
          </span>
        </div>

        {/* Heading */}
        <h2 className="justify-center text-center text-[24px] sm:text-[28px] md:text-[30px] leading-[32px] sm:leading-[38px] font-medium uppercase text-black w-full max-w-[800px] mx-auto">
          <span className="lang-en">Our Start To End Approach</span>
          <span className="lang-ta">எங்கள் தொடக்கம் முதல் முடிவு வரையிலான அணுகுமுறை</span>
        </h2>
      </div>

      {/* Cards Grid Container - Equal Height for All Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 w-full max-w-[1400px] items-stretch">
        {processSteps.map((step, index) => (
          <div 
            key={index} 
            className="flex flex-col justify-between items-start p-[10px] gap-4 w-full h-full bg-white rounded-[20px] shadow-xs"
          >
            
            {/* Top Box (Number & Glow) */}
            <div className="relative w-full h-[151px] bg-white shadow-[inset_0px_0px_10px_0.3px_rgba(244,121,32,0.2)] rounded-[12.5px] overflow-hidden flex flex-col justify-end items-center shrink-0">
              
              {/* Bottom Glow SVG */}
              <div className="absolute bottom-0 w-full flex justify-center pointer-events-none">
                <svg width="244" height="43" viewBox="0 0 244 43" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                  <g filter="url(#filter0_f_28_806)">
                    <path d="M-4 43L122.5 24L249 43H-4Z" fill="#F47920"/>
                  </g>
                  <defs>
                    <filter id="filter0_f_28_806" x="-28" y="0" width="301" height="67" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                      <feGaussianBlur stdDeviation="12" result="effect1_foregroundBlur_28_806"/>
                    </filter>
                  </defs>
                </svg>
              </div>

              {/* Large Absolute Number */}
              <span className="absolute -bottom-[31px] text-[#F47920] font-normal text-[100px] leading-[125px] uppercase z-10 text-center">
                {step.num}
              </span>
            </div>

            {/* Bottom Content Area - Flex 1 to fill card height uniformly */}
            <div className="flex flex-col justify-between items-start gap-[10px] w-full px-1 pb-2 flex-1">
              <h3 className="text-[22px] sm:text-[24px] leading-[28px] sm:leading-[30px] uppercase text-black w-full">
                <span className="lang-en">{step.titleEn}</span>
                <span className="lang-ta">{step.titleTa}</span>
              </h3>
              <p className="text-[14px] sm:text-[16px] leading-[20px] text-black/50 w-full flex-1">
                <span className="lang-en">{step.descEn}</span>
                <span className="lang-ta">{step.descTa}</span>
              </p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
