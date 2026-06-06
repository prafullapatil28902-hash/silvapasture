import { ReactNode } from "react";

/**
 * Glassmorphic card. Designed to sit on dark forest/obsidian backgrounds.
 */
export default function Glass({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[3px] border border-ivory/10 bg-ivory/[0.04] backdrop-blur-md shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] ${className}`}
    >
      {children}
    </div>
  );
}
