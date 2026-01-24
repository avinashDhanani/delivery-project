import React, { FC } from "react";

import { IChildProps } from "@/interface";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

const CustomerLayout: FC<Readonly<IChildProps>> = ({ children }) => {
  return (
    <div className="authGradient border w-full h-screen flex overflow-hidden">
      <Sidebar />
      <div className="grow flex flex-col overflow-hidden">
        <Header />
        <main className="p-4 flex-grow overflow-auto flex flex-col">{children}</main>
      </div>
    </div>
  );
};

export default CustomerLayout;
