"use client";

import { useMemo } from "react";
import { meshToBackgroundImage } from "@/lib/mesh";
import type { Mesh } from "@/lib/types";

export function Canvas({
  mesh,
  onClick,
}: {
  mesh: Mesh | null;
  onClick: () => void;
}) {
  const style = useMemo(() => {
    if (!mesh) return {};
    return {
      backgroundColor: mesh.base,
      backgroundImage: meshToBackgroundImage(mesh),
    };
  }, [mesh]);

  return (
    <div
      onClick={onClick}
      className="relative aspect-video rounded-[22px] overflow-hidden cursor-pointer border shadow-canvas mb-6 transition-transform duration-300 hover:-translate-y-1"
    >
      <div
        className="w-full h-full animate-breathe transition-[background-image,background-color] duration-700 ease-out"
        style={style}
      />
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
        <div className="px-3.5 py-2 rounded-[10px] bg-black/40 backdrop-blur-md text-white text-xs font-medium flex items-center gap-2 border border-white/10">
          <kbd className="px-1.5 py-0.5 bg-white/15 border border-white/20 rounded text-[11px] font-semibold">
            Space
          </kbd>
          또는 클릭으로 새 그라디언트
        </div>
      </div>
    </div>
  );
}
