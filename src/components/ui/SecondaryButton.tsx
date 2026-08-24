import * as React from "react";

export interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function SecondaryButton({
  children = "Go To Project",
  className = "",
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      type="button"
      className={`
        flex justify-center items-center px-5 py-4 w-fit h-[51px]
        border border-[#F47920] bg-transparent hover:bg-[#F47920]/10 text-[#F47920]
        rounded-[14px] uppercase text-[14px] font-normal leading-[17px] tracking-[0.7px]
        transition-colors duration-300 ease-in-out cursor-pointer
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
