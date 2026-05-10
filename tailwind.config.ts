import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#2D5016", light: "#4A7C2E" },
        "soft-green": "#E8F5E0",
        "warm-beige": "#F7F3EC",
        paper: "#FFFDF9",
        accent: "#C9A96E",
        "text-main": "#3A3A3A",
        "text-muted": "#7A7A7A",
      },
      fontFamily: {
        serif: ["var(--font-nanum)", "Nanum Myeongjo", "serif"],
        body: ["var(--font-body)", "Noto Sans KR", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      animation: {
        "fade-in": "fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "slide-up": "slideUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "gentle-pulse": "gentlePulse 4s ease-in-out infinite",
        "slide-in": "slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gentlePulse: {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
