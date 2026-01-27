import { IconProps } from "@/interface";

const ChevronLeft = ({ ...props }: IconProps) => (
  <svg
    {...props}
    width="5"
    height="8"
    viewBox="0 0 5 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.633.184a.6.6 0 0 1-.017.849L1.466 4l3.15 2.968a.6.6 0 1 1-.832.864l-3.6-3.4a.6.6 0 0 1 0-.865l3.6-3.4a.6.6 0 0 1 .849.017"
      fill="currentColor"
    />
  </svg>
);

export default ChevronLeft;
