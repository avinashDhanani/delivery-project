import { IconProps } from "@/interface";

const StrokeMasterReceiverIcon = ({ className = "", ...props }: IconProps) => (
  <>
    <svg
      className={className}
      {...props}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.75 10.05v2.25c0 3-1.2 4.2-4.2 4.2H5.7c-3 0-4.2-1.2-4.2-4.2V9.45c0-3 1.2-4.2 4.2-4.2h2.25"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.75 10.05h-2.4c-1.8 0-2.4-.6-2.4-2.4v-2.4zM8.7 1.5h3M5.25 3.75A2.247 2.247 0 0 1 7.5 1.5h1.965M16.5 6v4.643a2.11 2.11 0 0 1-2.107 2.107M16.5 6h-2.25C12.563 6 12 5.438 12 3.75V1.5z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </>
);

export default StrokeMasterReceiverIcon;
