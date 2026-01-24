import { IconProps } from "@/interface";

const FillDashboardIcon = ({ className = "", ...props }: IconProps) => (
  <>
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="m15.03 5.115-4.32-3.022c-1.178-.825-2.985-.78-4.118.097L2.836 5.123c-.75.585-1.342 1.785-1.342 2.73v5.175A3.473 3.473 0 0 0 4.957 16.5h8.086a3.466 3.466 0 0 0 3.465-3.465V7.95c0-1.012-.653-2.257-1.478-2.835M9.563 13.5a.567.567 0 0 1-.563.563.567.567 0 0 1-.562-.563v-2.25c0-.307.255-.562.562-.562s.563.255.563.562z"
        fill="currentColor"
      />
    </svg>
  </>
);

export default FillDashboardIcon;
