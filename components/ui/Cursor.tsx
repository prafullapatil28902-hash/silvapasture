"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) {
      el.style.display = "none";
      return;
    }

    let x = 0,
      y = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.transform = `translate(${x - 5}px, ${y - 5}px) scale(${
        hovering ? 2.6 : 1
      })`;
    };
    let hovering = false;
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      hovering = !!t.closest("a, button, [data-hover]");
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return <div ref={ref} className="custom-cursor" aria-hidden />;
}
