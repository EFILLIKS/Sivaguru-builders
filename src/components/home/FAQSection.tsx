"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { AnimatedHeading } from "@/components/ui/HeadingText";

// Extracted exactly from your provided image
const faqs = [
  {
    questionEn: "What services does Sivaguru Builders provide?",
    questionTa: "சிவகுரு பில்டர்ஸ் என்ன சேவைகளை வழங்குகிறது?",
    answerEn: "We provide architecture, residential construction, commercial construction, interior design, and reconstruction services.",
    answerTa: "நாங்கள் கட்டடக்கலை, குடியிருப்பு கட்டுமானம், வணிக கட்டுமானம், உள் வடிவமைப்பு மற்றும் மறுசீரமைப்பு சேவைகளை வழங்குகிறோம்.",
  },
  {
    questionEn: "Do you take up individual house construction?",
    questionTa: "நீங்கள் தனி வீடுகள் கட்டுவதை மேற்கொள்கிறீர்களா?",
    answerEn: "Yes. Our residential construction services can be tailored to individual home projects based on the client's design, requirements, site, and specifications.",
    answerTa: "ஆம். வாடிக்கையாளரின் வடிவமைப்பு, தேவைகள் மற்றும் விவரக்குறிப்புகளின் அடிப்படையில் தனி நபர் வீட்டுத் திட்டங்களுக்கு எங்களது சேவைகளை வழங்க முடியும்.",
  },
  {
    questionEn: "Can you manage the complete project?",
    questionTa: "முழு திட்டத்தையும் உங்களால் நிர்வகிக்க முடியுமா?",
    answerEn: "Yes. Depending on your requirements, we can support the project from architectural planning through construction and interior completion.",
    answerTa: "ஆம். உங்கள் தேவைகளைப் பொறுத்து, கட்டடக்கலை திட்டமிடல் முதல் கட்டுமானம் மற்றும் உள் வடிவமைப்பு நிறைவு வரை நாங்கள் திட்டத்தை ஆதரிக்க முடியும்.",
  },
  {
    questionEn: "Do you undertake commercial projects?",
    questionTa: "நீங்கள் வணிகத் திட்டங்களை மேற்கொள்கிறீர்களா?",
    answerEn: "Yes. We undertake commercial construction projects based on the project's scope, size, requirements, and location.",
    answerTa: "ஆம். திட்டத்தின் நோக்கம், அளவு, தேவைகள் மற்றும் இருப்பிடத்தின் அடிப்படையில் வணிக கட்டுமானத் திட்டங்களை மேற்கொள்கிறோம்.",
  },
  {
    questionEn: "How do I start a project with Sivaguru Builders?",
    questionTa: "சிவகுரு பில்டர்ஸுடன் ஒரு திட்டத்தை எவ்வாறு தொடங்குவது?",
    answerEn: "Tell us about your project, site, requirements, and vision. Our team will understand your needs and guide you through the next steps.",
    answerTa: "உங்கள் திட்டம், இடம், தேவைகள் மற்றும் பார்வை பற்றி எங்களிடம் கூறுங்கள். எங்கள் குழு உங்கள் தேவைகளைப் புரிந்து கொண்டு அடுத்த கட்ட நடவடிக்கைகளில் வழிகாட்டும்.",
  },
  {
    questionEn: "Can you redesign or reconstruct an existing building?",
    questionTa: "தற்போதுள்ள கட்டிடத்தை மறுவடிவமைப்பு செய்யவோ அல்லது மறுசீரமைக்கவோ முடியுமா?",
    answerEn: "Yes. Our reconstruction service focuses on transforming existing spaces through renovation, structural changes, and improved planning.",
    answerTa: "ஆம். எங்கள் மறுசீரமைப்பு சேவை புதுப்பித்தல், கட்டமைப்பு மாற்றங்கள் மற்றும் மேம்படுத்தப்பட்ட திட்டமிடல் மூலம் தற்போதைய இடங்களை மாற்றுவதில் கவனம் செலுத்துகிறது.",
  },
];

// Framer Motion Variants for staggering
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each card's animation
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="flex flex-col items-center bg-white w-full pt-[100px] px-5 pb-[50px] z-10">
      
      {/* Header Container */}
      <div className="flex flex-col items-center gap-[15px] w-full max-w-[1400px] mb-12">
        
        {/* Badge */}
        <div className="flex flex-row items-center p-[5px] pr-[10px] gap-[6px] bg-[#F47920] rounded-[8px]">
          <div className="flex items-center justify-center p-[3px] w-[22px] h-[22px] bg-white rounded-[5px]">
            {/* Provided FAQ Icon SVG */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.99998 4.66683C3.99998 3.78277 4.35117 2.93493 4.97629 2.30981C5.60141 1.68469 6.44926 1.3335 7.33331 1.3335C8.21737 1.3335 9.06521 1.68469 9.69034 2.30981C10.3155 2.93493 10.6666 3.78277 10.6666 4.66683C10.6666 5.55088 10.3155 6.39873 9.69034 7.02385C9.06521 7.64897 8.21737 8.00016 7.33331 8.00016C6.44926 8.00016 5.60141 7.64897 4.97629 7.02385C4.35117 6.39873 3.99998 5.55088 3.99998 4.66683ZM3.21465 9.7815C4.28331 9.1295 5.73665 8.66683 7.33331 8.66683C7.63154 8.66683 7.92398 8.68238 8.21065 8.7135C8.32516 8.72578 8.43454 8.76752 8.52812 8.83465C8.62171 8.90178 8.6963 8.99201 8.74464 9.09654C8.79298 9.20108 8.81342 9.31635 8.80395 9.43114C8.79449 9.54592 8.75545 9.65629 8.69065 9.7515C8.23911 10.4143 7.99837 11.1981 7.99998 12.0002C7.99998 12.6135 8.13798 13.1935 8.38331 13.7115C8.43111 13.8124 8.4528 13.9237 8.44639 14.0352C8.43998 14.1467 8.40566 14.2547 8.3466 14.3495C8.28754 14.4443 8.20562 14.5227 8.10837 14.5775C8.01111 14.6324 7.90163 14.662 7.78998 14.6635C7.63887 14.6657 7.48665 14.6668 7.33331 14.6668C5.84731 14.6668 4.44331 14.5735 3.39131 14.2948C2.86798 14.1562 2.37531 13.9575 2.00198 13.6575C1.60665 13.3402 1.33331 12.8968 1.33331 12.3335C1.33331 11.8088 1.57198 11.3182 1.89598 10.9075C2.22531 10.4908 2.68065 10.1075 3.21465 9.78083M11.3333 14.0002C11.3333 13.8234 11.4036 13.6538 11.5286 13.5288C11.6536 13.4037 11.8232 13.3335 12 13.3335H12.0013C12.1781 13.3335 12.3477 13.4037 12.4727 13.5288C12.5977 13.6538 12.668 13.8234 12.668 14.0002C12.668 14.177 12.5977 14.3465 12.4727 14.4716C12.3477 14.5966 12.1781 14.6668 12.0013 14.6668H12C11.8232 14.6668 11.6536 14.5966 11.5286 14.4716C11.4036 14.3465 11.3333 14.177 11.3333 14.0002Z" fill="#F47920"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M11.7113 10.8332C11.748 10.7696 11.8046 10.72 11.8724 10.6919C11.9402 10.6638 12.0154 10.6589 12.0863 10.6779C12.1571 10.6969 12.2198 10.7387 12.2644 10.7969C12.3091 10.8551 12.3333 10.9265 12.3333 10.9998C12.3333 11.0898 12.3013 11.1698 12.1193 11.3198C12.0699 11.3597 12.0197 11.3986 11.9686 11.4365L11.9486 11.4505C11.9 11.4872 11.8413 11.5305 11.7873 11.5745C11.69 11.6525 11.4673 11.8332 11.3693 12.1165C11.3148 12.2758 11.3225 12.4499 11.391 12.6037C11.4596 12.7575 11.5837 12.8797 11.7387 12.9458C11.8936 13.0118 12.0677 13.0167 12.2262 12.9596C12.3846 12.9025 12.5155 12.7875 12.5926 12.6378L12.622 12.6138C12.6553 12.5872 12.6933 12.5592 12.7453 12.5205L12.7653 12.5052C12.8233 12.4618 12.894 12.4085 12.9666 12.3492C13.256 12.1112 13.6666 11.6905 13.6666 10.9998C13.6669 10.6332 13.5462 10.2767 13.3234 9.98558C13.1005 9.69446 12.7879 9.48495 12.4339 9.3895C12.0799 9.29405 11.7043 9.318 11.3653 9.45762C11.0262 9.59725 10.7427 9.84477 10.5586 10.1618C10.4696 10.3147 10.445 10.4966 10.4901 10.6677C10.5352 10.8387 10.6465 10.9848 10.7993 11.0738C10.9522 11.1629 11.1341 11.1875 11.3052 11.1424C11.4762 11.0973 11.6223 10.986 11.7113 10.8332Z" fill="#F47920"/>
            </svg>
          </div>
          <span className="text-white text-[12px] leading-[15px] text-center font-normal uppercase">
            <span className="lang-en">FAQ</span>
            <span className="lang-ta">கேள்விகள்</span>
          </span>
        </div>

        {/* Heading */}
        <h2 className="justify-center text-center text-[24px] sm:text-[28px] md:text-[30px] leading-[32px] sm:leading-[38px] font-medium uppercase text-black w-full max-w-[800px] mx-auto">
          <span className="lang-en">Frequently Asked Questions</span>
          <span className="lang-ta">அடிக்கடி கேட்கப்படும் கேள்விகள்</span>
        </h2>
      </div>

      {/* Grid Layout for FAQ Cards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full max-w-[1400px] items-start"
      >
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              className="flex flex-col items-start p-5 gap-3 w-full bg-white rounded-[20px] shadow-[inset_0px_0px_20px_1px_rgba(244,121,32,0.3)] transition-all duration-300"
            >
              {/* Question Row */}
              <div 
                onClick={() => toggleFAQ(index)}
                className="flex flex-row justify-between items-center gap-4 w-full cursor-pointer select-none"
              >
                <h3 className="flex-1 font-normal text-[18px] md:text-[20px] leading-[25px] text-black">
                  <span className="lang-en">{faq.questionEn}</span>
                  <span className="lang-ta">{faq.questionTa}</span>
                </h3>
                
                {/* Toggle Icon with smooth rotation */}
                <motion.div 
                  animate={{ rotate: isOpen ? 0 : 180 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-[#F47920] rounded-full"
                >
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 6.5L6 2L1.5 6.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              </div>

              {/* Smooth Animated Answer Text */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden w-full"
                  >
                    <p className="font-normal text-[14px] md:text-[16px] leading-[20px] text-black/50 w-full pr-4 pt-1 pb-1">
                      <span className="lang-en">{faq.answerEn}</span>
                      <span className="lang-ta">{faq.answerTa}</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
}
