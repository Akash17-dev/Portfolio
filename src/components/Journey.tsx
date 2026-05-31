import { motion } from "motion/react";
import { Milestone } from "../types";
import {
  Terminal,
  Layers,
  Brain,
  Award,
  Github,
  Rocket,
  Milestone as MilestoneIcon,
} from "lucide-react";

export default function Journey() {
  const achievements: Milestone[] = [
    {
      id: "j-linux",
      title: "Learning Linux & Base logic",
      location: "Local Sandbox & Terminal Root",
      date: "2022 // REVEAL",
      description: "Dived deeply into Unix operating logic, automated scripts using secure bash workflows, managed local cron systems, and learned performance optimization parameters.",
      iconName: "terminal",
      category: "sysdev",
    },
    {
      id: "j-fs",
      title: "Building Full Stack Architectures",
      location: "Web Node Networks",
      date: "2023 // SCALE",
      description: "Structured modular responsive SPAs. Bound Express routing systems, integrated secure database schemas, and refined high-retrieval web sockets.",
      iconName: "layers",
      category: "fs",
    },
    {
      id: "j-ai",
      title: "Pioneering Machine Intelligence",
      location: "Deep Learning Clusters",
      date: "2024 // EVOLVE",
      description: "Translated raw regression math into deep learning layers, worked with transformer mechanisms, and created interactive agents using Gemini models.",
      iconName: "brain",
      category: "ai",
    },
    {
      id: "j-hacks",
      title: "High-Pressure Hackathons",
      location: "Regional Events & Arenas",
      date: "2025 // COMPETE",
      description: "Competed in rapid 36-hour developer sprints. Developed, validated, and successfully pitched prototype projects targeting workflow friction.",
      iconName: "award",
      category: "hacks",
    },
    {
      id: "j-open",
      title: "Open Source Contribution",
      location: "Global Repositories",
      date: "2025 // DISTRIBUTE",
      description: "Contributed server wrappers, streamlined Docker templates, and robust documentation files to the public software community.",
      iconName: "github",
      category: "open",
    },
    {
      id: "j-startup",
      title: "Future Startup Blueprints",
      location: "Ventures Incubator",
      date: "2026 // HORIZON",
      description: "Engineering autonomous agentic pipelines to empower corporate teams to handle server maintenance schedules without technical bottleneck friction.",
      iconName: "rocket",
      category: "future",
    },
  ];

  // Helper to fetch matching icon component dynamically
  const getIcon = (name: string) => {
    switch (name) {
      case "terminal":
        return <Terminal className="w-5 h-5 text-accent-cyan" />;
      case "layers":
        return <Layers className="w-5 h-5 text-accent-purple" />;
      case "brain":
        return <Brain className="w-5 h-5 text-accent-cyan" />;
      case "award":
        return <Award className="w-5 h-5 text-accent-purple" />;
      case "github":
        return <Github className="w-5 h-5 text-white" />;
      case "rocket":
        return <Rocket className="w-5 h-5 text-accent-cyan animate-pulse" />;
      default:
        return <MilestoneIcon className="w-5 h-5 text-zinc-400" />;
    }
  };

  return (
    <section
      id="journey"
      className="relative min-h-screen py-24 md:py-32 bg-bg-dark border-t border-white/5 overflow-hidden z-10 px-6 md:px-12"
    >
      {/* Background shadows */}
      <div className="absolute top-[30%] left-0 w-[40vw] h-[40vw] bg-accent-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-0 w-[40vw] h-[40vw] bg-accent-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div className="flex flex-col mb-20">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-[1px] bg-accent-cyan" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-cyan font-bold">
              THE DEVELOPMENT THREAD
            </span>
          </div>
          <h2 className="font-syne text-4xl md:text-6xl font-extrabold uppercase text-white tracking-tight leading-none">
            ENGINEERING TIMELINE<span className="text-accent-cyan">.</span>
          </h2>
        </div>

        {/* Vertical Timeline container */}
        <div className="relative">
          {/* Central Guide Track Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] -translate-x-[0.5px] bg-white/5" />
          <div className="absolute left-4 md:left-1/2 top-0 h-[40%] bottom-[60%] w-[1px] -translate-x-[0.5px] bg-gradient-to-b from-accent-cyan via-accent-purple to-transparent opacity-50" />

          {/* Timeline Items list */}
          <div className="space-y-16">
            {achievements.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`flex flex-col md:flex-row relative ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Outer Hub core dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full border border-white/10 bg-black -translate-x-[15.5px] flex items-center justify-center z-20">
                    <div className={`w-3 h-3 rounded-full ${
                      item.category === "sysdev" || item.category === "ai" || item.category === "future"
                        ? "bg-accent-cyan shadow-[0_0_10px_rgba(0,212,255,0.6)]"
                        : "bg-accent-purple shadow-[0_0_10px_rgba(124,58,237,0.6)]"
                    }`} />
                  </div>

                  {/* Main card box info */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isEven ? -50 : 50,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`pl-12 md:pl-0 w-full md:w-[45%] ${
                      isEven ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <div className="glassmorphism p-6 md:p-8 rounded-2xl border border-white/5 space-y-4 hover:border-white/10 transition-colors duration-400 group relative">
                      
                      {/* Floating accent icon */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-accent-cyan font-bold tracking-widest bg-accent-cyan/5 border border-accent-cyan/15 px-3 py-1 rounded">
                          {item.date}
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                          {getIcon(item.iconName)}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-syne text-lg font-bold text-white group-hover:text-accent-cyan transition-colors duration-200">
                          {item.title}
                        </h3>
                        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                          {item.location}
                        </p>
                      </div>

                      <p className="font-sans text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
