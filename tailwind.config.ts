import type { Config } from "tailwindcss";

const withOpacity = (variableName: any): any => {
  return ({ opacityValue }: any) => {
    if (opacityValue !== undefined) {
      return `rgba(var(--theme-${variableName}), ${
        opacityValue || "<alpha-value>"
      })`;
    }
    return `rgb(var(--theme-${variableName}))`;
  };
};

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    screens: {
      xsm: "410px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1780px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "25px",
        xsm: "25px",
        sm: "25px",
        md: "40px",
        lg: "60px",
        xl: "80px",
      },
    },
    extend: {
      colors: {
        theme: {
          white: {
            "00": withOpacity("white"),
            "50": withOpacity("white-50"),
          },
          black: {
            "00": withOpacity("black"),
            "50": withOpacity("black-50"),
            "100": withOpacity("black-100"),
          },
          cyan: {
            "00": withOpacity("cyan"),
            "50": withOpacity("cyan-50"),
            "100": withOpacity("cyan-100"),
            "150": withOpacity("cyan-150"),
            "200": withOpacity("cyan-200"),
          },
          purple: {
            "00": withOpacity("purple"),
          },
        },
      },
      fontFamily: {
        dmsans: ["var(--font-dm-sans)"],
      },
    },
  },
  plugins: [],
};

export default config;
