import { IconProps } from "@/interface";

const FillClipboardCheckIcon = ({ className = "", ...props }: IconProps) => (
  <>
    <svg
      className={className}
      {...props}
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.923 0h2.996v3.854H7.923z" fill="currentColor" />
      <path
        d="M16.269 0h-3.636v3.854c0 .945-.768 1.714-1.714 1.714H7.923a1.716 1.716 0 0 1-1.715-1.714V0H2.571A2.58 2.58 0 0 0 0 2.571v13.715a2.573 2.573 0 0 0 2.571 2.571H16.27a2.57 2.57 0 0 0 2.571-2.571V2.57A2.573 2.573 0 0 0 16.269 0m-4.145 11.713L9.36 14.477a.855.855 0 0 1-1.212 0L6.66 12.99a.856.856 0 1 1 1.212-1.212l.882.882 2.158-2.158a.856.856 0 1 1 1.212 1.212"
        fill="currentColor"
      />
    </svg>
  </>
);

export default FillClipboardCheckIcon;
