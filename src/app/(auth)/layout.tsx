import React, { FC } from "react";
import { IChildprops } from "../../constants/child-prop.interface";
import AuthHeader from "./components/header";
import Image from "next/image";

const AuthLayout: FC<Readonly<IChildprops>> = ({ children }) => {
  return (
    <div className="authGradiant w-full h-screen flex flex-col overflow-hidden">
      <AuthHeader />
      <main className="flex-grow overflow-hidden flex">
        <div className="flex-grow overflow-hidden container !px-0 flex">
          <div className="w-full flex items-end justify-center">
            <Image
              className="w-[351px] h-[324px] object-contain object-bottom"
              src={"/assets/images/png/image-1.png"}
              width={351}
              height={324}
              alt="img"
            ></Image>
          </div>
          <div className="flex-grow w-[790px] shrink-0 overflow-auto hide-scrollbar flex flex-col items-center py-10 1xl:py-20 2xl:justify-center 2xl:py-10">
            {children}
          </div>
          <div className="w-full flex items-end justify-center">
            <Image
              className="w-[250px] h-[324px] object-contain object-bottom"
              src={"/assets/images/png/image-2.png"}
              width={250}
              height={324}
              alt="img"
            ></Image>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
