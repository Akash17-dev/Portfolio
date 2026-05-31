"use client";

import Link from "next/link";
import { useRef } from "react";

export function MagneticButton({
  href,
  children,
  icon,
  variant = "default",
}: {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "default" | "muted" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(event: React.MouseEvent<HTMLAnchorElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
  }

  function onLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate(0, 0)";
  }

  const color =
    variant === "default"
      ? "bg-cyan/10"
      : variant === "muted"
        ? "bg-white/[0.06]"
        : "bg-transparent";

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`liquid-button ${color}`}
    >
      <span className="relative z-10">{children}</span>
      {icon ? <span className="relative z-10">{icon}</span> : null}
    </Link>
  );
}
