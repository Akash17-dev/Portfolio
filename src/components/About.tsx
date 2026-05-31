import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Shield, BrainCircuit, Cpu, Database, GitBranch } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

// Custom Counter that counts to the value when seen in viewport
function ScrollCounter({ value, suffix = "", duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="font-syne font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function About() {
  const containerRef = useRef(null);

  const pillars = [
    {
      title: "AI and Machine Learning",
      description: "Developing agentic tools, fine-tuning modern neural structures, and implementing intelligent conversational tools powered by models like Gemini.",
      icon: BrainCircuit,
      color: "border-accent-cyan bg-accent-cyan/5 text-accent-cyan",
    },
    {
      title: "Data Science & Analysis",
      description: "Cleaning and processing big data pipelines to extract forecasting insights and visualize complex signals into intuitive real-time metrics dashboards.",
      icon: Database,
      color: "border-accent-purple bg-accent-purple/5 text-accent-purple",
    },
    {
      title: "Linux and DevOps Security",
      description: "Automating zero-downtime CI/CD docker integrations, and hardening cloud server nodes with deep knowledge of Linux terminals.",
      icon: Shield,
      color: "border-zinc-800 bg-zinc-900/50 text-white/80",
    },
    {
      title: "Full-Stack Development",
      description: "Designing end-to-end applications utilizing high-speed React SPAs, Node architectures, and safe microservices.",
      icon: Cpu,
      color: "border-accent-cyan bg-accent-cyan/5 text-accent-cyan",
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-32 bg-bg-dark border-t border-white/5 overflow-hidden z-10 px-6 md:px-12"
    >
      {/* Background glow shadow */}
      <div className="absolute right-0 top-1/4 w-[35vw] h-[35vw] rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section title header */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-[1px] bg-accent-cyan" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-cyan font-bold">
              ABOUT THE BUILDER
            </span>
          </div>
          <h2 className="font-syne text-4xl md:text-6xl font-extrabold uppercase text-white tracking-tight leading-none">
            ENGINEERING INTENTIONS<span className="text-accent-cyan">.</span>
          </h2>
        </div>

        {/* Story details layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Narrative description column */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="font-display font-medium text-xl md:text-2xl text-white/90 leading-snug tracking-wide">
              "We don't just build configurations. We model intelligent pathways to bridge human intentions and high-scale technical systems."
            </h3>

            <p className="font-sans text-sm md:text-base text-zinc-400 font-light leading-relaxed">
              I am Akash Lucky, a dedicated AI engineer, tech system architect, and full-stack solver. Grounded by a deep technical curiosity and love for optimization, I cultivate complex computing landscapes, working at the crossroad of deep learning protocols and production-grade software engines.
            </p>

            <p className="font-sans text-sm md:text-base text-zinc-400 font-light leading-relaxed">
              My journey began deeply in terminal logic and Unix environments, expanding rapidly into distributed web nodes, data pipeline analysis, and finally agentic model engineering. This multi-layered experience empowers me to execute clean, server-side actions, design flawless client views, and train systems that don't just run—they adapt.
            </p>

            {/* Simulated Live Grid Panel */}
            <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glassmorphism p-5 rounded-xl border border-white/5 flex flex-col justify-center">
                <ScrollCounter value={30} suffix="+" />
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mt-1">
                  Projects Built
                </span>
              </div>

              <div className="glassmorphism p-5 rounded-xl border border-white/5 flex flex-col justify-center">
                <ScrollCounter value={22} suffix="+" />
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mt-1">
                  Core Technologies
                </span>
              </div>

              <div className="glassmorphism p-5 rounded-xl border border-white/5 flex flex-col justify-center">
                <ScrollCounter value={2500} suffix="+" />
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mt-1">
                  GitHub Commits
                </span>
              </div>

              <div className="glassmorphism p-5 rounded-xl border border-white/5 flex flex-col justify-center">
                <ScrollCounter value={12} suffix="+" />
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mt-1">
                  Hackathons
                </span>
              </div>
            </div>
          </div>

          {/* Pillars Column */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em] mb-4">
              SPECIALIZATIONS // PERSPECTIVES
            </h4>

            {pillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                  className="glassmorphism p-5 rounded-xl border border-white/5 flex gap-4 items-start relative group"
                >
                  <div className={`p-2.5 rounded-lg border ${item.color} flex-shrink-0 group-hover:rotate-6 transition-all duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-display font-medium text-sm text-white group-hover:text-accent-cyan transition-colors duration-200">
                      {item.title}
                    </h5>
                    <p className="font-sans text-[12px] text-zinc-400 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
