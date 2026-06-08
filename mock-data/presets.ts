// Aurora Studio 의 6개 컬러 프리셋.
// 새 프리셋을 추가할 때는 design-specs/aurora-studio.md 의 "데이터 계약" 도 함께 갱신할 것.

export type GradientPreset = {
  base: string;
  colors: string[];
};

export const PRESETS: Record<string, GradientPreset> = {
  aurora: {
    base: "#0a0f1c",
    colors: ["#4ade80", "#60a5fa", "#a78bfa", "#f0abfc", "#34d399", "#22d3ee"],
  },
  sunset: {
    base: "#1c0a14",
    colors: ["#fb923c", "#f472b6", "#a78bfa", "#fbbf24", "#ef4444", "#ec4899"],
  },
  ocean: {
    base: "#0a1428",
    colors: ["#06b6d4", "#0ea5e9", "#3b82f6", "#14b8a6", "#22d3ee", "#0284c7"],
  },
  cyberpunk: {
    base: "#16041f",
    colors: ["#ec4899", "#a855f7", "#3b82f6", "#22d3ee", "#f0abfc", "#d946ef"],
  },
  pastel: {
    base: "#1c1c22",
    colors: ["#fce7f3", "#dbeafe", "#d1fae5", "#fef3c7", "#e9d5ff", "#fed7aa"],
  },
  forest: {
    base: "#08140e",
    colors: ["#16a34a", "#65a30d", "#ca8a04", "#15803d", "#84cc16", "#22c55e"],
  },
};

export const PRESET_LIST = Object.keys(PRESETS);

export const PRESET_LABELS: Record<string, string> = {
  aurora: "Aurora",
  sunset: "Sunset",
  ocean: "Ocean",
  cyberpunk: "Cyber",
  pastel: "Pastel",
  forest: "Forest",
};
