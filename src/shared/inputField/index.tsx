"use client";
import React, { useState } from "react";
import Image from "next/image";
import Icon from "../icon";

interface InputProps {
  id: string;
  label?: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  register?: any;
  error?: string;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
  showPasswordToggle?: boolean;
}

const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
  disabled = false,
  size = "medium",
  className = "",
  showPasswordToggle = false,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password" && showPasswordToggle;

  const IconName = showPassword ? "eye-open-icon" : "eye-close-icon";

  const baseClass =
    "w-full font-medium outline-none border bg-theme-white-150 text-theme-darkblue-00 transition disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-theme-black-150";

  const sizeClasses = {
    small: "min-h-[45px] px-4 py-2 text-base rounded-xl",
    medium:
      "min-h-[56px] 1xl:min-h-[66px] px-4 1xl:px-5 py-3 1xl:py-4 text-base 1xl:text-lg rounded-xl 1xl:rounded-[15px]",
    large: "min-h-[66px] px-5 py-4 text-lg rounded-[18px]",
  };

  const borderClass = error
    ? "border-red-500"
    : "border-theme-white-100 focus:border-theme-purple-50";

  return (
    <div className="w-full mb-4">
      {label && (
        <label
          htmlFor={id}
          className="text-base 1xl:text-lg font-semibold text-theme-black-50 inline-flex mb-[10px]"
        >
          {label}
        </label>
      )}

      <div className="w-full flex flex-col">
        <div className="w-full flex items-center relative">
          <input
            id={id}
            type={isPassword && showPassword ? "text" : type}
            placeholder={placeholder}
            disabled={disabled}
            {...(register ? register(id) : {})}
            className={`${baseClass} ${sizeClasses[size]} ${borderClass} ${
              isPassword ? "pr-14" : ""
            } ${className}`}
          />

          {isPassword && (
            <button
              type="button"
              disabled={disabled}
              onClick={() => setShowPassword((prev) => !prev)}
              className={`absolute right-5 flex items-center justify-center hover:opacity-75 disabled:cursor-not-allowed`}
            >
              <Icon className="size-full" name={IconName} />
            </button>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default InputField;
