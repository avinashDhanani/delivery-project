import React, { FC } from "react";
import { IChildprops } from "../../constants/child-prop.interface";

const AdminLayout: FC<Readonly<IChildprops>> = ({ children }) => {
  return (
    <div className="adminGradiant w-full h-screen flex flex-col overflow-hidden">
      <main className="flex-grow overflow-auto flex flex-col">{children}</main>
    </div>
  );
};

export default AdminLayout;
