import { HTMLAttributes } from "react";

export function Badge({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`px-2.5 py-1 rounded-full bg-gradient-to-br from-[#c4b5fd] to-[#f0abfc] text-[#0a0a0f] text-[10px] font-bold uppercase tracking-wider ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
