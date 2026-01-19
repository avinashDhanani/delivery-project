import React from "react";
import Image from "next/image";

const AdminNoRecord = () => {
  return (
    <div className="w-full max-w-[380px] flex flex-col items-center justify-center text-center text-white">
      <h1 className="font-bold text-[28px] 1xl:text-[34px] mb-1.5">
        No Data Found?
      </h1>
      <p className="text-center font-medium text-sm 1xl:text-base mb-[21px]">
        There is no available data to show. Please choose different and try
        again.There is no available data to show. Please choose different and
        try again.
      </p>
      <button
        title="Create New Customer"
        className="w-[251px] p-2 h-12 1xl:h-14 cursor-pointer flex items-center justify-center gap-2.5 text-base 1xl:text-lg font-semibold bg-white hover:bg-theme-white-50 rounded-[10px] disabled:opacity-50 disabled:cursor-not-allowed text-theme-black-00"
      >
        <Image
          className="w-5 1xl:w-[24px] h-auto shrink-0"
          src={"/assets/images/svg/plus-icon.svg"}
          width={24}
          height={24}
          alt="icon"
        ></Image>
        <span>Create New Customer</span>
      </button>
    </div>
  );
};

export default AdminNoRecord;
