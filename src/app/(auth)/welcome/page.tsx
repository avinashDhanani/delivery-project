"use client";

import Image from "next/image";
import React, { useState } from "react";
import SiteModal from "@/shared/Modal";
import Button from "@/shared/button";

const WelcomePage = () => {
  const [modal1IsOpen, set1IsOpen] = useState(true);
  const [modal2IsOpen, set2IsOpen] = useState(false);
  const [modal3IsOpen, set3IsOpen] = useState(false);

  const open1Modal = () => set1IsOpen(true);
  const open2Modal = () => set2IsOpen(true);
  const open3Modal = () => set3IsOpen(true);

  const close1Modal = () => set1IsOpen(false);
  const close2Modal = () => set2IsOpen(false);
  const close3Modal = () => set3IsOpen(false);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center max-w-[695px] mx-auto">
        <div className="w-full grid grid-cols-3 gap-4">
          <button
            onClick={open1Modal}
            className="p-2 h-12 1xl:h-14 flex items-center justify-center text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]"
          >
            Modal 1
          </button>

          <button
            onClick={open2Modal}
            className="p-2 h-12 1xl:h-14 flex items-center justify-center text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]"
          >
            Modal 2
          </button>

          <button
            onClick={open3Modal}
            className="p-2 h-12 1xl:h-14 flex items-center justify-center text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]"
          >
            Modal 3
          </button>
        </div>
      </div>

      {/* Modal 1 */}
      <SiteModal
        isOpen={modal1IsOpen}
        onClose={close1Modal}
        widthClass="max-w-[500px]"
      >
        <Image
          className="w-[66px] h-auto mb-[30px] mx-auto"
          src="/assets/images/svg/logo-svg.svg"
          width={66}
          height={57}
          alt="Logo"
        />

        <Image
          className="w-[300px] h-auto mb-[30px] mx-auto"
          src="/assets/images/png/image-3.png"
          width={300}
          height={233}
          alt="Welcome"
        />

        <h1 className="text-center font-bold text-[28px] 1xl:text-[34px] text-theme-black-00 mb-1">
          WELCOME TO Ark Air!
        </h1>

        <p className="text-center font-medium text-sm 1xl:text-base text-theme-black-50">
          Please wait until the admin approves your profile.
        </p>
      </SiteModal>
      {/* modal 2 */}
      <SiteModal
        isOpen={modal2IsOpen}
        onClose={close2Modal}
        widthClass="max-w-[500px]"
      >
        <Image
          className="w-[311px] h-auto mb-[30px] mx-auto"
          src={"/assets/images/png/image-4.png"}
          width={311}
          height={221}
          alt="img"
        ></Image>
        <h1 className="text-center font-bold text-[28px] 1xl:text-[34px] text-theme-black-00 mb-1">
          Your account has been Created!
        </h1>{" "}
        <p className="text-center font-medium text-sm 1xl:text-base text-theme-black-50 mb-[30px]">
          Are you ready to manage your own wealth?
        </p>
        <Button btnClass="w-full" title="Continue Dashboard" />
      </SiteModal>
      {/* modal 3 */}
      <SiteModal
        isOpen={modal3IsOpen}
        onClose={close3Modal}
        widthClass="max-w-[500px]"
      >
        <Image
          className="w-[311px] h-auto mb-[30px] mx-auto"
          src={"/assets/images/png/image-5.png"}
          width={311}
          height={221}
          alt="img"
        ></Image>
        <h1 className="text-center font-bold text-[28px] 1xl:text-[34px] text-theme-black-00 mb-1">
          Opps!
        </h1>
        <p className="text-center font-medium text-sm 1xl:text-base text-theme-black-50 mb-[30px]">
          Your documents have been rejected. Please upload them again correctly
          and complete your KYC.
        </p>
        <Button btnClass="w-full" title="Sorry, Continue Re KYC" />
      </SiteModal>
    </>
  );
};

export default WelcomePage;
