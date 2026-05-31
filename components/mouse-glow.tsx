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
          transform: `translate(${event.clientX - 240}px, ${event.clientY - 240}px)`,
        },
        { duration: 700, fill: "forwards", easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-20 h-[30rem] w-[30rem] rounded-full bg-cyan/10 blur-3xl"
    />
  );
}
