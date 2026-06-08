// ⚠ localStorage key 변경 금지 — 변경 시 사용자 라이브러리 손실.

import type { Mesh } from "./types";

const KEY = "aurora-library";
const MAX_ITEMS = 24;

export function loadLibrary(): Mesh[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function persist(items: Mesh[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items.slice(0, MAX_ITEMS)));
}

export function addToLibrary(mesh: Mesh): Mesh[] {
  const next = [{ ...mesh, id: Date.now() }, ...loadLibrary()].slice(0, MAX_ITEMS);
  persist(next);
  return next;
}

export function removeFromLibrary(id: number): Mesh[] {
  const next = loadLibrary().filter((m) => m.id !== id);
  persist(next);
  return next;
}
