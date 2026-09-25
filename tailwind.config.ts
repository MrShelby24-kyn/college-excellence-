import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#183B56",
          50: "#EAF0F5",
          100: "#CBD9E5",
          200: "#9CB6CC",
          300: "#6D93B3",
          400: "#3E7099",
          500: "#265679",
          600: "#1E4767",
          700: "#183B56", // couleur principale
          800: "#122A3D",
          900: "#0B1A26",
        },
        gold: {
          DEFAULT: "#C99A3E",
          50: "#FBF3E3",
          100: "#F5E4C0",
          200: "#EBCC8C",
          300: "#E0B558",
          400: "#D6A44A",
          500: "#C99A3E",
          600: "#A87D2F",
          700: "#816125",
          800: "#5A441A",
          900: "#332710",
        },
        surface: "#F5F7FA",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "soft-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(37, 211, 102, 0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "soft-pulse": "soft-pulse 2.5s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
