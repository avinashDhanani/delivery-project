import React from "react";
import Icon from "../icon";

interface SearchBoxProps {
  placeholder?: string;
}

const SearchBox = ({ placeholder }: SearchBoxProps) => {
  return (
    <div className="flex min-w-[310px] items-center relative h-11 rounded-[10px] bg-theme-purple-150">
      <Icon name="search-icon" className="text-white size-4 absolute left-4" />
      <input type="search" className="pl-11 pr-5 text-sm placeholder:font-normal placeholder:text-white/75 font-medium text-white size-full bg-transparent border-none outline-none" placeholder={placeholder || "Search..."} />
    </div>
  );
};

export default SearchBox;
