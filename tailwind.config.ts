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
      "1xl": "1440px",
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
            "100": withOpacity("white-100"),
            "150": withOpacity("white-150"),
            "200": withOpacity("white-200"),
          },
          black: {
            "00": withOpacity("black"),
            "50": withOpacity("black-50"),
            "100": withOpacity("black-100"),
            "150": withOpacity("black-150"),
          },
          purple: {
            "00": withOpacity("purple"),
            "50": withOpacity("purple-50"),
          },
          darkblue: {
            "00": withOpacity("darkblue"),
          },
          blue: {
            "00": withOpacity("blue"),
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
