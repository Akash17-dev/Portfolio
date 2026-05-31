"use client";

import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const unsubscribe = rounded.on("change", setDisplay);
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 1.4, ease: "easeOut" });
    return controls.stop;
  }, [count, inView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}
