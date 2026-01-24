import AuthLogo from "@/assets/icons/AuthLogo";
import CrossIcon from "@/assets/icons/CrossIcon";
import DocIcon from "@/assets/icons/DocIcon";
import EyeCloseIcon from "@/assets/icons/EyeCloseIcon";
import EyeOpenIcon from "@/assets/icons/EyeOpenIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import SinglePersonIcon from "@/assets/icons/SinglePersonIcon";

export type IconName =
  | "auth-logo"
  | "cross-icon"
  | "doc-icon"
  | "eye-open-icon"
  | "eye-close-icon"
  | "plus-icon"
  | "single-person-icon";

interface IconProps {
  name: IconName;
  className?: string;
}

const Icon = ({ name, className = "" }: IconProps) => {
  switch (name) {
    case "auth-logo":
      return <AuthLogo className={className} />;

    case "cross-icon":
      return <CrossIcon className={className} />;

    case "cross-icon":
      return <DocIcon className={className} />;

    case "eye-open-icon":
      return <EyeOpenIcon className={className} />;

    case "eye-close-icon":
      return <EyeCloseIcon className={className} />;

    case "plus-icon":
      return <PlusIcon className={className} />;

    case "single-person-icon":
      return <SinglePersonIcon className={className} />;

    default:
      return null;
  }
};

export default Icon;
