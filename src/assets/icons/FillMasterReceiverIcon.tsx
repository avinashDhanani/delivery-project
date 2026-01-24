import { IconProps } from "@/interface";

const FillMasterReceiverIcon = ({ className = "", ...props }: IconProps) => (
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
        d="M11.625 9.863H9.998A2.42 2.42 0 0 1 7.575 7.44V5.812a.56.56 0 0 0-.562-.562H4.635C2.903 5.25 1.5 6.375 1.5 8.385v4.98c0 2.01 1.402 3.135 3.135 3.135h4.418c1.732 0 3.134-1.125 3.134-3.135v-2.94a.56.56 0 0 0-.562-.562"
        fill="currentColor"
      />
      <path
        d="M13.365 1.5H8.948C7.253 1.5 5.88 2.58 5.82 4.508c.045 0 .083-.008.128-.008h4.417c1.733 0 3.135 1.125 3.135 3.135v4.988c0 .045-.007.082-.007.12 1.672-.053 3.007-1.163 3.007-3.12V4.635c0-2.01-1.402-3.135-3.135-3.135"
        fill="currentColor"
      />
      <path
        d="M8.985 5.362c-.233-.232-.63-.075-.63.248v1.965c0 .825.697 1.5 1.552 1.5.533.007 1.275.007 1.913.007.322 0 .487-.375.262-.6-.817-.817-2.272-2.28-3.097-3.12"
        fill="currentColor"
      />
    </svg>
  </>
);

export default FillMasterReceiverIcon;
