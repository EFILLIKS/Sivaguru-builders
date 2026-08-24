"use client";

import React, { ReactNode } from "react";

export interface RecessedCardProps {
  /** The source URL of the image */
  image?: string;
  /** An optional icon node to render inside the recessed area */
  icon?: ReactNode;
  /** The small uppercase title/kicker (e.g., "CARD 1") */
  title: string;
  /** 
   * The main paragraph. Accepts ReactNode so you can pass 
   * <strong> or <span> tags for specific text highlights.
   */
  paragraph: ReactNode;
  /** Optional container class overrides */
  className?: string;
  /** Optional extra content to place at the bottom (e.g., footer tags) */
  footer?: ReactNode;
}

export const RecessedCard = ({
  image,
  icon,
  title,
  paragraph,
  className = "",
  footer,
}: RecessedCardProps) => {
  return (
    // 1. OUTER BEZEL & DROP SHADOW
    // bg-[#F2F2F5] + border-[6px] border-white creates the raised outer rim
    <div
      className={`relative w-full bg-[#F2F2F5] rounded-[48px] p-[10px] border-[5px] border-white shadow-[0_24px_50px_-12px_rgba(0,0,0,0.12)] flex flex-col justify-between ${className}`}
    >
      <div>
        {/* 2. INNER RECESSED CONTAINER */}
        {(image || icon) && (
          <div className="relative w-full h-[180px] rounded-[36px] overflow-hidden bg-[#B5B1F2] flex items-center justify-center">
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              /* A sleek glowing recessed indicator lens for the icon */
              <div className="relative w-20 h-20 rounded-full bg-[#F9F9F9] border border-white/5 flex items-center justify-center text-white/90">
                <div className="absolute inset-0 rounded-full bg-radial-gradient from-primary/20 via-transparent to-transparent opacity-70 blur-md pointer-events-none" />
                {icon}
              </div>
            )}

            {/* 
              3. PROGRESSIVE INNER SHADOW & GRADIENT
              This is the secret sauce. The combination of heavy inset shadows 
              and a linear gradient makes the image or icon look deeply pushed into the device. 
            */}
            
            
            {/* Subtle inner stroke to define the physical edge of the cutout */}
            <div className="absolute inset-0 rounded-[36px] pointer-events-none" />
          </div>
        )}

        {/* 4. TYPOGRAPHY BLOCK */}
        <div className="px-[16px] pt-[24px] pb-[16px] flex flex-col gap-[12px]">
          {/* Title / Kicker */}
          <h4 className="text-[#9CA3AF] text-[20px] font-bold tracking-[0.05em] uppercase">
            {title}
          </h4>
          
          {/* Main Paragraph */}
          <p className="text-[#4B5563] text-[16px] leading-[1.3] font-medium tracking-tight pr-[8px]">
            {paragraph}
          </p>
        </div>
      </div>

      {/* 5. FOOTER SLOT */}
      {footer && (
        <div className="px-[16px] pb-[24px] pt-[8px]">
          {footer}
        </div>
      )}
      
    </div>
  );
};
