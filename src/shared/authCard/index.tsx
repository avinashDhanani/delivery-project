import React, { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  size?: "small" | "medium" | "large";
}

const AuthCard = ({
  title,
  subtitle,
  children,
  onSubmit,
  size = "small",
}: AuthCardProps) => {
  const containerSizes = {
    small: "max-w-[465px]",
    medium: "max-w-[531px]",
    large: "max-w-[653px]",
  };

  return (
    <div
      className={`w-full flex flex-col items-center justify-center mx-auto ${containerSizes[size]}`}
    >
      <h1 className="text-center uppercase font-bold text-[28px] 1xl:text-[34px] text-white mb-1">{title}</h1>
      {subtitle && <p className="text-center font-medium text-sm 1xl:text-base text-white mb-5">{subtitle}</p>}
      <form
        onSubmit={onSubmit}
        className={`w-full bg-white p-[30px] rounded-[35px] border border-solid border-theme-white-100 shadow-sm`}
      >
        {children}
      </form>
    </div>
  );
};

export default AuthCard;
