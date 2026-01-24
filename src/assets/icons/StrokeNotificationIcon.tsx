import { IconProps } from "@/interface";

const StrokeNotificationIcon = ({ className = "", ...props }: IconProps) => (
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
        d="M6.75 16.5h4.5c3.75 0 5.25-1.5 5.25-5.25v-4.5C16.5 3 15 1.5 11.25 1.5h-4.5C3 1.5 1.5 3 1.5 6.75v4.5C1.5 15 3 16.5 6.75 16.5"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.5 5.813v5.062c0-.825-.675-1.5-1.5-1.5H6c-.825 0-1.5.675-1.5 1.5V5.813c0-.825.675-1.5 1.5-1.5h6c.825 0 1.5.675 1.5 1.5m.75 6h-.75m-9 0h-.75"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.5 10.5V8.25c0-.825-.675-1.5-1.5-1.5H6c-.825 0-1.5.675-1.5 1.5v2.25"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.5 10.875v.938h-2.625a1.876 1.876 0 0 1-3.75 0H4.5v-.938c0-.825.675-1.5 1.5-1.5h6c.825 0 1.5.675 1.5 1.5"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </>
);

export default StrokeNotificationIcon;
