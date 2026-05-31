"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LoaderVisual } from "@/components/loader-visual";

export function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setProgress(100);
      const timer = window.setTimeout(() => setVisible(false), 450);
      return () => window.clearTimeout(timer);
    }

    const interval = window.setInterval(() => {
      setProgress((current) => {
        const next = current + Math.floor(Math.random() * 8) + 3;

        if (next >= 100) {
          window.clearInterval(interval);
          window.setTimeout(() => setVisible(false), 450);
          return 100;
        }

        return next;
      });
    }, 45);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#071321]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <LoaderVisual progress={progress} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
