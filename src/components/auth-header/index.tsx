import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../../shared/button";

const AuthHeader = () => {
  return (
    <header id="auth-header" className="w-full bg-theme-purple-00 shadow-sm">
      <nav className="mx-auto w-full max-w-[1440px] py-[15px] px-[100px] flex items-center justify-between gap-4">
        <Link
          href=""
          title="ArkAir"
          className="inline-flex items-center justify-between w-[125px] shrink-0 cursor-pointer"
        >
          <Image
            className="w-full h-auto"
            src={"assets/images/svg/auth-white-logo.svg"}
            width={125}
            height={37}
            alt="ArkAir"
          ></Image>
        </Link>
        <div className="inline-flex items-center gap-4">
          <Link
            href="/signup"
            className="cursor-pointer font-semibold text-base hover:underline hover:underline-offset-4"
          >
            Don’t have an account?
          </Link>
          <Link href="/">
            <Button
              title="Weekly"
              variant="white"
              iconSrc={"assets/images/svg/user-black-icon.svg"}
            />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default AuthHeader;
