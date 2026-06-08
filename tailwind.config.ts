import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "Inter", "sans-serif"],
      },
      colors: {
        // design-skills/design-saas.md 의 컬러 토큰과 1:1 매핑
        ink: "#07070c",                              // page background
        muted: "#8b8b9a",                            // 보조 텍스트
        "muted-strong": "#c9c9d4",                   // 강조 보조 텍스트
        success: "#4ade80",
      },
      borderColor: {
        DEFAULT: "rgba(255,255,255,0.08)",
        strong: "rgba(255,255,255,0.16)",
      },
      maxWidth: {
        page: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
