"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "@/lib/context/LanguageContext";

type NavbarProps = {
  activeItem?: "projects" | "contact" | "services" | null;
};

const desktopNavItems = [
  {
    labelEn: "Projects",
    labelTa: "திட்டங்கள்",
    href: "/projects",
    key: "projects" as const,
  },
  {
    labelEn: "Contact",
    labelTa: "தொடர்புகொள்ள",
    href: "/contact",
    key: "contact" as const,
  },
];

const mobileNavItems = [
  {
    labelEn: "Projects",
    labelTa: "திட்டங்கள்",
    href: "/projects",
  },
  {
    labelEn: "Contact",
    labelTa: "தொடர்புகொள்ள",
    href: "/contact",
  },
];

export default function Navbar({
  activeItem = null,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { lang, setLang } = useLanguage();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Don't hide if mobile menu is open or if near top of page (e.g. top < 50px)
    if (latest > previous && latest > 50 && !isMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-150%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex flex-col items-center pointer-events-none px-4"
    >
      {/* Navbar Container - w-fit to fit content */}
      <div
        data-node-id="2:101"
        className="
          pointer-events-auto
          flex w-fit max-w-full items-center justify-between gap-6 sm:gap-8
          rounded-[14px]
          bg-white
          p-[10px]
          shadow-lg
          border border-gray-100/50
        "
      >
        {/* Brand */}
        <Link
          href="/"
          aria-label="Sivaguru Builders Home"
          className="
            flex shrink-0 items-center gap-[10px] sm:gap-[14px]
            no-underline
          "
        >
          <span
            className="
              whitespace-nowrap
              font-['Geologica',sans-serif]
              text-[15px] sm:text-[16px]
              font-normal
              leading-normal
              text-[#F47920]
            "
          >
            Sivaguru Builders
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary navigation"
          className="
            hidden
            items-center
            gap-[7.278px]
            rounded-[10.189px]
            bg-[#F47920]
            lg:flex
          "
        >
          <LanguageToggle lang={lang} setLang={setLang} idPrefix="desktop" />

          {desktopNavItems.map((item) => {
            const isActive = activeItem === item.key;

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`
                  flex
                  items-center
                  justify-center
                  rounded-[6.793px]
                  p-[7.278px]
                  whitespace-nowrap
                  font-['Geologica',sans-serif]
                  text-[11.645px]
                  font-medium
                  leading-normal
                  text-white
                  no-underline
                  transition-opacity
                  duration-200
                  hover:opacity-100
                  ${isActive || activeItem === null
                    ? "opacity-100"
                    : "opacity-50"
                  }
                `}
              >
                <span className="lang-en">{item.labelEn}</span>
                <span className="lang-ta">{item.labelTa}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Controls */}
        <div
          className="
            flex
            items-center
            gap-[10px]
            lg:hidden
          "
        >
          <LanguageToggle lang={lang} setLang={setLang} idPrefix="mobile" />

          <button
            type="button"
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="
              flex
              size-[36px] sm:size-[43.668px]
              shrink-0
              items-center
              justify-center
              rounded-full
              border-0
              bg-[#F47920]
              p-0
              text-white
              outline-none
              transition-transform
              duration-200
              active:scale-95
            "
          >
            <span
              className="
                font-sans
                text-[24px] sm:text-[30px]
                font-bold
                leading-none
              "
            >
              {isMenuOpen ? "×" : "+"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Expanded Menu */}
      {isMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          data-node-id="2:322"
          className="
            pointer-events-auto
            mt-[10px]
            flex
            w-fit
            min-w-[200px]
            flex-col
            items-center
            justify-center
            gap-[2px]
            overflow-hidden
            rounded-[10.189px]
            shadow-lg
          "
        >
          {mobileNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="
                flex
                w-full
                items-center
                justify-center
                rounded-[6.793px]
                bg-white
                px-[16px]
                py-[10px]
                font-['Geologica',sans-serif]
                text-[13px]
                font-medium
                leading-normal
                text-[#F47920]
                no-underline
                transition-colors
                duration-200
                hover:bg-[#FFF7F1]
              "
            >
              <span className="lang-en">{item.labelEn}</span>
              <span className="lang-ta">{item.labelTa}</span>
            </Link>
          ))}
        </nav>
      )}
    </motion.header>
  );
}

/* ─────────────────────────
   Language Toggle
───────────────────────── */

type LanguageToggleProps = {
  lang: "en" | "ta";
  setLang: (lang: "en" | "ta") => void;
  idPrefix: string;
};

function LanguageToggle({ lang, setLang, idPrefix }: LanguageToggleProps) {
  return (
    <div
      data-node-id="103:236"
      className="
        relative
        flex
        items-center
        justify-center
        rounded-[6.793px]
        bg-[#F47920]
        p-[3px]
        gap-[2px]
      "
    >
      {/* English */}
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`
          relative
          z-10
          flex
          items-center
          justify-center
          rounded-[4px]
          px-[8px]
          py-[4px]
          font-['Geologica',sans-serif]
          text-[11.645px]
          font-bold
          leading-normal
          transition-colors
          duration-200
          ${lang === "en" ? "text-[#F47920]" : "text-white hover:text-white/80"}
        `}
      >
        {lang === "en" && (
          <motion.div
            layoutId={`${idPrefix}-active-lang-pill`}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className="absolute inset-0 bg-white rounded-[4px] -z-10 shadow-sm"
          />
        )}
        En
      </button>

      {/* Tamil */}
      <button
        type="button"
        onClick={() => setLang("ta")}
        className={`
          relative
          z-10
          flex
          items-center
          justify-center
          rounded-[4px]
          px-[8px]
          py-[4px]
          font-['Geologica',sans-serif]
          text-[11.645px]
          font-medium
          leading-normal
          transition-colors
          duration-200
          ${lang === "ta" ? "text-[#F47920]" : "text-white hover:text-white/80"}
        `}
      >
        {lang === "ta" && (
          <motion.div
            layoutId={`${idPrefix}-active-lang-pill`}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className="absolute inset-0 bg-white rounded-[4px] -z-10 shadow-sm"
          />
        )}
        தமிழ்
      </button>
    </div>
  );
}
