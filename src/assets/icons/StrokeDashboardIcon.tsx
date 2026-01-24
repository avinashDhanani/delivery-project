import { IconProps } from "@/interface";

const StrokeDashboardIcon = ({ className = "", ...props }: IconProps) => (
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
        d="M6.765 2.13 2.723 5.28C2.048 5.805 1.5 6.923 1.5 7.77v5.558a3.17 3.17 0 0 0 3.157 3.165h8.685a3.167 3.167 0 0 0 3.158-3.158v-5.46c0-.907-.607-2.07-1.35-2.587L10.515 2.04c-1.05-.735-2.738-.697-3.75.09M9 13.493v-2.25"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </>
);

export default StrokeDashboardIcon;
