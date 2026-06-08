"use client";

import { useEffect } from "react";

export function Toast({
  message,
  visible,
  onHide,
}: {
  message: string;
  visible: boolean;
  onHide: () => void;
}) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onHide, 2400);
    return () => clearTimeout(timer);
  }, [visible, message, onHide]);

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-2.5 px-[18px] py-3 pl-3.5 rounded-xl border border-strong text-[13px] font-medium backdrop-blur-xl transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{
        background: "rgba(18,18,24,0.95)",
        boxShadow: "0 24px 48px -12px rgba(0,0,0,0.6)",
      }}
    >
      <span className="w-[18px] h-[18px] rounded-full bg-success inline-flex items-center justify-center text-[#0a0a0f] flex-shrink-0">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span>{message}</span>
    </div>
  );
}
