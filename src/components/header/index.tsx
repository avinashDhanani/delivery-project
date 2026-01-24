"use client";

import React from "react";

import Icon from "@/shared/icon";
import SearchBox from "@/shared/search";

const Header = () => {
  return (
    <header className="w-full shrink-0 border-b border-b-theme-purple-150 h-[74px] p-4 flex items-center justify-between gap-4">
      <h1 className="text-base text-white font-semibold relative top-1">Dashboard</h1>
      <div className="flex items-center gap-4">
        <SearchBox />
        <button className="flex px-4 py-3 text-center justify-center gap-[5px] min-w-[152px] items-center relative h-11 rounded-[10px] text-white bg-theme-purple-150 hover:bg-white hover:text-theme-black-50 transition-colors">
          <span className="relative top-[1px]">Balance</span> :{" "}
          <b className="text-lg relative top-[1px]">₹ 50K</b>
        </button>
        <button className="flex text-center justify-center gap-[5px] w-11 items-center relative h-11 rounded-[10px] text-white bg-theme-purple-150 hover:bg-white hover:text-theme-black-50 transition-colors">
         <Icon name="fill-bell-icon" className="size-6" />
        </button>
        <button className="flex text-center justify-center gap-[5px] w-11 items-center relative h-11 rounded-[10px] text-white bg-theme-purple-150 hover:bg-white hover:text-theme-black-50 transition-colors">
          <Icon name="fill-phone-icon" className="size-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
