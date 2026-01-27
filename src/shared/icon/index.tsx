import AuthLogo from "@/assets/icons/AuthLogo";
import ChevronLeft from "@/assets/icons/ChevronLeft";
import CrossIcon from "@/assets/icons/CrossIcon";
import DocIcon from "@/assets/icons/DocIcon";
import EyeCloseIcon from "@/assets/icons/EyeCloseIcon";
import EyeOpenIcon from "@/assets/icons/EyeOpenIcon";
import FillBag2Icon from "@/assets/icons/FillBag2Icon";
import FillBagIcon from "@/assets/icons/FillBagIcon";
import FillBellIcon from "@/assets/icons/FillBellIcon";
import FillClipboardCheckIcon from "@/assets/icons/FillClipboardCheckIcon";
import FillDashboardIcon from "@/assets/icons/FillDashboardIcon";
import FillGenerateOrderIcon from "@/assets/icons/FillGenerateOrderIcon";
import FillHeartIcon from "@/assets/icons/FillHeartIcon";
import FillMasterReceiverIcon from "@/assets/icons/FillMasterReceiverIcon";
import FillMasterSenderIcon from "@/assets/icons/FillMasterSenderIcon";
import FillNotificationIcon from "@/assets/icons/FillNotificationIcon";
import FillPhoneIcon from "@/assets/icons/FillPhoneIcon";
import FilterIcon from "@/assets/icons/FilterIcon";
import IconLogo from "@/assets/icons/IconLogo";
import PlusIcon from "@/assets/icons/PlusIcon";
import SearchIcon from "@/assets/icons/SearchIcon";
import SinglePersonIcon from "@/assets/icons/SinglePersonIcon";
import StrokeDashboardIcon from "@/assets/icons/StrokeDashboardIcon";
import StrokeGenerateOrderIcon from "@/assets/icons/StrokeGenerateOrderIcon";
import StrokeMasterReceiverIcon from "@/assets/icons/StrokeMasterReceiverIcon";
import StrokeMasterSenderIcon from "@/assets/icons/StrokeMasterSenderIcon";
import StrokeNotificationIcon from "@/assets/icons/StrokeNotificationIcon";

export type IconName =
  | "auth-logo"
  | "cross-icon"
  | "doc-icon"
  | "eye-open-icon"
  | "eye-close-icon"
  | "plus-icon"
  | "single-person-icon"
  | "logo-icon"
  | "stroke-dashboard-icon"
  | "fill-dashboard-icon"
  | "stroke-master-sender-icon"
  | "fill-master-sender-icon"
  | "stroke-master-receiver-icon"
  | "fill-master-receiver-icon"
  | "fill-notification-icon"
  | "fill-generate-order-icon"
  | "stroke-notification-icon"
  | "stroke-generate-order-icon"
  | "search-icon"
  | "fill-bell-icon"
  | "fill-phone-icon"
  | "fill-bag-icon"
  | "fill-clipboard-check-icon"
  | "fill-heart-icon"
  | "fill-bag2-icon"
  | "chevron-left"
  | "filter-icon";

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

    case "logo-icon":
      return <IconLogo className={className} />;

    case "stroke-dashboard-icon":
      return <StrokeDashboardIcon className={className} />;

    case "fill-dashboard-icon":
      return <FillDashboardIcon className={className} />;

    case "stroke-master-sender-icon":
      return <StrokeMasterSenderIcon className={className} />;

    case "fill-master-sender-icon":
      return <FillMasterSenderIcon className={className} />;

    case "stroke-master-receiver-icon":
      return <StrokeMasterReceiverIcon className={className} />;

    case "fill-master-receiver-icon":
      return <FillMasterReceiverIcon className={className} />;

    case "fill-notification-icon":
      return <FillNotificationIcon className={className} />;

    case "fill-generate-order-icon":
      return <FillGenerateOrderIcon className={className} />;

    case "stroke-notification-icon":
      return <StrokeNotificationIcon className={className} />;

    case "stroke-generate-order-icon":
      return <StrokeGenerateOrderIcon className={className} />;

    case "search-icon":
      return <SearchIcon className={className} />;

    case "fill-bell-icon":
      return <FillBellIcon className={className} />;

    case "fill-phone-icon":
      return <FillPhoneIcon className={className} />;

    case "fill-bag-icon":
      return <FillBagIcon className={className} />;

    case "fill-clipboard-check-icon":
      return <FillClipboardCheckIcon className={className} />;

    case "fill-heart-icon":
      return <FillHeartIcon className={className} />;

    case "fill-bag2-icon":
      return <FillBag2Icon className={className} />;

    case "chevron-left":
      return <ChevronLeft className={className} />;

    case "filter-icon":
      return <FilterIcon className={className} />;

    default:
      return null;
  }
};

export default Icon;
