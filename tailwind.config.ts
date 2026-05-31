import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#05060a",
        glass: "rgba(255,255,255,0.08)",
        line: "rgba(255,255,255,0.16)",
        mist: "#eaf2ff",
        cyan: "#6ee7ff",
        violet: "#b79cff",
        mint: "#88ffc8",
        coral: "#ff9e91",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 80px rgba(110, 231, 255, 0.22)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.25), 0 24px 80px rgba(0,0,0,0.36)",
      },
      animation: {
        aurora: "aurora 16s ease-in-out infinite alternate",
        float: "float 7s ease-in-out infinite",
        sheen: "sheen 4s ease-in-out infinite",
      },
      keyframes: {
        aurora: {
          "0%": { transform: "translate3d(-4%, -2%, 0) scale(1)" },
          "50%": { transform: "translate3d(4%, 3%, 0) scale(1.08)" },
          "100%": { transform: "translate3d(1%, -4%, 0) scale(1.03)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        sheen: {
          "0%, 100%": { opacity: "0.2", transform: "translateX(-35%)" },
          "50%": { opacity: "0.65", transform: "translateX(35%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
