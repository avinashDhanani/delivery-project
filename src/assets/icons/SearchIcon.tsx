import { IconProps } from "@/interface";

const SearchIcon = ({ className = "", ...props }: IconProps) => (
  <svg
    className={className}
    {...props}
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.188 13.125a5.937 5.937 0 1 0 0-11.875 5.937 5.937 0 0 0 0 11.875m6.562.625L12.5 12.5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default SearchIcon;
