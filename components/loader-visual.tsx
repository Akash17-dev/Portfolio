"use client";

export function LoaderVisual() {
  return (
    <div className="loader-stage" role="status" aria-label="Loading Akash Aakula portfolio">
      <style jsx>{`
        .loader-stage {
          position: relative;
          display: grid;
          width: min(28rem, calc(100vw - 2rem));
          min-height: 31rem;
          place-items: center;
          padding: 2rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 2rem;
          background:
            radial-gradient(circle at 50% 26%, rgba(255, 255, 255, 0.22), transparent 13rem),
            linear-gradient(180deg, rgba(125, 211, 252, 0.22), rgba(255, 255, 255, 0.06) 48%, rgba(5, 13, 24, 0.42));
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.38),
            0 34px 120px rgba(3, 10, 18, 0.55);
          backdrop-filter: blur(18px) saturate(140%);
        }

        .loader-stage::before {
          position: absolute;
          inset: -20%;
          content: "";
          background:
            conic-gradient(from 120deg, transparent, rgba(110, 231, 255, 0.22), transparent 28%),
            radial-gradient(circle at 50% 100%, rgba(255, 255, 255, 0.24), transparent 34%);
          animation: loader-aurora 5s ease-in-out infinite alternate;
        }

        .loader-sky {
          position: relative;
          display: grid;
          width: 17rem;
          height: 17rem;
          place-items: center;
          perspective: 900px;
        }

        .loader-cloud {
          position: absolute;
          border-radius: 999px;
          background:
            radial-gradient(circle at 24% 48%, rgba(255, 255, 255, 0.86), transparent 45%),
            radial-gradient(circle at 58% 45%, rgba(210, 232, 245, 0.68), transparent 52%),
            radial-gradient(circle at 82% 56%, rgba(123, 167, 195, 0.3), transparent 58%);
          filter: blur(10px);
          opacity: 0.7;
          animation: loader-cloud-drift 5s ease-in-out infinite alternate;
        }

        .loader-cloud-a {
          bottom: 1.6rem;
          left: -1.8rem;
          width: 14rem;
          height: 4rem;
        }

        .loader-cloud-b {
          top: 2.4rem;
          right: -1.7rem;
          width: 11rem;
          height: 3.5rem;
          opacity: 0.48;
          animation-delay: -1.4s;
        }

        .loader-cloud-c {
          right: -2.2rem;
          bottom: 4.7rem;
          width: 9rem;
          height: 3rem;
          opacity: 0.42;
          animation-delay: -2.6s;
        }

        .loader-orbit {
          position: relative;
          display: grid;
          width: 12rem;
          height: 12rem;
          place-items: center;
          transform-style: preserve-3d;
          animation: loader-float 3.8s ease-in-out infinite;
        }

        .loader-orbit-ring {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.42);
          border-radius: 999px;
          box-shadow: 0 0 34px rgba(110, 231, 255, 0.28);
        }

        .loader-ring-one {
          inset: 0.5rem;
          transform: rotateX(68deg) rotateZ(18deg);
          animation: loader-spin 3.2s linear infinite;
        }

        .loader-ring-two {
          inset: 1.6rem;
          transform: rotateX(72deg) rotateZ(116deg);
          animation: loader-spin 4.6s linear infinite reverse;
        }

        .loader-crystal {
          position: relative;
          display: grid;
          width: 5.8rem;
          height: 5.8rem;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.36);
          border-radius: 1.5rem;
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.34), rgba(110, 231, 255, 0.14) 38%, rgba(5, 14, 25, 0.36)),
            rgba(255, 255, 255, 0.08);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            0 0 48px rgba(110, 231, 255, 0.34);
          transform: rotateX(58deg) rotateZ(45deg);
          animation: loader-crystal 2.8s ease-in-out infinite alternate;
        }

        .loader-crystal span {
          color: white;
          font-size: 2.2rem;
          font-weight: 900;
          letter-spacing: -0.08em;
          text-shadow: 0 0 22px rgba(110, 231, 255, 0.8);
          transform: rotateZ(-45deg) rotateX(-58deg);
        }

        .loader-satellite {
          position: absolute;
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 999px;
          background: #6ee7ff;
          box-shadow: 0 0 28px rgba(110, 231, 255, 0.95);
        }

        .loader-satellite-one {
          top: 2rem;
          right: 3rem;
          animation: loader-pulse 1.4s ease-in-out infinite;
        }

        .loader-satellite-two {
          bottom: 2.5rem;
          left: 2.6rem;
          background: #ffffff;
          animation: loader-pulse 1.4s ease-in-out infinite 0.5s;
        }

        .loader-copy {
          position: relative;
          z-index: 1;
          margin-top: -0.5rem;
          text-align: center;
        }

        .loader-copy p {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: -0.04em;
        }

        .loader-copy span {
          display: block;
          margin-top: 0.45rem;
          color: rgba(255, 255, 255, 0.62);
          font-size: 0.9rem;
        }

        .loader-progress {
          position: relative;
          z-index: 1;
          width: min(18rem, 72vw);
          height: 0.35rem;
          margin-top: 1.4rem;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
        }

        .loader-progress::after {
          display: block;
          width: 45%;
          height: 100%;
          content: "";
          border-radius: inherit;
          background: linear-gradient(90deg, transparent, #ffffff, #6ee7ff);
          animation: loader-progress 1.25s ease-in-out infinite;
        }

        @keyframes loader-aurora {
          to {
            transform: translate3d(4%, -3%, 0) rotate(8deg) scale(1.08);
          }
        }

        @keyframes loader-cloud-drift {
          to {
            transform: translate3d(1.2rem, -0.35rem, 0) scale(1.04);
          }
        }

        @keyframes loader-float {
          50% {
            transform: translateY(-0.8rem) rotateY(10deg);
          }
        }

        @keyframes loader-spin {
          to {
            rotate: 360deg;
          }
        }

        @keyframes loader-crystal {
          to {
            transform: rotateX(58deg) rotateZ(405deg) scale(1.06);
          }
        }

        @keyframes loader-pulse {
          50% {
            opacity: 0.45;
            transform: scale(1.7);
          }
        }

        @keyframes loader-progress {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(240%);
          }
        }
      `}</style>
      <div className="loader-sky">
        <div className="loader-cloud loader-cloud-a" />
        <div className="loader-cloud loader-cloud-b" />
        <div className="loader-cloud loader-cloud-c" />
        <div className="loader-orbit">
          <div className="loader-orbit-ring loader-ring-one" />
          <div className="loader-orbit-ring loader-ring-two" />
          <div className="loader-crystal">
            <span>A</span>
          </div>
          <div className="loader-satellite loader-satellite-one" />
          <div className="loader-satellite loader-satellite-two" />
        </div>
      </div>
      <div className="loader-copy">
        <p>Akash Aakula</p>
        <span>Launching above the cloud layer</span>
      </div>
      <div className="loader-progress" />
    </div>
  );
}
