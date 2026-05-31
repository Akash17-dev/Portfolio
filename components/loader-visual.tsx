"use client";

import { motion } from "framer-motion";
import { ShaderBackdrop } from "@/components/shader-backdrop";

export function LoaderVisual({ progress = 88 }: { progress?: number }) {
  return (
    <div className="loader-shell" role="status" aria-label="Loading Akash Aakula portfolio">
      <style jsx>{`
        .loader-shell {
          position: relative;
          display: flex;
          min-height: 100vh;
          width: 100vw;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: hidden;
          background:
            radial-gradient(circle at 18% 18%, rgba(110, 231, 255, 0.2), transparent 24rem),
            radial-gradient(circle at 76% 72%, rgba(136, 255, 200, 0.13), transparent 26rem),
            radial-gradient(circle at 52% 48%, rgba(183, 156, 255, 0.16), transparent 30rem),
            #05060a;
        }

        .loader-shell::before {
          position: absolute;
          inset: 0;
          content: "";
          opacity: 0.36;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 4.75rem 4.75rem;
          mask-image: radial-gradient(circle at center, black 0%, transparent 68%);
        }

        .loader-shell::after {
          position: absolute;
          inset: 50% 0 auto;
          height: 1px;
          content: "";
          transform: translateY(-50%);
          background: linear-gradient(90deg, transparent, rgba(110, 231, 255, 0.34), rgba(183, 156, 255, 0.2), transparent);
          animation: loader-pulse 2s ease-in-out infinite;
        }

        .shader-layer {
          position: absolute;
          inset: -8%;
          z-index: 0;
        }

        .loader-glow {
          position: absolute;
          inset: 14% 18%;
          z-index: 0;
          border-radius: 999px;
          background:
            radial-gradient(circle at 50% 50%, rgba(110, 231, 255, 0.22), transparent 38%),
            radial-gradient(circle at 58% 58%, rgba(136, 255, 200, 0.13), transparent 42%);
          filter: blur(34px);
          animation: loader-breathe 4s ease-in-out infinite;
        }

        .loader-core {
          position: relative;
          z-index: 2;
          display: flex;
          width: min(28rem, calc(100vw - 2rem));
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .loader-orb {
          position: relative;
          display: grid;
          width: 8rem;
          height: 8rem;
          place-items: center;
          border-radius: 999px;
          background:
            radial-gradient(circle at 38% 28%, rgba(255, 255, 255, 0.3), transparent 15%),
            radial-gradient(circle, rgba(110, 231, 255, 0.2), transparent 62%),
            rgba(8, 13, 20, 0.58);
          border: 1px solid rgba(255, 255, 255, 0.22);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.32),
            inset 0 -1.5rem 3rem rgba(110, 231, 255, 0.08),
            0 0 48px rgba(110, 231, 255, 0.42);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          animation: loader-float 2.7s ease-in-out infinite;
        }

        .loader-orb::before,
        .loader-orb::after {
          position: absolute;
          inset: -0.85rem;
          content: "";
          border: 1px solid rgba(110, 231, 255, 0.22);
          border-radius: inherit;
          animation: loader-ring 2s ease-out infinite;
        }

        .loader-orb::after {
          animation-delay: 0.7s;
          border-color: rgba(183, 156, 255, 0.18);
        }

        .loader-monogram {
          color: #f7fbff;
          font-size: 2.35rem;
          font-weight: 800;
          letter-spacing: 0;
          line-height: 1;
          text-shadow:
            0 0 22px rgba(110, 231, 255, 0.75),
            0 0 44px rgba(183, 156, 255, 0.38);
        }

        .loader-monogram span {
          color: #88ffc8;
        }

        .loader-title {
          margin: 2rem 0 0.35rem;
          color: #f7fbff;
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        .loader-title span {
          color: #6ee7ff;
        }

        .loader-subtitle {
          margin: 0 0 2rem;
          color: rgba(212, 235, 243, 0.76);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 0.625rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          animation: loader-pulse 1.7s ease-in-out infinite;
        }

        .loader-progress-track {
          width: min(18rem, 72vw);
          height: 3px;
          overflow: hidden;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(2, 6, 23, 0.72);
          box-shadow: 0 0 28px rgba(110, 231, 255, 0.12);
        }

        .loader-progress-bar {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #6ee7ff, #88ffc8, #b79cff);
          box-shadow: 0 0 24px rgba(110, 231, 255, 0.72);
        }

        .loader-meta {
          display: flex;
          width: min(18rem, 72vw);
          align-items: center;
          justify-content: space-between;
          margin-top: 0.75rem;
          padding-inline: 0.25rem;
          color: rgba(212, 235, 243, 0.72);
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
          font-size: 0.625rem;
        }

        .loader-percent {
          color: #f7fbff;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.14em;
        }

        @keyframes loader-float {
          50% {
            transform: translateY(-0.65rem);
          }
        }

        @keyframes loader-pulse {
          50% {
            opacity: 0.45;
          }
        }

        @keyframes loader-breathe {
          50% {
            opacity: 0.66;
            transform: scale(1.08);
          }
        }

        @keyframes loader-ring {
          to {
            opacity: 0;
            transform: scale(1.32);
          }
        }
      `}</style>
      <div className="shader-layer">
        <ShaderBackdrop className="h-full w-full opacity-90 mix-blend-screen" />
      </div>
      <div className="loader-glow" />
      <div className="loader-core">
        <motion.div
          className="loader-orb"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="loader-monogram">A<span>A</span></div>
        </motion.div>
        <h1 className="loader-title">
          Akash Aakula<span>.</span>Portfolio
        </h1>
        <p className="loader-subtitle">System Core Initializing...</p>
        <div className="loader-progress-track">
          <motion.div
            className="loader-progress-bar"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
        <div className="loader-meta">
          <span>VERIFYING MODULES</span>
          <span className="loader-percent">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
