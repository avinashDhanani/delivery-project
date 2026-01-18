import Image from "next/image";
import Link from "next/link";
import React from "react";

const VerifyPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center max-w-[465px] mx-auto">
      <h1 className="text-center font-bold text-[28px] 1xl:text-[34px] text-white mb-1">
        Verify it's you
      </h1>
      <p className="text-center font-medium text-sm 1xl:text-base text-white mb-5">
        Enter the code we sent to the number below
      </p>
      <form
        action=""
        className="w-full rounded-[25px] 1xl:rounded-[35px] border border-solid p-5 1xl:p-[30px] bg-white border-theme-white-100 shadow-sm"
      >
        <div className="w-full grid grid-cols-6 gap-1 mb-4">
          <input
            type="text"
            placeholder="0"
            className="text-base text-center 1xl:text-lg font-medium placeholder:text-theme-black-150 aspect-square p-3 rounded-xl 1xl:rounded-[15px] border border-theme-white-100 bg-theme-white-150 outline-none text-theme-darkblue-00"
          />
          <input
            type="text"
            placeholder="0"
            className="text-base text-center 1xl:text-lg font-medium placeholder:text-theme-black-150 aspect-square p-3 rounded-xl 1xl:rounded-[15px] border border-theme-white-100 bg-theme-white-150 outline-none text-theme-darkblue-00"
          />
          <input
            type="text"
            placeholder="0"
            className="text-base text-center 1xl:text-lg font-medium placeholder:text-theme-black-150 aspect-square p-3 rounded-xl 1xl:rounded-[15px] border border-theme-white-100 bg-theme-white-150 outline-none text-theme-darkblue-00"
          />
          <input
            type="text"
            placeholder="0"
            className="text-base text-center 1xl:text-lg font-medium placeholder:text-theme-black-150 aspect-square p-3 rounded-xl 1xl:rounded-[15px] border border-theme-white-100 bg-theme-white-150 outline-none text-theme-darkblue-00"
          />
          <input
            type="text"
            placeholder="0"
            className="text-base text-center 1xl:text-lg font-medium placeholder:text-theme-black-150 aspect-square p-3 rounded-xl 1xl:rounded-[15px] border border-theme-white-100 bg-theme-white-150 outline-none text-theme-darkblue-00"
          />
          <input
            type="text"
            placeholder="0"
            className="text-base text-center 1xl:text-lg font-medium placeholder:text-theme-black-150 aspect-square p-3 rounded-xl 1xl:rounded-[15px] border border-theme-white-100 bg-theme-white-150 outline-none text-theme-darkblue-00"
          />
        </div>
        <div className="w-full flex items-center gap-1.5 mb-5 1xl:mb-[30px]">
          <p className="font-medium text-theme-black-50 text-sm 1xl:text-base">
            Didn’t get a code?
          </p>
          <Link
            href={""}
            className="cursor-pointer font-semibold text-sm 1xl:text-base text-theme-blue-00 hover:underline hover:underline-offset-4"
          >
            Resend Code
          </Link>
        </div>
        <div className="w-full">
          <button
            type="submit"
            title="Confirm"
            className="w-full p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]"
          >
            <Image
              className="w-5 1xl:w-[24px] img-filter-white h-auto shrink-0"
              src={"assets/images/svg/user-black-icon.svg"}
              width={24}
              height={24}
              alt="logo"
            ></Image>
            <span className="relative top-0.5">Confirm</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyPage;
