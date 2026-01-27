import { IconProps } from "@/interface";

const FilterIcon = ({ ...props }: IconProps) => (
  <svg
    {...props}
    width="10"
    height="9"
    viewBox="0 0 10 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.75 1.167H7.476A1.745 1.745 0 0 0 5.833 0a1.745 1.745 0 0 0-1.642 1.167H.583a.583.583 0 0 0 0 1.166h3.608A1.745 1.745 0 0 0 5.833 3.5a1.745 1.745 0 0 0 1.643-1.167H8.75a.583.583 0 1 0 0-1.166m0 4.666H5.143A1.74 1.74 0 0 0 3.5 4.667a1.745 1.745 0 0 0-1.643 1.166H.583A.583.583 0 0 0 .583 7h1.274A1.745 1.745 0 0 0 3.5 8.167 1.745 1.745 0 0 0 5.143 7H8.75a.583.583 0 0 0 0-1.167"
      fill="currentColor"
    />
  </svg>
);

export default FilterIcon;
