"use client";

import Link from "next/link";
import clsx from "clsx";

interface ButtonProps {
  label?: string;
  href?: string;
  hasHref?: boolean;
  variant?: "outline" | "filled" | "inverseFilled" | "inverseOutline" | "simple" | "greyOutline" | "arrow";
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  onClick?: () => void;
  className?: string;
  isFormButton?: boolean;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
}

const Button = ({
  label,
  href = "#",
  variant = "outline",
  leftIcon: LeftIcon = <></>,
  rightIcon: RightIcon = <></>,
  hasHref = true,
  onClick,
  className,
  isFormButton = false,
  type = "submit",
  disabled = false,
}: ButtonProps) => {
  const baseStyles = clsx(
    `group inline-flex items-center lg:gap-2 gap-1 lg:pl-6 lg:pr-5 pl-4 pr-2.5 rounded-lg font-normal transition-all duration-300 justify-center`,
    isFormButton ? "w-full py-2 lg:py-2.5 text-sm" : "w-fit py-1.5 lg:py-2 text-sm",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className
  );

  const variants = {
    outline: "border border-black text-black hover:bg-black hover:text-white",
    filled: "bg-black text-white hover:bg-white hover:text-black border border-black",
    inverseOutline:
      "border border-white text-white hover:bg-white hover:text-black",
    inverseFilled: "bg-white border border-white text-black hover:bg-white/90",
    simple: "text-[#212121] font-normal underline",
    greyOutline: "border border-[#C3C4C5] text-black hover:bg-[#C3C4C5] hover:text-white",
    arrow: "border border-[#C3C4C5] text-black hover:bg-[#C3C4C5] hover:text-white"
  };

  if (hasHref) {
    return (
      <Link
        href={disabled ? "#" : href}
        onClick={disabled ? undefined : onClick}
        className={clsx(baseStyles, variants[variant])}
        aria-disabled={disabled}
      >
        {LeftIcon && LeftIcon}
        <span>{label}</span>
        {RightIcon && RightIcon}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled} // 👈 IMPORTANT
      className={clsx(baseStyles, variants[variant])}
    >
      {LeftIcon && LeftIcon}
      <span>{label}</span>
      {RightIcon && RightIcon}
    </button>
  );
};

export default Button;
