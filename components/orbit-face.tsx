"use client";

import { useEffect, useRef } from "react";

export function OrbitFace() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = Math.max(-1, Math.min(1, (event.clientX - centerX) / 260));
        const dy = Math.max(-1, Math.min(1, (event.clientY - centerY) / 220));

        node.style.setProperty("--eye-x", `${dx * 10}px`);
        node.style.setProperty("--eye-y", `${dy * 7}px`);
        node.style.setProperty("--face-x", `${dx * 5}px`);
        node.style.setProperty("--face-y", `${dy * 4}px`);
        node.style.setProperty("--glow-x", `${50 + dx * 18}%`);
        node.style.setProperty("--glow-y", `${42 + dy * 16}%`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="glass-panel pointer-events-none absolute left-1/2 top-1/2 z-10 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-[2.2rem] md:h-64 md:w-64"
      style={{
        transform:
          "translate(calc(-50% + var(--face-x, 0px)), calc(-50% + var(--face-y, 0px)))",
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 rounded-[inherit] opacity-80"
        style={{
          background:
            "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 42%), rgba(110,231,255,0.26), transparent 38%), linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))",
        }}
      />
      <div className="absolute inset-x-9 top-16 flex items-center justify-between md:inset-x-12 md:top-20">
        <Eye />
        <Eye />
      </div>
      <div className="absolute bottom-14 left-1/2 h-5 w-20 -translate-x-1/2 rounded-b-full border-b-2 border-cyan/70 md:bottom-16" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/35 shadow-[0_0_28px_rgba(110,231,255,0.5)]" />
      <div className="absolute -inset-3 rounded-[2.6rem] border border-cyan/10" />
    </div>
  );
}

function Eye() {
  return (
    <div className="relative grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-black/35 shadow-[inset_0_0_18px_rgba(255,255,255,0.08)] md:h-14 md:w-14">
      <div
        className="h-5 w-5 rounded-full bg-cyan shadow-[0_0_24px_rgba(110,231,255,0.85)] transition-transform duration-100 ease-out md:h-6 md:w-6"
        style={{
          transform: "translate(var(--eye-x, 0px), var(--eye-y, 0px))",
        }}
      >
        <div className="ml-1 mt-1 h-2 w-2 rounded-full bg-white/90" />
      </div>
    </div>
  );
}
