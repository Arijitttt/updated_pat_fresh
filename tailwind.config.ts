import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#12151A",
        steel: "#4A5568",
        ember: "#E2542D",
        canvas: "#F5F6F7",
        line: "#E4E6E9",
        slate: "#6B7280",
      },
      fontFamily: {
        display: ["var(--font-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        prose: "70ch",
      },
      borderRadius: {
        sm: "3px",
      },
    },
  },
  plugins: [],
};

export default config;
