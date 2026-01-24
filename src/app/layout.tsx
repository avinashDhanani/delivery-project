"use client";

import { FC } from "react";
import { Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { Provider } from "react-redux";
import "../styles/global.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { createDarkModeVariables, createLightModeVariables } from "../theme";
import { store } from "../store/store";
import { IChildProps } from "@/interface";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// export const metadata = {
//   title: "Next.js Template",
//   description: "A clean Next.js project template",
// };

const RootLayout: FC<Readonly<IChildProps>> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${dmSans.variable}`}>
        <style jsx global>{`
          ${createLightModeVariables} ${createDarkModeVariables}
        `}</style>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;
