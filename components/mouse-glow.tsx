"use client";

import { useEffect, useRef } from "react";

export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const onMove = (event: PointerEvent) => {
      node.animate(
        {
          transform: `translate(${event.clientX - 96}px, ${event.clientY - 96}px)`,
        },
        { duration: 360, fill: "forwards", easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-20 h-48 w-48 rounded-full bg-cyan/[0.075] blur-2xl"
    />
  );
}
