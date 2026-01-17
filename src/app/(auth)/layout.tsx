import React, { FC } from "react";
import { IChildprops } from "../../constants/child-prop.interface";
import AuthHeader from "./components/header";

const AuthLayout: FC<Readonly<IChildprops>> = ({ children }) => {
  return (
    <div className="authGradiant w-full h-screen flex flex-col overflow-hidden">
      <AuthHeader />
      <main className="size-full text-center">{children}</main>
    </div>
  );
};

export default AuthLayout;
