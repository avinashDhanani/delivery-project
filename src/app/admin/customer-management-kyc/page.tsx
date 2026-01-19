"use client";

import React, { useState } from "react";
import AdminNoRecord from "../components/no-record";
import Modal from "react-modal";
import Image from "next/image";

const CustomerManagementKYCPage = () => {
  const [noData] = useState(true);
  const [kycHandlingModal, setKycHandlingModal] = useState(false);
  const [newCustomerModal, setNewCustomerModal] = useState(false);

  const openKycHandlingModal = () => setKycHandlingModal(true);
  const openNewCustomerModal = () => setNewCustomerModal(true);
  const closeKycHandlingModal = () => setKycHandlingModal(false);
  const closeNewCustomerModal = () => setNewCustomerModal(false);

  return (
    <>
      {!noData ? (
        <section className="flex-grow flex flex-col items-center justify-center p-5">
          <AdminNoRecord />
        </section>
      ) : (
        <section className="flex-grow flex flex-col items-center justify-center p-5">
          <div className="w-full flex flex-col items-center justify-center max-w-[695px] mx-auto">
            <div className="w-full grid grid-cols-2 gap-4">
              <button
                onClick={openKycHandlingModal}
                className="p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]"
              >
                <span className="relative top-0.5">KYC Handling</span>
              </button>
              <button
                onClick={openNewCustomerModal}
                className="p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]"
              >
                <span className="relative top-0.5">New Customer</span>
              </button>
            </div>
          </div>
        </section>
      )}
      <Modal
        isOpen={kycHandlingModal}
        onRequestClose={closeKycHandlingModal}
        contentLabel="Model 1"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
        className="relative flex gap-6 flex-col w-full max-h-[90vh] overflow-hidden max-w-[551px] rounded-[25px] 1xl:rounded-[35px] border border-solid py-[30px] bg-white border-theme-white-100 shadow-sm"
      >
        <div className="w-full flex items-center gap-4 justify-between px-[30px]">
          <h4 className="text-[22px] text-theme-black-50 font-bold">
            KYC Handling
          </h4>
          <button
            title="Close"
            className="size-[30px] flex items-center justify-center rounded-full bg-theme-red-50 text-theme-red-00 hover:bg-theme-red-00/15"
          >
            <Image
              className="size-3.5 img-filter-red"
              src={"/assets/images/svg/cross-icon.svg"}
              width={8}
              height={8}
              alt="icon"
            ></Image>
          </button>
        </div>
        <div className="flex-grow overflow-auto px-[30px]">
          <div className="w-full mb-4">
            <h4 className="font-bold text-base 1xl:text-lg text-theme-darkblue-00 mb-[10px]">
              Aadhar Card
            </h4>
            <div className="w-full grid grid-cols-2 gap-2.5">
              <div className="w-full first:h-[150px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00">
                <Image
                  className="w-full h-full mb-4"
                  src={"/assets/images/png/image-6.png"}
                  width={110}
                  height={70}
                  alt="img"
                />
              </div>
              <div className="w-full h-[150px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00">
                <Image
                  className="w-full h-full mb-4"
                  src={"/assets/images/png/image-7.png"}
                  width={110}
                  height={70}
                  alt="img"
                />
              </div>
            </div>
          </div>
          <div className="w-full mb-4">
            <h4 className="font-bold text-base 1xl:text-lg text-theme-darkblue-00 mb-[10px]">
              Pan Card
            </h4>
            <div className="w-full grid grid-cols-2 gap-2.5">
              <div className="w-full h-[150px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00">
                <Image
                  className="w-full h-full mb-4"
                  src={"/assets/images/png/image-6.png"}
                  width={110}
                  height={70}
                  alt="img"
                />
              </div>
              <div className="w-full h-[150px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00">
                <Image
                  className="w-full h-full mb-4"
                  src={"/assets/images/png/image-7.png"}
                  width={110}
                  height={70}
                  alt="img"
                />
              </div>
            </div>
          </div>
          <div className="w-full mb-4">
            <h4 className="font-bold text-base 1xl:text-lg text-theme-darkblue-00 mb-[10px]">
              Other documents
            </h4>
            <div className="w-full grid grid-cols-2 gap-2.5">
              <div className="w-full h-[150px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00">
                <Image
                  className="w-full h-full mb-4"
                  src={"/assets/images/png/image-8.png"}
                  width={110}
                  height={70}
                  alt="img"
                />
              </div>
              <div className="w-full h-[150px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00">
                <Image
                  className="w-full h-full mb-4"
                  src={"/assets/images/png/image-8.png"}
                  width={110}
                  height={70}
                  alt="img"
                />
              </div>
            </div>
          </div>
          <div className="w-full mb-4 pt-4 relative">
            <label
              htmlFor="email"
              className="absolute py-1 px-2 top-0.5 left-3 bg-white text-sm text-theme-black-50 inline-flex"
            >
              Remark*
            </label>
            <input
              type="text"
              placeholder="Write here"
              className={`text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-md border bg-white outline-none text-theme-darkblue-00`}
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-between gap-4 px-[30px]">
          <div className="w-fit flex items-center gap-4">
            <div className="w-full flex items-center gap-2 bg-theme-blue-50/10 p-[10px] rounded-[10px]">
              <input type="radio" id="True" name="trueFalse" />
              <label htmlFor="age1" className="text-sm">
                True
              </label>
            </div>
            <div className="w-full flex items-center gap-2 bg-theme-blue-50/10 p-[10px] rounded-[10px]">
              <input type="radio" id="False" name="trueFalse" />
              <label htmlFor="False" className="text-sm">
                False
              </label>
            </div>
          </div>
          <button className="min-w-[112px] p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]">
            Save
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={newCustomerModal}
        onRequestClose={closeNewCustomerModal}
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center"
        className="relative flex gap-6 flex-col w-full max-h-[90vh] overflow-hidden max-w-[1024px] rounded-[25px] 1xl:rounded-[35px] border border-solid py-[30px] bg-white border-theme-white-100 shadow-sm"
      >
        <div className="w-full flex items-center gap-4 justify-between px-[30px]">
          <h4 className="text-[22px] text-theme-black-50 font-bold">
            New Customer
          </h4>
          <button
            title="Close"
            className="size-[30px] flex items-center justify-center rounded-full bg-theme-red-50 text-theme-red-00 hover:bg-theme-red-00/15"
          >
            <Image
              className="size-3.5 img-filter-red"
              src={"/assets/images/svg/cross-icon.svg"}
              width={8}
              height={8}
              alt="icon"
            ></Image>
          </button>
        </div>
        <div className="flex-grow overflow-auto px-[30px]">
          <div className="w-full grid grid-cols-3 mb-4 gap-x-5 gap-y-2.5">
            <div className="w-full pt-4 relative">
              <label className="absolute py-1 px-2 top-0.5 left-3 bg-white text-sm text-theme-black-50 inline-flex">
                First Name*
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className={`text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-md border bg-white outline-none text-theme-darkblue-00`}
              />
            </div>
            <div className="w-full pt-4 relative">
              <label className="absolute py-1 px-2 top-0.5 left-3 bg-white text-sm text-theme-black-50 inline-flex">
                Last Name*
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className={`text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-md border bg-white outline-none text-theme-darkblue-00`}
              />
            </div>
            <div className="w-full pt-4 relative">
              <label className="absolute py-1 px-2 top-0.5 left-3 bg-white text-sm text-theme-black-50 inline-flex">
                Email ID
              </label>
              <input
                type="text"
                placeholder="Enter email address"
                className={`text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-md border bg-white outline-none text-theme-darkblue-00`}
              />
            </div>
            <div className="w-full pt-4 relative">
              <label className="absolute py-1 px-2 top-0.5 left-3 bg-white text-sm text-theme-black-50 inline-flex">
                Phone Number*
              </label>
              <input
                type="text"
                placeholder="+91 000 000 0000"
                className={`text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-md border bg-white outline-none text-theme-darkblue-00`}
              />
            </div>
            <div className="w-full pt-4 relative">
              <label className="absolute py-1 px-2 top-0.5 left-3 bg-white text-sm text-theme-black-50 inline-flex">
                Credit Limit*
              </label>
              <input
                type="text"
                placeholder="00"
                className={`text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-md border bg-white outline-none text-theme-darkblue-00`}
              />
            </div>
            <div className="w-full col-span-3 pt-4 relative">
              <label className="absolute py-1 px-2 top-0.5 left-3 bg-white text-sm text-theme-black-50 inline-flex">
                Address
              </label>
              <textarea
                placeholder="Enter address"
                className={`text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-md border bg-white outline-none text-theme-darkblue-00`}
              ></textarea>
            </div>
            <div className="w-full pt-4 relative">
              <label className="absolute py-1 px-2 top-0.5 left-3 bg-white text-sm text-theme-black-50 inline-flex">
                Reference Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className={`text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-md border bg-white outline-none text-theme-darkblue-00`}
              />
            </div>
            <div className="w-full pt-4 relative">
              <label className="absolute py-1 px-2 top-0.5 left-3 bg-white text-sm text-theme-black-50 inline-flex">
                Reference Mobile
              </label>
              <input
                type="text"
                placeholder="+91 000 000 0000"
                className={`text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-md border bg-white outline-none text-theme-darkblue-00`}
              />
            </div>
            <div className="w-full pt-4 relative">
              <label className="absolute py-1 px-2 top-0.5 left-3 bg-white text-sm text-theme-black-50 inline-flex">
                Reference Email
              </label>
              <input
                type="text"
                placeholder="Enter email address"
                className={`text-base 1xl:text-lg font-medium placeholder:text-theme-black-150 w-full min-h-[56px] 1xl:min-h-[66px] 1xl:px-5 px-4 py-3 1xl:py-4 rounded-md border bg-white outline-none text-theme-darkblue-00`}
              />
            </div>
          </div>
          <div className="w-full flex items-center justify-between gap-4 mb-4">
            <h4 className="text-base text-theme-black-50 font-medium">
              KYC Status
            </h4>
            <div className="w-fit flex items-center gap-4">
              <div className="w-full flex items-center gap-2 bg-theme-blue-50/10 p-[10px] rounded-[10px]">
                <input type="radio" id="True" name="trueFalse" />
                <label htmlFor="age1" className="text-sm">
                  True
                </label>
              </div>
              <div className="w-full flex items-center gap-2 bg-theme-blue-50/10 p-[10px] rounded-[10px]">
                <input type="radio" id="False" name="trueFalse" />
                <label htmlFor="False" className="text-sm">
                  False
                </label>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-5 mb-4">
            <div className="w-full">
              <h4 className="font-bold text-base 1xl:text-lg text-theme-darkblue-00 mb-[10px]">
                Aadhar Card
              </h4>
              <div className="w-full grid grid-cols-2 gap-2.5">
                <div className="w-full first:h-[150px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00">
                  <Image
                    className="w-full h-full mb-4"
                    src={"/assets/images/png/image-6.png"}
                    width={110}
                    height={70}
                    alt="img"
                  />
                </div>
                <div className="w-full h-[150px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00">
                  <Image
                    className="w-full h-full mb-4"
                    src={"/assets/images/png/image-7.png"}
                    width={110}
                    height={70}
                    alt="img"
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <h4 className="font-bold text-base 1xl:text-lg text-theme-darkblue-00 mb-[10px]">
                Pan Card
              </h4>
              <div className="w-full grid grid-cols-2 gap-2.5">
                <div className="w-full h-[150px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00">
                  <Image
                    className="w-full h-full mb-4"
                    src={"/assets/images/png/image-6.png"}
                    width={110}
                    height={70}
                    alt="img"
                  />
                </div>
                <div className="w-full h-[150px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00">
                  <Image
                    className="w-full h-full mb-4"
                    src={"/assets/images/png/image-7.png"}
                    width={110}
                    height={70}
                    alt="img"
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <h4 className="font-bold text-base 1xl:text-lg text-theme-darkblue-00 mb-[10px]">
                Other documents
              </h4>
              <div className="w-full grid grid-cols-2 gap-2.5">
                <div className="w-full h-[150px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00">
                  <Image
                    className="w-full h-full mb-4"
                    src={"/assets/images/png/image-8.png"}
                    width={110}
                    height={70}
                    alt="img"
                  />
                </div>
                <div className="w-full h-[150px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px] cursor-pointer hover:border-theme-blue-00">
                  <Image
                    className="w-full h-full mb-4"
                    src={"/assets/images/png/image-8.png"}
                    width={110}
                    height={70}
                    alt="img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-end gap-4 px-[30px]">
          <button className="min-w-[112px] p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-100 hover:bg-theme-purple-50 rounded-[10px]">
            Cancel
          </button>
          <button className="min-w-[112px] p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]">
            Save
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CustomerManagementKYCPage;
