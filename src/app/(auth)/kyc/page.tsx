import Image from "next/image";
import Link from "next/link";
import React from "react";

const KycPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center max-w-[695px] mx-auto">
      <h1 className="text-center font-bold text-[28px] 1xl:text-[34px] text-white mb-1">
        KYC MANAGEMENT
      </h1>
      <p className="text-center font-medium text-sm 1xl:text-base text-white mb-5">
        Upload your Document and let a KYC
      </p>
      <form
        action=""
        className="w-full rounded-[25px] 1xl:rounded-[35px] border border-solid p-5 1xl:p-[30px] bg-white border-theme-white-100 shadow-sm"
      >
        <div className="w-full mb-4">
          <h4 className="font-bold text-base 1xl:text-lg text-theme-darkblue-00 mb-[10px]">
            Aadhar Card
          </h4>
          <div className="w-full grid grid-cols-2 gap-2.5">
            <div className="w-full h-[170px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px]">
              <input type="file" className="absolute inset-0 opacity-0" />
              <div className="size-full flex flex-col items-center justify-center text-center p-6">
                <Image
                  className="w-[120px] h-auto mb-4"
                  src={"/assets/images/png/upload-front-side.png"}
                  width={110}
                  height={70}
                  alt="img"
                ></Image>
                <p className="text-sm text-theme-black-50 font-medium">Upload Front Side</p>
              </div>
            </div>
            <div className="w-full h-[170px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px]">
              <input type="file" className="absolute inset-0 opacity-0" />
              <div className="size-full flex flex-col items-center justify-center text-center p-6">
                <Image
                  className="w-[120px] h-auto mb-4"
                  src={"/assets/images/png/upload-back-side.png"}
                  width={110}
                  height={70}
                  alt="img"
                ></Image>
                <p className="text-sm text-theme-black-50 font-medium">Upload Back Side</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mb-4">
          <h4 className="font-bold text-base 1xl:text-lg text-theme-darkblue-00 mb-[10px]">
            Pan Card
          </h4>
          <div className="w-full grid grid-cols-2 gap-2.5">
            <div className="w-full h-[170px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px]">
              <input type="file" className="absolute inset-0 opacity-0" />
              <div className="size-full flex flex-col items-center justify-center text-center p-6">
                <Image
                  className="w-[120px] h-auto mb-4"
                  src={"/assets/images/png/upload-front-side.png"}
                  width={110}
                  height={70}
                  alt="img"
                ></Image>
                <p className="text-sm text-theme-black-50 font-medium">Upload Front Side</p>
              </div>
            </div>
            <div className="w-full h-[170px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px]">
              <input type="file" className="absolute inset-0 opacity-0" />
              <div className="size-full flex flex-col items-center justify-center text-center p-6">
                <Image
                  className="w-[120px] h-auto mb-4"
                  src={"/assets/images/png/upload-back-side.png"}
                  width={110}
                  height={70}
                  alt="img"
                ></Image>
                <p className="text-sm text-theme-black-50 font-medium">Upload Back Side</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mb-4">
          <h4 className="font-bold text-base 1xl:text-lg text-theme-darkblue-00 mb-[10px]">
            Upload Your other documents
          </h4>
          <div className="w-full grid grid-cols-2 gap-2.5">
            <div className="w-full h-[170px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px]">
              <input type="file" className="absolute inset-0 opacity-0" />
              <div className="size-full flex flex-col items-center justify-center text-center p-6">
                <Image
                  className="w-[50px] h-auto mb-4"
                  src={"/assets/images/svg/file-svg.svg"}
                  width={45}
                  height={58}
                  alt="img"
                ></Image>
                <p className="text-sm text-theme-black-50 font-medium">Upload Document</p>
              </div>
            </div>
            <div className="w-full h-[170px] relative overflow-hidden bg-theme-white-200 border-2 border-dashed border-theme-white-100 rounded-xl 1xl:rounded-[15px]">
              <input type="file" className="absolute inset-0 opacity-0" />
              <div className="size-full flex flex-col items-center justify-center text-center p-6">
                <Image
                  className="w-[50px] h-auto mb-4"
                  src={"/assets/images/svg/file-svg.svg"}
                  width={45}
                  height={58}
                  alt="img"
                ></Image>
                <p className="text-sm text-theme-black-50 font-medium">Upload Document</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[30px] w-full flex items-center justify-center">
          <button
            type="submit"
            title="Submit Documents"
            className="w-[251px] p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-white text-base 1xl:text-lg font-semibold bg-theme-purple-50 hover:bg-theme-purple-00 rounded-[10px]"
          >
            <Image
              className="w-5 1xl:w-[24px] img-filter-white h-auto shrink-0"
              src={"assets/images/svg/doc-white-icon.svg"}
              width={24}
              height={24}
              alt="logo"
            ></Image>
            <span className="relative top-0.5">Submit Documents</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default KycPage;
