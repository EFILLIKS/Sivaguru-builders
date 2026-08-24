import * as React from "react";

export type ButtonTheme = "light" | "dark";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ButtonTheme;
  children?: React.ReactNode;
}

export function Button({
  theme = "light",
  children = "Start Your Project",
  className = "",
  ...props
}: ButtonProps) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`
        relative inline-flex h-[51px] items-center justify-center
        rounded-[14px]
        px-[20px] py-[16px]
        font-['Geologica',sans-serif]
        text-[14px] font-semibold
        uppercase
        tracking-[0.7px]
        leading-[17px]
        cursor-pointer
        box-border
        transition-all
        duration-500
        ease-out
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#F47920]
        focus-visible:ring-offset-2

        ${
          isDark
            ? "bg-white text-[#F47920] hover:bg-white"
            : "bg-[#F47920] text-white hover:bg-[#F47920]"
        }

        /* 4px Outer Ring expanding outward on hover for high visibility */
        before:pointer-events-none
        before:absolute
        before:inset-0
        before:rounded-[14px]
        before:border-[4px]
        before:border-solid
        before:border-transparent
        before:transition-all
        before:duration-500
        before:ease-out

        ${
          isDark
            ? "hover:before:border-white/70 hover:before:inset-[-5px] hover:before:rounded-[18px]"
            : "hover:before:border-[#F47920]/70 hover:before:inset-[-5px] hover:before:rounded-[18px]"
        }

        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center text-center">
        {children}
      </span>
    </button>
  );
}

export default Button;