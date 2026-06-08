"use client";

import { useCallback, useEffect, useState } from "react";
import { exportMeshToPNG, generateMesh, meshToCSS } from "@/lib/mesh";
import { addToLibrary, loadLibrary, removeFromLibrary } from "@/lib/storage";
import type { Mesh } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { Canvas } from "./Canvas";
import { Controls } from "./Controls";
import { Library } from "./Library";

export default function AuroraStudio() {
  const [preset, setPreset] = useState<string>("aurora");
  const [layers, setLayers] = useState<number>(5);
  const [mesh, setMesh] = useState<Mesh | null>(null);
  const [library, setLibrary] = useState<Mesh[]>([]);
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({
    msg: "",
    visible: false,
  });
  const [userCount, setUserCount] = useState(12847);

  // Initialize on client
  useEffect(() => {
    setMesh(generateMesh("aurora", 5));
    setLibrary(loadLibrary());
  }, []);

  // Lived-in feel — small social-proof counter
  useEffect(() => {
    const id = setInterval(() => setUserCount((n) => n + 1), 8000);
    return () => clearInterval(id);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast({ msg, visible: true });
  }, []);

  const regenerate = useCallback(
    (nextPreset?: string, nextLayers?: number) => {
      setMesh(generateMesh(nextPreset ?? preset, nextLayers ?? layers));
    },
    [preset, layers]
  );

  // Spacebar shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName;
      if (e.code === "Space" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        regenerate();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [regenerate]);

  const handleSave = () => {
    if (!mesh) return;
    setLibrary(addToLibrary(mesh));
    showToast("라이브러리에 저장했어요");
  };

  const handleCopy = async () => {
    if (!mesh) return;
    try {
      await navigator.clipboard.writeText(meshToCSS(mesh));
      showToast("CSS 코드를 복사했어요");
    } catch {
      showToast("복사에 실패했어요");
    }
  };

  const handlePNG = () => {
    if (!mesh) return;
    exportMeshToPNG(mesh);
    showToast("PNG 다운로드를 시작했어요");
  };

  const handleApply = (m: Mesh) => {
    setMesh(m);
    setPreset(m.preset);
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("적용했어요");
  };

  const handleDelete = (id: number) => {
    setLibrary(removeFromLibrary(id));
    showToast("삭제했어요");
  };

  return (
    <main className="max-w-page mx-auto px-6 py-6 animate-fade-in">
      {/* Header */}
      <header className="flex items-center justify-between pt-4 pb-14">
        <div className="flex items-center gap-3">
          <div
            className="relative w-8 h-8 rounded-[9px] animate-spin-slow"
            style={{
              background:
                "conic-gradient(from 220deg, #c4b5fd, #f0abfc, #fbbf24, #4ade80, #60a5fa, #c4b5fd)",
              boxShadow: "0 0 30px rgba(196, 181, 253, 0.45)",
            }}
          >
            <div className="absolute inset-1.5 rounded-[5px] bg-ink" />
          </div>
          <span className="font-display font-bold text-[17px] tracking-tight">
            AURORA
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge>Pro</Badge>
          <Button
            onClick={() => showToast("곧 출시됩니다")}
            className="hidden sm:inline-flex"
          >
            Sign in
          </Button>
          <Button variant="primary" onClick={() => showToast("곧 출시됩니다")}>
            Upgrade
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs text-muted-strong mb-6">
          <span
            className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot"
            style={{ boxShadow: "0 0 10px #4ade80" }}
          />
          <span>
            <span className="tabular-nums">{userCount.toLocaleString()}</span>
            명의 디자이너가 사용 중
          </span>
        </div>
        <h1 className="text-[clamp(38px,6vw,68px)] font-extrabold leading-[1.05] tracking-[-0.04em] mb-[18px] text-gradient">
          Mesh Gradients,
          <br />
          just one click away.
        </h1>
        <p className="text-muted text-base max-w-[540px] mx-auto leading-relaxed">
          아름다운 메쉬 그라디언트를 한 번의 클릭으로. 마음에 드는 색감을 골라
          CSS로 복사하거나 PNG로 다운받으세요.
        </p>
      </section>

      <Canvas mesh={mesh} onClick={() => regenerate()} />

      <Controls
        preset={preset}
        layers={layers}
        onPreset={(p) => {
          setPreset(p);
          regenerate(p, layers);
        }}
        onLayers={setLayers}
        onLayersCommit={(v) => regenerate(preset, v)}
        onSave={handleSave}
        onCopy={handleCopy}
        onPNG={handlePNG}
      />

      <Library
        items={library}
        onApply={handleApply}
        onDownload={(m) => {
          exportMeshToPNG(m);
          showToast("PNG 다운로드를 시작했어요");
        }}
        onDelete={handleDelete}
      />

      <footer className="py-8 border-t text-center text-muted text-xs space-y-1.5">
        <div>Made with care · Aurora Studio © 2026</div>
        <div className="flex gap-4 justify-center">
          {["Docs", "Changelog", "Pricing", "Twitter"].map((label) => (
            <button
              key={label}
              onClick={() => showToast("곧 출시됩니다")}
              className="hover:text-white transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
      </footer>

      <Toast
        message={toast.msg}
        visible={toast.visible}
        onHide={() => setToast((t) => ({ ...t, visible: false }))}
      />
    </main>
  );
}
