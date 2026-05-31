"use client";

import { useRef } from "react";

export function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(event: React.MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * -9;
    const rotateY = (x / rect.width - 0.5) * 9;
    node.style.setProperty("--shine-x", `${x}px`);
    node.style.setProperty("--shine-y", `${y}px`);
    node.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  }

  function onLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden transition-transform duration-200 ease-out ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--shine-x, 50%) var(--shine-y, 50%), rgba(255,255,255,0.18), transparent 45%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
