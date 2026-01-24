import { IconName } from "@/shared/icon";
import { ReactNode } from "react";

export interface IChildProps {
  children: React.ReactNode;
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export interface ButtonProps {
  title: string;
  onClick?: () => void;
  variant?: "purple" | "white";
  btnClass?: string;
  iconName?: IconName;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
  showFooter?: boolean;
  cancelText?: string;
  saveText?: string;
  onCancel?: () => void;
  onSave?: () => void;
  saveDisabled?: boolean;
  widthClass?: string;
  children: ReactNode;
}
