"use client";
import React from "react";
import Image from "next/image";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  variant?: "purple" | "white";
  btnClass?: string;
  iconSrc?: string;
  iconAlt?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

const Button = ({
  title,
  onClick,
  variant = "purple",
  btnClass = "",
  iconSrc,
  iconAlt = "icon",
  size = "small",
  disabled = false,
}: ButtonProps) => {
  const baseClass =
    "px-4 min-w-[120px] flex items-center justify-center gap-1 text-base font-medium transition disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClasses = {
    small: "min-h-[45px] py-2",
    medium: "min-h-[50px] py-2.5",
    large: "min-h-[56px] py-3",
  };

  const variants = {
    purple:
      "bg-theme-purple-50 text-white hover:bg-theme-purple-00 rounded-[10px] disabled:hover:bg-theme-purple-50",
    white:
      "bg-white text-theme-black-00 hover:bg-theme-white-50 rounded-[80px] disabled:hover:bg-white",
  };

  return (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${sizeClasses[size]} ${variants[variant]} ${btnClass}`}
    >
      {iconSrc && (
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={18}
          height={18}
          className={`size-5 shrink-0 ${
            variant === "purple" ? "img-filter-white" : ""
          }`}
        />
      )}
      <span>{title}</span>
    </button>
  );
};

export default Button;