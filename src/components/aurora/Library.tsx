"use client";

import { meshToBackgroundImage } from "@/lib/mesh";
import type { Mesh } from "@/lib/types";

export function Library({
  items,
  onApply,
  onDownload,
  onDelete,
}: {
  items: Mesh[];
  onApply: (m: Mesh) => void;
  onDownload: (m: Mesh) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <section className="mb-16">
      <div className="flex justify-between items-baseline mb-5">
        <h2 className="text-lg font-bold tracking-tight">Your Library</h2>
        <span className="text-xs text-muted tabular-nums">
          {items.length}개의 저장된 그라디언트
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-3">
        {items.length === 0 ? (
          <div className="col-span-full py-14 px-6 border-[1.5px] border-dashed rounded-[14px] text-center text-muted text-sm leading-relaxed">
            아직 저장된 그라디언트가 없어요.
            <br />
            마음에 드는 걸 만들면 <strong className="text-white">Save</strong>{" "}
            버튼으로 저장하세요.
          </div>
        ) : (
          items.map((mesh) => (
            <div
              key={mesh.id}
              className="group aspect-video rounded-xl border cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-strong relative overflow-hidden animate-pop-in"
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundColor: mesh.base,
                  backgroundImage: meshToBackgroundImage(mesh),
                }}
              />
              <div className="absolute inset-0 bg-black/45 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <IconBtn label="적용" onClick={() => onApply(mesh)}>
                  <CheckIcon />
                </IconBtn>
                <IconBtn label="다운로드" onClick={() => onDownload(mesh)}>
                  <DownloadIcon />
                </IconBtn>
                <IconBtn
                  label="삭제"
                  danger
                  onClick={() => mesh.id !== undefined && onDelete(mesh.id)}
                >
                  <TrashIcon />
                </IconBtn>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function IconBtn({
  children,
  label,
  danger,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  danger?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      title={label}
      onClick={onClick}
      className={`w-[34px] h-[34px] inline-flex items-center justify-center rounded-[9px] bg-white/15 text-white border border-white/20 cursor-pointer transition-all hover:scale-110 ${
        danger
          ? "hover:bg-red-500/55 hover:border-red-500/70"
          : "hover:bg-white/25"
      }`}
    >
      {children}
    </button>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
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
function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}
