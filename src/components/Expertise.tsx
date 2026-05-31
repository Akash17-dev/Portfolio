import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  BrainCircuit,
  BarChart3,
  Code2,
  Terminal,
  Cloud,
  ChevronRight,
} from "lucide-react";

interface CardProps {
  title: string;
  description: string;
  skills: string[];
  icon: React.ComponentType<{ className?: string }>;
  accentColor: "cyan" | "purple" | "white";
}

function SpotlightCard({ title, description, skills, icon: Icon, accentColor }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowColor =
    accentColor === "cyan"
      ? "rgba(0, 212, 255, 0.12)"
      : accentColor === "purple"
      ? "rgba(124, 58, 237, 0.12)"
      : "rgba(255, 255, 255, 0.08)";

  const borderHighlight =
    accentColor === "cyan"
      ? "group-hover:border-accent-cyan/30"
      : accentColor === "purple"
      ? "group-hover:border-accent-purple/30"
      : "group-hover:border-white/20";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`glassmorphism rounded-2xl p-6 md:p-8 border border-white/5 relative overflow-hidden transition-colors duration-500 group cursor-none`}
    >
      {/* Absolute positional radial glow linked to cursor coordinate */}
      {isHovered && (
        <div
          className="absolute pointer-events-none select-none rounded-full"
          style={{
            width: "350px",
            height: "350px",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 65%)`,
            left: `${coords.x - 175}px`,
            top: `${coords.y - 175}px`,
            transition: "opacity 150ms ease",
          }}
        />
      )}

      {/* Glow dot overlay */}
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[48px] pointer-events-none opacity-20 transition-opacity duration-500 group-hover:opacity-40 ${
        accentColor === "cyan" ? "bg-accent-cyan" : accentColor === "purple" ? "bg-accent-purple" : "bg-white"
      }`} />

      {/* Card Content container */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="space-y-4">
          
          {/* Accent Header Icon */}
          <div className={`w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center transition-all duration-500 ${
            accentColor === "cyan"
              ? "bg-accent-cyan/5 text-accent-cyan group-hover:bg-accent-cyan/10 group-hover:scale-105"
              : accentColor === "purple"
              ? "bg-accent-purple/5 text-accent-purple group-hover:bg-accent-purple/10 group-hover:scale-105"
              : "bg-white/5 text-white group-hover:bg-white/10 group-hover:scale-105"
          }`}>
            <Icon className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h3 className="font-syne text-xl font-bold text-white tracking-wide group-hover:text-white transition-colors duration-200">
              {title}
            </h3>
            <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Dynamic skills stack tags */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-1">
            Core Utilities
            <ChevronRight className="w-2.5 h-2.5" />
          </p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="font-mono text-[9.5px] uppercase tracking-wider px-2 py-0.5 border border-white/5 bg-white/2 rounded text-zinc-300 group-hover:border-white/10 group-hover:text-white transition-colors duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Expertise() {
  const categories = [
    {
      title: "AI & Machine Learning",
      description: "Designing agentic flows, deep pipelines, fine-tuning neural architectures, prompt mechanics, and building systems on Gemini and LLM gateways.",
      skills: ["PyTorch", "TensorFlow", "Gemini API", "HuggingFace", "LangChain", "LLMs"],
      icon: BrainCircuit,
      accentColor: "cyan" as const,
    },
    {
      title: "Data Science & Viz",
      description: "Managing big data aggregation pipelines, developing forecasting estimators, analyzing statistical anomalies, and building custom D3 graphs.",
      skills: ["Pandas", "Scikit-Learn", "D3.js", "BigQuery", "Analytics", "NumPy"],
      icon: BarChart3,
      accentColor: "purple" as const,
    },
    {
      title: "Full Stack Development",
      description: "Developing robust client and server code, microservices setups, database modeling, and real-time communication modules.",
      skills: ["React", "Express TS", "Node.js", "TypeScript", "SQL/GraphQL", "MongoDB"],
      icon: Code2,
      accentColor: "white" as const,
    },
    {
      title: "Linux & Terminal Logic",
      description: "Hardening security postures, optimizing Linux clusters, shell scripting automation, and deploying self-contained environment runtimes.",
      skills: ["Bash Security", "Docker Compose", "Nginx Server", "Linux systems", "Kernel basics"],
      icon: Terminal,
      accentColor: "cyan" as const,
    },
    {
      title: "Cloud & Deployments",
      description: "Deploying workloads to cloud run engines, managing high-availability SQL databases, and setting up automated CI/CD security validation pipelines.",
      skills: ["GCP", "Cloud Run", "AWS", "Firebase", "DevOps", "GitHub Actions"],
      icon: Cloud,
      accentColor: "purple" as const,
    },
  ];

  return (
    <section
      id="expertise"
      className="relative min-h-screen py-24 md:py-32 bg-bg-dark border-t border-white/5 overflow-hidden z-10 px-6 md:px-12"
    >
      {/* Background spotlights */}
      <div className="absolute top-[10%] left-0 w-[40vw] h-[40vw] rounded-full bg-accent-cyan/5 blur-[140px] pointer-events-none select-none" />
      <div className="absolute bottom-[10%] right-0 w-[40vw] h-[40vw] rounded-full bg-accent-purple/5 blur-[140px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-[1px] bg-accent-cyan" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-cyan font-bold">
              SYSTEM CAPABILITIES
            </span>
          </div>
          <h2 className="font-syne text-4xl md:text-6xl font-extrabold uppercase text-white tracking-tight leading-none">
            ENGINEERING CAPACITIES<span className="text-accent-cyan">.</span>
          </h2>
        </div>

        {/* Dynamic Grid Layout (Bento Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Big Spotlight Area (AI) spanning 2 columns for bento aesthetic */}
          <div className="md:col-span-2 lg:col-span-2">
            <SpotlightCard
              title={categories[0].title}
              description={categories[0].description}
              skills={categories[0].skills}
              icon={categories[0].icon}
              accentColor={categories[0].accentColor}
            />
          </div>

          <div className="md:col-span-1 lg:col-span-1">
            <SpotlightCard
              title={categories[1].title}
              description={categories[1].description}
              skills={categories[1].skills}
              icon={categories[1].icon}
              accentColor={categories[1].accentColor}
            />
          </div>

          <div className="md:col-span-1 lg:col-span-1">
            <SpotlightCard
              title={categories[2].title}
              description={categories[2].description}
              skills={categories[2].skills}
              icon={categories[2].icon}
              accentColor={categories[2].accentColor}
            />
          </div>

          <div className="md:col-span-1 lg:col-span-1">
            <SpotlightCard
              title={categories[3].title}
              description={categories[3].description}
              skills={categories[3].skills}
              icon={categories[3].icon}
              accentColor={categories[3].accentColor}
            />
          </div>

          <div className="md:col-span-1 lg:col-span-1 md:col-span-2 lg:col-span-1">
            <SpotlightCard
              title={categories[4].title}
              description={categories[4].description}
              skills={categories[4].skills}
              icon={categories[4].icon}
              accentColor={categories[4].accentColor}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
