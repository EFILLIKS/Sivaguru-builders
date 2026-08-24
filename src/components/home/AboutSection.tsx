import Image from "next/image";
import { AnimatedHeading } from "@/components/ui/HeadingText";
import { FadeInBlock } from "@/components/ui/Paratext";
import { Button } from "@/components/ui/Button";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

export default function AboutSection() {
  return (
    <section id="about" className="flex flex-col items-center bg-[#FFFAFA] w-full pt-[50px] pb-[50px] md:pt-[100px] px-5 z-10">
      {/* Inner Container */}
      <div className="flex flex-col items-center gap-[30px] w-full max-w-[1400px]">
        
        {/* Heading Wrapper */}
        <div className="flex flex-col items-center gap-[5px] md:gap-[10px]">
          {/* Mobile Heading Structure */}
          <div className="flex flex-col items-center gap-[8px] md:hidden">
            <h2 className="text-[24px] leading-[30px] font-normal text-black text-center">
              <span className="lang-en">Full Design and Build Makeover Experts</span>
              <span className="lang-ta">முழு வடிவமைப்பு மற்றும் கட்டுமான வல்லுநர்கள்</span>
            </h2>
            
            {/* Leaf-shaped Image Container */}
            <div className="relative w-[90px] h-[30px] overflow-hidden rounded-tl-[56px] rounded-br-[56px] bg-[#D9D9D9] my-1">
              <Image 
                src="/images/house-image.jpg" 
                alt="Architecture makeover project" 
                fill 
                sizes="90px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Desktop Heading Structure */}
          <div className="hidden md:flex flex-col items-center gap-[10px]">
            <h2 className="text-[42px] leading-[52px] font-normal text-black text-center">
              <span className="lang-en">Full Design and Build</span>
              <span className="lang-ta">முழு வடிவமைப்பு மற்றும் கட்டுமானம்</span>
            </h2>
            
            <div className="flex flex-row items-center gap-[20px]">
              <h2 className="text-[42px] leading-[52px] font-normal text-black text-center">
                <span className="lang-en">Makeover</span>
                <span className="lang-ta">மாற்றியமைக்கும்</span>
              </h2>
              
              <div className="relative w-[159px] h-[53px] overflow-hidden rounded-tl-[100px] rounded-br-[100px] bg-[#D9D9D9]">
                <Image 
                  src="/images/house-image.jpg" 
                  alt="Architecture makeover project" 
                  fill 
                  sizes="159px"
                  className="object-cover"
                />
              </div>
              
              <h2 className="text-[42px] leading-[52px] font-normal text-black text-center">
                <span className="lang-en">Experts</span>
                <span className="lang-ta">வல்லுநர்கள்</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Paragraph Description */}
        <FadeInBlock className="w-full max-w-[800px] text-[14px] leading-[18px] text-black/50 text-center tracking-[0.7px]">
          <p className="lang-en">
            We design, build, and change spaces using a clear process that brings architecture, building work, and interiors together. From the first idea and planning to the final handover, every step is managed with care to make sure of quality, consistency, and a result that matches your vision.
          </p>
          <p className="lang-ta">
            கட்டிடக்கலை, கட்டுமானப் பணிகள் மற்றும் உள் அலங்காரம் ஆகியவற்றை ஒன்றிணைக்கும் தெளிவான செயல்முறையைப் பயன்படுத்தி நாங்கள் இடங்களை வடிவமைத்து, உருவாக்கி மாற்றுகிறோம்.
          </p>
        </FadeInBlock>

        {/* Button Action Group */}
        <div className="flex flex-row justify-center items-center gap-[10px]">
          {/* Primary Button */}
          <Button className="flex justify-center items-center px-5 py-4 w-auto h-[51px] bg-[#F47920] rounded-[12.5px] text-white uppercase text-[14px] font-semibold leading-[17px] tracking-[0.7px]">
            <span className="lang-en">Get In Touch</span>
            <span className="lang-ta">எங்களை தொடர்பு கொள்ள</span>
          </Button>
          
          {/* Secondary Button */}
          <SecondaryButton>
            <span className="lang-en">Go To Project</span>
            <span className="lang-ta">திட்டத்திற்குச் செல்லவும்</span>
          </SecondaryButton>
        </div>

      </div>
    </section>
  );
}
