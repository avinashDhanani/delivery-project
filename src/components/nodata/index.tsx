import React from "react";
import Button from "@/shared/button";

const NodataFound = ({ title, subTitle, btnText, btnIcon }) => {
  return (
    <section className="flex flex-col items-center justify-center size-full">
      <div className="w-full max-w-[380px] flex flex-col items-center justify-center text-center text-white">
        <h1 className="font-bold text-[28px] 1xl:text-[34px] mb-1.5">
          {title}
        </h1>
        <p className="text-center font-medium text-sm 1xl:text-base mb-[21px]">
          {subTitle}
        </p>
        <Button
          variant="white"
          btnClass="!rounded-md"
          title={btnText}
          iconName={btnIcon}
        />
      </div>
    </section>
  );
};

export default NodataFound;
