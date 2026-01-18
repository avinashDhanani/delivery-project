"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const WelcomePage = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Required for accessibility & to avoid SSR warning
    Modal.setAppElement("body");
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center max-w-[695px] mx-auto">
        <div className="w-full grid grid-cols-3 gap-4">
          <button
            onClick={openModal}
            className="p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]"
          >
            <span className="relative top-0.5">Modal 1</span>
          </button>

          <button className="p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]">
            <span className="relative top-0.5">Modal 2</span>
          </button>

          <button className="p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]">
            <span className="relative top-0.5">Modal 3</span>
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Model 1"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
        className="relative w-full max-w-[488px] rounded-[25px] 1xl:rounded-[35px] border border-solid p-[30px] bg-white border-theme-white-100 shadow-sm"
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
    </>
  );
};

export default WelcomePage;
