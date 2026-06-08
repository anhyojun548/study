// 메쉬 생성 / 직렬화 / PNG export.
// ⚠ 함수 시그니처는 design-specs/aurora-studio.md 의 "데이터 계약" 참조 — 변경 금지.

import { PRESETS } from "@mock/presets";
import type { Mesh } from "./types";

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export function generateMesh(presetName: string, complexity: number): Mesh {
  const preset = PRESETS[presetName] ?? PRESETS.aurora;
  const gradients = [];
  const usedColors: string[] = [];

  for (let i = 0; i < complexity; i++) {
    let color = preset.colors[Math.floor(Math.random() * preset.colors.length)];
    // 가능한 한 같은 화면 안에서 색이 겹치지 않게
    for (let attempt = 0; attempt < 5; attempt++) {
      color = preset.colors[Math.floor(Math.random() * preset.colors.length)];
      if (!usedColors.includes(color) || usedColors.length >= preset.colors.length) break;
    }
    usedColors.push(color);

    gradients.push({
      x: Math.round(rand(5, 95)),
      y: Math.round(rand(5, 95)),
      r: Math.round(rand(45, 75)),
      color,
    });
  }

  return { base: preset.base, gradients, preset: presetName };
}

export function meshToBackgroundImage(mesh: Mesh): string {
  return mesh.gradients
    .map((g) => `radial-gradient(circle at ${g.x}% ${g.y}%, ${g.color} 0%, transparent ${g.r}%)`)
    .join(", ");
}

export function meshToCSS(mesh: Mesh): string {
  const gradients = mesh.gradients
    .map((g) => `radial-gradient(circle at ${g.x}% ${g.y}%, ${g.color} 0%, transparent ${g.r}%)`)
    .join(",\n    ");
  return `background-color: ${mesh.base};\nbackground-image:\n    ${gradients};`;
}

export function exportMeshToPNG(mesh: Mesh, filename?: string) {
  const W = 1920;
  const H = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = mesh.base;
  ctx.fillRect(0, 0, W, H);

  const maxDim = Math.max(W, H);
  mesh.gradients.forEach((g) => {
    const cx = (g.x / 100) * W;
    const cy = (g.y / 100) * H;
    const radius = (g.r / 100) * maxDim;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, g.color);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  });

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename ?? `aurora-${mesh.preset}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, "image/png");
}
