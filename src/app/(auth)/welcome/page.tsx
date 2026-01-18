"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const WelcomePage = () => {
  const [modal1IsOpen, set1IsOpen] = useState(false);
  const [modal2IsOpen, set2IsOpen] = useState(false);
  const [modal3IsOpen, set3IsOpen] = useState(false);

  useEffect(() => {
    // Required for accessibility & to avoid SSR warning
    Modal.setAppElement("body");
  }, []);

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
            className="p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]"
          >
            <span className="relative top-0.5">Modal 1</span>
          </button>

          <button
            onClick={open2Modal}
            className="p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]"
          >
            <span className="relative top-0.5">Modal 2</span>
          </button>

          <button
            onClick={open3Modal}
            className="p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]"
          >
            <span className="relative top-0.5">Modal 3</span>
          </button>
        </div>
      </div>
      <Modal
        isOpen={modal1IsOpen}
        onRequestClose={close1Modal}
        contentLabel="Model 1"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
        className="relative w-full max-w-[500px] rounded-[25px] 1xl:rounded-[35px] border border-solid p-[30px] bg-white border-theme-white-100 shadow-sm"
      >
        <Image
          className="w-[66px] h-auto mb-[30px] mx-auto"
          src={"/assets/images/svg/logo-svg.svg"}
          width={66}
          height={57}
          alt="img"
        ></Image>
        <Image
          className="w-[300px] h-auto mb-[30px] mx-auto"
          src={"/assets/images/png/image-3.png"}
          width={300}
          height={233}
          alt="img"
        ></Image>
        <h1 className="text-center font-bold text-[28px] 1xl:text-[34px] text-theme-black-00 mb-1">
          WELCOME TO Ark Air!
        </h1>{" "}
        <p className="text-center font-medium text-sm 1xl:text-base text-theme-black-50">
          Please Wait until the admin approves your Profile.
        </p>
      </Modal>
      <Modal
        isOpen={modal2IsOpen}
        onRequestClose={close2Modal}
        contentLabel="Model 2"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
        className="relative w-full max-w-[500px] rounded-[25px] 1xl:rounded-[35px] border border-solid p-[30px] bg-white border-theme-white-100 shadow-sm"
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
        <button
          title="Continue Dashboard"
          className="w-full p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]"
        >
          <span>Continue Dashboard</span>
        </button>
      </Modal>
      <Modal
        isOpen={modal3IsOpen}
        onRequestClose={close3Modal}
        contentLabel="Model 3"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
        className="relative w-full max-w-[500px] rounded-[25px] 1xl:rounded-[35px] border border-solid p-[30px] bg-white border-theme-white-100 shadow-sm"
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
        </h1>{" "}
        <p className="text-center font-medium text-sm 1xl:text-base text-theme-black-50 mb-[30px]">
          Your documents have been rejected. Please upload them again correctly
          and complete your KYC.
        </p>
        <button
          title="Continue Dashboard"
          className="w-full p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]"
        >
          <span>Sorry, Continue Re KYC</span>
        </button>
      </Modal>
    </>
  );
};

export default WelcomePage;
