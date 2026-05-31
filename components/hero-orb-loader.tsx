"use client";

import dynamic from "next/dynamic";

const HeroOrb = dynamic(() => import("@/components/hero-orb"), {
  ssr: false,
  loading: () => <div className="h-[360px] w-full animate-pulse rounded-full bg-white/[0.06]" />,
});

export function HeroOrbLoader() {
  return <HeroOrb />;
}
