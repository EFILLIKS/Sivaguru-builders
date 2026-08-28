"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getServices } from "@/lib/repositories/services";
import { ServiceItem } from "@/types/admin";

export default function ServicesSection() {
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const fetchServicesList = () => {
      getServices().then((data) => setServicesList(data.filter((s) => s.published)));
    };

    fetchServicesList();

    if (typeof window !== "undefined") {
      window.addEventListener("services_updated", fetchServicesList);
      return () => window.removeEventListener("services_updated", fetchServicesList);
    }
  }, []);

  useEffect(() => {
    const updateScrollDistance = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        const distance = Math.max(0, contentWidth - containerWidth);
        setScrollDistance(distance);
      }
    };

    updateScrollDistance();
    window.addEventListener("resize", updateScrollDistance);
    return () => window.removeEventListener("resize", updateScrollDistance);
  }, [servicesList]);

  // Track scroll progress of the entire tall section for all screen sizes
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Dynamically translate exact distance so final card + parent padding stop at right edge
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  return (
    <section id="services" ref={targetRef} className="relative h-[250vh] sm:h-[300vh] bg-white">
      <div className="sticky top-0 min-h-screen max-h-screen flex flex-col justify-center items-center overflow-hidden py-6 md:py-10 px-4 md:px-10 lg:px-20 max-w-[1536px] mx-auto w-full gap-4 md:gap-8">
        
        {/* Header (Unified Mobile & Desktop) */}
        <div className="flex flex-col items-center justify-center gap-2 md:gap-3 shrink-0">
          {/* Pill Badge */}
          <div className="inline-flex items-center bg-[#F47920] text-white pr-3 pl-2 py-1.5 rounded-[16px] gap-2 shadow-sm">
            <div className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] bg-white rounded-[10px] flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.06933 3.06937C6.22667 1.91204 6.80533 1.33337 7.524 1.33337C8.24333 1.33337 8.822 1.91204 9.97867 3.06937L12.9253 6.01537C14.082 7.17204 14.6607 7.75071 14.6607 8.47004C14.6607 9.18937 14.082 9.76737 12.9247 10.9247C11.7673 12.082 11.1887 12.6607 10.47 12.6607C9.75066 12.6607 9.172 12.082 8.01533 10.9247L5.06867 7.97871C3.91267 6.82204 3.33333 6.24337 3.33333 5.52404C3.33333 4.80471 3.912 4.22671 5.06933 3.06937ZM4.856 9.18004L1.884 12.152C1.65533 12.3807 1.54133 12.4947 1.47267 12.6134C1.38114 12.7716 1.33295 12.9512 1.33295 13.134C1.33295 13.3169 1.38114 13.4964 1.47267 13.6547C1.54133 13.7734 1.65533 13.888 1.884 14.116C2.11267 14.344 2.226 14.4587 2.34533 14.5274C2.50359 14.6189 2.68318 14.6671 2.866 14.6671C3.04882 14.6671 3.22841 14.6189 3.38667 14.5274C3.50533 14.4587 3.62 14.344 3.848 14.116L6.82 11.144L4.856 9.18004Z" fill="#F47920"/>
                <path d="M5.56335 8.4734L5.56602 8.47007L7.53002 10.4341L7.52669 10.4367L5.56335 8.4734ZM13.1127 4.78873C13.1967 4.63248 13.2393 4.45735 13.2365 4.27999C13.2337 4.10262 13.1856 3.92892 13.0967 3.7754C13.028 3.65673 12.9134 3.54273 12.6854 3.31473C12.4574 3.08607 12.3427 2.97207 12.224 2.9034C12.0706 2.81466 11.897 2.7666 11.7198 2.7638C11.5425 2.761 11.3675 2.80355 11.2114 2.8874L13.1127 4.78873Z" fill="#F47920"/>
              </svg>
            </div>
            <span className="font-['Geologica',sans-serif] text-[14px] md:text-[15px] font-semibold tracking-wide pr-1">
              <span className="lang-en">Our Services</span>
              <span className="lang-ta">எங்கள் சேவைகள்</span>
            </span>
          </div>
          <h2 className="justify-center text-center text-[24px] sm:text-[28px] md:text-[30px] leading-[32px] sm:leading-[38px] font-medium uppercase text-black w-full max-w-[800px] mx-auto">
            <span className="lang-en">What We Build</span>
            <span className="lang-ta">எங்கள் சேவைக் கூறுகள்</span>
          </h2>
        </div>

        {/* Scrolling Content Area */}
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-4 md:gap-8 w-full">
          
          {/* Orange Block (1st on Mobile, Left on Desktop) */}
          <div className="w-full md:w-[340px] lg:w-[386px] shrink-0 bg-[#F47920] text-white rounded-[24px] p-5 sm:p-8 lg:p-10 flex flex-col justify-between shadow-xl z-20 relative self-stretch">
            <div className="flex flex-col gap-2 sm:gap-5 mb-4 md:mb-0">
              <h2 className="text-[22px] sm:text-[32px] md:text-[36px] lg:text-[42px] font-bold leading-[1.15]">
                <span className="lang-en">Everything your space needs.</span>
                <span className="lang-ta">உங்கள் இடத்திற்கு தேவையான அனைத்தும்.</span>
              </h2>
              <p className="text-[12px] sm:text-[14px] lg:text-[15px] leading-relaxed font-medium text-white/90">
                <span className="lang-en">
                  Whether You're Building From The Ground Up Or Giving An Existing Space A New Beginning, Our Team Takes Care Of The Complete Process.
                </span>
                <span className="lang-ta">
                  நீங்கள் புதிதாகக் கட்டினாலும் சரி அல்லது இருக்கும் இடத்திற்குப் புதிய தொடக்கத்தைக் கொடுத்தாலும் சரி, எங்கள் குழு முழு செயல்முறையையும் கவனித்துக்கொள்கிறது.
                </span>
              </p>
            </div>
            <Link href="/contact" className="w-full">
              <Button theme="dark" className="w-full text-[12px] sm:text-[14px]">
                <span className="lang-en">Start Your Project</span>
                <span className="lang-ta">உங்கள் திட்டத்தை தொடங்குங்கள்</span>
              </Button>
            </Link>
          </div>

          {/* Horizontally Animated Cards Container (Under Orange Block on Mobile, Right on Desktop) */}
          <div ref={containerRef} className="w-full pb-2 md:flex-1 overflow-hidden relative z-10 flex items-stretch">
            <motion.div ref={contentRef} style={{ x }} className="flex gap-4 md:gap-6 lg:gap-8 pr-12 items-stretch">
              {servicesList.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: ServiceItem }) {
  const slug = (service.slug || service.title || "").toLowerCase();
  const defaultFallback = slug.includes("commercial")
    ? "/services/commercial.jpg"
    : slug.includes("interior")
    ? "/services/interior.jpg"
    : slug.includes("reconstruct")
    ? "/services/reconstruct.jpg"
    : "/services/residential.jpg";

  const [imgSrc, setImgSrc] = useState(service.image || defaultFallback);

  useEffect(() => {
    setImgSrc(service.image || defaultFallback);
  }, [service.image, defaultFallback]);

  const getTargetCategory = (service: ServiceItem): string => {
    const title = (service.title || "").toLowerCase();
    const slug = (service.slug || "").toLowerCase();
    if (title.includes("interior") || slug.includes("interior")) return "Interior Design";
    if (title.includes("residential") || slug.includes("residential")) return "Residential";
    if (title.includes("commercial") || slug.includes("commercial")) return "Commercial";
    if (title.includes("architect") || slug.includes("architect")) return "Architecture";
    if (title.includes("reconstruct") || slug.includes("reconstruct")) return "Reconstruct";
    return service.title;
  };

  return (
    <div className="box-border flex flex-col items-start p-[10px] gap-[15px] sm:gap-[20px] w-[280px] sm:w-[330px] md:w-[386px] bg-white rounded-[20px] border border-gray-100 shadow-lg shrink-0 justify-between self-stretch">
      
      {/* Top Content Group: Image + Text Details */}
      <div className="w-full flex flex-col items-start gap-[10px] self-stretch flex-1">
        
        {/* Image Container */}
        <div className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] bg-[#D9D9D9] rounded-[12.5px] overflow-hidden shrink-0">
          <Image
            src={imgSrc}
            alt={service.title}
            fill
            onError={() => setImgSrc(defaultFallback)}
            className="object-cover rounded-[12.5px]"
          />
        </div>

        {/* Text Details Container */}
        <div className="flex flex-col items-start gap-[10px] w-full self-stretch pt-1">
          {/* Title */}
          <h3 className="font-['Geologica',sans-serif] font-bold text-[20px] sm:text-[24px] md:text-[28px] leading-[26px] sm:leading-[30px] md:leading-[35px] text-black w-full flex items-center">
            <span className="lang-en">{service.title}</span>
            <span className="lang-ta">{service.titleTa || service.title}</span>
          </h3>

          {/* Description */}
          <p className="font-['Geologica',sans-serif] font-normal text-[12px] sm:text-[13px] md:text-[14px] leading-[18px] md:leading-[20px] tracking-[0.3px] text-black/70 w-full line-clamp-3">
            <span className="lang-en">{service.description || "Transforming spaces with custom cabinetry, ergonomic layouts, modular kitchens, and ambient lighting tailored to your lifestyle."}</span>
            <span className="lang-ta">{service.descriptionTa || service.description || "உங்கள் வாழ்க்கை முறைக்கேற்ப தனிப்பயனாக்கப்பட்ட அலமாரிகள், மாடுலர் சமையலறைகள் மற்றும் சூடான விளக்குகளுடன் உங்கள் இடங்களை மாற்றியமைக்கிறோம்."}</span>
          </p>
        </div>
      </div>

      {/* Button: padding 16px 20px, height 51px, rounded 12.5px */}
      <div className="w-full pt-2 mt-auto">
        <Link href={`/projects?category=${encodeURIComponent(getTargetCategory(service))}`} className="block w-full">
          <Button theme="light" className="w-full h-[51px] rounded-[12.5px] py-[16px] px-[20px] text-[14px] font-semibold tracking-[0.7px] justify-center">
            <span className="lang-en">Explore</span>
            <span className="lang-ta">ஆராயுங்கள்</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
