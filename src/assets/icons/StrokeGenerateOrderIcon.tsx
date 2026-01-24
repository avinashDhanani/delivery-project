import { IconProps } from "@/interface";

const StrokeGenerateOrderIcon = ({ className = "", ...props }: IconProps) => (
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
        d="M2.377 5.58 9 9.413l6.577-3.81M9 16.208V9.405"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.447 1.86 3.442 4.088c-.907.502-1.65 1.762-1.65 2.797v4.238c0 1.035.743 2.295 1.65 2.797l4.005 2.228c.855.472 2.258.472 3.113 0l4.005-2.228c.908-.502 1.65-1.762 1.65-2.797V6.885c0-1.035-.742-2.295-1.65-2.797L10.56 1.86c-.863-.48-2.258-.48-3.113 0"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.75 9.93V7.185l-7.117-4.11"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </>
);

export default StrokeGenerateOrderIcon;
