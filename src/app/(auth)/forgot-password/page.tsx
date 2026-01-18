import Image from "next/image";
import Link from "next/link";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center max-w-[465px] mx-auto">
      <h1 className="text-center font-bold text-[28px] 1xl:text-[34px] text-white mb-1">
        FORGOT PASSWORD?
      </h1>
      <p className="text-center font-medium text-sm 1xl:text-base text-white mb-5">
        Don’t worry! Enter your registered email address to get password reset
        instructions.
      </p>
      <form
        action=""
        className="w-full rounded-[25px] 1xl:rounded-[35px] border border-solid p-5 1xl:p-[30px] bg-white border-theme-white-100 shadow-sm"
      >
        <div className="w-full flex items-center justify-center mb-5">
          <Image
            className="size-20 1xl:size-[100px] shrink-0"
            src={"assets/images/svg/mailbox-icon.svg"}
            width={100}
            height={100}
            alt="icon"
          ></Image>
        </div>
        <div className="w-full mb-4">
          <label
            htmlFor=""
            className="text-base 1xl:text-lg font-semibold text-theme-black-50 inline-flex mb-[10px]"
          >
            Email Address
          </label>
          <div className="w-full flex items-center relative">
            <input
              type="text"
              placeholder="Sample@gmail.com"
              className="text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-xl 1xl:rounded-[15px] border border-theme-white-100 bg-theme-white-150 outline-none text-theme-darkblue-00"
            />
          </div>
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
        <div className="w-full mb-4 1xl:mb-5">
          <button
            type="submit"
            title="Confirm"
            className="w-full p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]"
          >
            <span className="relative top-0.5">Send</span>
          </button>
        </div>
        <div className="w-full flex items-center justify-center gap-1.5">
          <p className="font-medium text-theme-black-50 text-sm 1xl:text-base">
            Back to
          </p>
          <Link
            href={""}
            className="cursor-pointer font-semibold text-sm 1xl:text-base text-theme-blue-00 hover:underline hover:underline-offset-4"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
