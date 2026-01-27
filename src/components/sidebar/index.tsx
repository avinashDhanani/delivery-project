"use client";

import React from "react";
import Tippy from "@tippyjs/react";

import Image from "next/image";
import Link from "next/link";

import Icon, { IconName } from "@/shared/icon";

export interface SidebarItem {
  tooltip: string;
  href: string;
  iconStroke: IconName;
  iconFill: IconName;
}

export const sidebarItems: SidebarItem[] = [
  {
    tooltip: "Dashboard",
    href: "#",
    iconStroke: "stroke-dashboard-icon",
    iconFill: "fill-dashboard-icon",
  },
  {
    tooltip: "Master Sender Party",
    href: "#",
    iconStroke: "stroke-master-sender-icon",
    iconFill: "fill-master-sender-icon",
  },
  {
    tooltip: "Master Receiver Party",
    href: "#",
    iconStroke: "stroke-master-receiver-icon",
    iconFill: "fill-master-receiver-icon",
  },
  {
    tooltip: "Notification",
    href: "#",
    iconStroke: "stroke-notification-icon",
    iconFill: "fill-notification-icon",
  },
  {
    tooltip: "Generate Order",
    href: "#",
    iconStroke: "stroke-generate-order-icon",
    iconFill: "fill-generate-order-icon",
  },
];

const Sidebar = () => {
  return (
    <div className="h-full w-[84px] shrink-0 py-4 px-1.5 overflow-hidden flex flex-col">
      <div className="flex-grow flex flex-col overflow-hidden rounded-2xl bg-theme-purple-150">
        <Link
          href="/dashboard"
          title="Ark Air"
          className="cursor-pointer shrink-0 w-full flex items-center justify-center p-3.5"
        >
          <Icon name="logo-icon" className="text-white" />
        </Link>
        <ul className="flex-grow flex flex-col gap-4 overflow-auto custom-scrollbar mt-16 mb-8 p-3.5">
          {sidebarItems.map((item, index) => (
            <li className="w-full">
              <Tippy
                key={index}
                content={item.tooltip}
                placement="right"
                theme="dark"
              >
                <Link
                  href={item.href}
                  className="shrink-0 cursor-pointer size-[42px] flex items-center justify-center hover:bg-white/10 relative rounded-full transition-colors opacity-60 group hover:opacity-100"
                >
                  <Icon
                    name={item.iconStroke}
                    className="size-5 text-white opacity-100 group-hover:opacity-0 transition-colors"
                  />
                  <Icon
                    name={item.iconFill}
                    className="size-5 absolute text-white opacity-0 group-hover:opacity-100 transition-colors"
                  />
                </Link>
              </Tippy>
            </li>
          ))}
        </ul>
        <Link
          href="/dashboard"
          title="John Doe"
          className="w-full flex items-center justify-center shrink-0 cursor-pointer p-3.5"
        >
          <span className="size-[43px] rounded-xl bg-theme-purple-200 p-[1px] overflow-hidden">
            <Image
              className="size-full object-cover rounded-lg"
              src={"/assets/images/png/pfp-1.png"}
              width={42}
              height={42}
              alt="img"
            ></Image>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
