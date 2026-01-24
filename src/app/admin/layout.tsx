import React, { FC } from "react";

import { IChildProps } from "@/interface";

const AdminLayout: FC<Readonly<IChildProps>> = ({ children }) => {
  return (
    <div className="authGradient w-full h-screen flex flex-col overflow-hidden">
      <main className="flex-grow overflow-auto flex flex-col">{children}</main>
    </div>
  );
};

export default AdminLayout;
