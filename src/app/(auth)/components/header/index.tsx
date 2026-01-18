import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthHeader = () => {
  return (
    <header className="w-full bg-theme-purple-00 py-3 1xl:py-[15px] shadow-sm">
      <div className="w-full max-w-[1280px] px-5 mx-auto">
        <nav className="w-full flex items-center justify-between gap-4">
          <Link
            href=""
            title="ArkAir"
            className="inline-flex items-center justify-between w-[100px] 1xl:w-[125px] shrink-0 cursor-pointer"
          >
            <Image
              className="w-full h-auto"
              src={"assets/images/svg/auth-white-logo.svg"}
              width={125}
              height={37}
              alt="logo"
            ></Image>
          </Link>
          <div className="inline-flex items-center gap-4">
            <p className="text-sm 1xl:text-base text-theme-black-50">
              Don’t have an account?
            </p>
            <Link
              href={""}
              title="Weekly"
              className="min-w-[100px] p-2 1xl:min-w-[120px] h-10 1xl:h-[45px] cursor-pointer flex items-center justify-center gap-1 text-theme-black-00 text-sm 1xl:text-base bg-white hover:bg-theme-white-50 rounded-[80px]"
            >
              <Image
                className="w-[14px] 1xl:w-[18px] h-auto shrink-0"
                src={"assets/images/svg/user-black-icon.svg"}
                width={18}
                height={18}
                alt="logo"
              ></Image>
              <span>Weekly</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AuthHeader;
