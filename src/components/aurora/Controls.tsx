"use client";

import { Button } from "@/components/ui/Button";
import { PRESET_LIST, PRESET_LABELS } from "@mock/presets";

export function Controls({
  preset,
  layers,
  onPreset,
  onLayers,
  onLayersCommit,
  onSave,
  onCopy,
  onPNG,
}: {
  preset: string;
  layers: number;
  onPreset: (p: string) => void;
  onLayers: (n: number) => void;
  onLayersCommit: (n: number) => void;
  onSave: () => void;
  onCopy: () => void;
  onPNG: () => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 p-3.5 glass rounded-2xl mb-14 items-center">
      <div className="flex items-center gap-5 flex-wrap md:pl-2">
        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-[0.08em] text-muted font-semibold">
            Style
          </span>
          <div className="flex gap-[2px] p-[3px] bg-black/30 rounded-[10px] border flex-wrap">
            {PRESET_LIST.map((p) => (
              <button
                key={p}
                onClick={() => onPreset(p)}
                className={`px-3 py-1.5 text-xs font-medium rounded-[7px] transition-colors ${
                  preset === p
                    ? "bg-white/10 text-white"
                    : "text-muted hover:text-white"
                }`}
              >
                {PRESET_LABELS[p]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-[0.08em] text-muted font-semibold">
            Layers
          </span>
          <input
            type="range"
            min={3}
            max={8}
            value={layers}
            onChange={(e) => onLayers(parseInt(e.target.value))}
            onMouseUp={(e) =>
              onLayersCommit(parseInt((e.target as HTMLInputElement).value))
            }
            onTouchEnd={(e) =>
              onLayersCommit(parseInt((e.target as HTMLInputElement).value))
            }
            onKeyUp={(e) =>
              onLayersCommit(parseInt((e.target as HTMLInputElement).value))
            }
            className="aurora-slider w-[110px]"
          />
          <span className="text-xs text-muted-strong tabular-nums w-3 font-semibold">
            {layers}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 md:flex gap-1.5 w-full md:w-auto">
        <Button onClick={onSave} className="justify-center">
          <SaveIcon /> Save
        </Button>
        <Button onClick={onCopy} className="justify-center">
          <CopyIcon /> Copy CSS
        </Button>
        <Button variant="primary" onClick={onPNG} className="justify-center">
          <DownloadIcon /> Download PNG
        </Button>
      </div>
    </div>
  );
}

function SaveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}
function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
