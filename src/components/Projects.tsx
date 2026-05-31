import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../types";
import {
  ExternalLink,
  Cpu,
  Bookmark,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  X,
} from "lucide-react";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const projectsList: Project[] = [
    {
      id: "jarvis-ai",
      title: "Jarvis AI Workspace Assistant",
      subtitle: "Autonomous OS Workstation Orchestration",
      problem: "Standard developers lose up to 40 minutes daily switching across workspace windows, project notes, scheduling tabs, and terminal terminals.",
      solution: "Engineered an offline-first desktop supervisor daemon that binds file directories, live tasks, and Google Calendar, serving instantaneous workspace intent mapping.",
      techStack: ["HuggingFace", "Python", "Gemini API", "Electron", "SQLite", "Node.js"],
      keyFeatures: [
        "Desktop background OS daemon hooks & shortcut mappings",
        "Deep semantic memory indexing files & calendar cues",
        "Voice trigger parsing",
        "Encrypted sandbox credentials vault"
      ],
      results: "Optimized focus blocks, reducing development workspace transition fatigue by 42%.",
      image: "linear-gradient(135deg, #050505 10%, #00D4FF 100%)",
    },
    {
      id: "fitness-coach",
      title: "Real-Time AI Fitness Pose Coach",
      subtitle: "Computer Vision Joint Motion Analyzer",
      problem: "At-home fitness athletes suffer from bad anatomical alignment during weight training, risking joint injuries without posture correction tutors.",
      solution: "Aggregated dynamic computer vision pipelines directly in web frameworks, analyzing live skeletal coordinate math to trigger posture guidance warnings.",
      techStack: ["TypeScript", "MediaPipe Pose", "TensorFlow.js", "Express JS", "MongoDB"],
      keyFeatures: [
        "Vector distance math tracing 33 skeletal joint hubs",
        "0.02s vector calculation speeds directly on the client web",
        "Voice-Synthesized corrective bio-feedback logs",
        "Streak metrics and progressive workout tracker"
      ],
      results: "Assisted 200+ closed testing athletes in establishing precise spine alignment practices.",
      image: "linear-gradient(135deg, #7C3AED 10%, #050505 100%)",
    },
    {
      id: "real-estate",
      title: "Intel Scout: Real Estate Valuation",
      subtitle: "Machine Learning Geographic Trend Modeler",
      problem: "House buyers face unpredictable housing markets where spatial values fluctuate under unseen school ratings, transit maps, and commercial trends.",
      solution: "Created an immersive valuation engine drawing 15 localized market trend indexes, overlaid beautifully with Maps pipelines to predict properties appreciation trajectories.",
      techStack: ["Next.js", "Google Maps SDK", "FastAPI", "Scikit-Learn", "BigQuery"],
      keyFeatures: [
        "High-density geohash heatmap drawing interactive buffers",
        "Linear regression models estimating 5-year spatial worth",
        "Vector-based conversational scout addressing local queries",
        "CSV ledger integration"
      ],
      results: "Raised neighborhood-search selection confidence metrics by 60% for family testers.",
      image: "linear-gradient(135deg, #00D4FF 20%, #7C3AED 90%)",
    },
    {
      id: "employee-attrition",
      title: "Exit Intel: HR Retention Engine",
      subtitle: "Enterprise Talent Predictive Dashboard",
      problem: "Sudden key engineer departures disrupt vital client projects, costing enterprises massive training cash and disrupting software lifecycles.",
      solution: "Engineered an anonymous predictive HR dashboard tracking satisfaction, review dates, and log points through Random Forest trees to signal high departure possibilities.",
      techStack: ["Django", "React", "Pandas", "Scikit-Learn", "PostgreSQL"],
      keyFeatures: [
        "Aggressive forest classifier weighing 20+ workplace factors",
        "Strictly private feedback vault encrypting client entries",
        "Simulated attrition probability slider indicators",
        "Automated knowledge-transfer checklist triggers"
      ],
      results: "Lowered core engineer unexpected enterprise exits by 18% during trial runs.",
      image: "linear-gradient(135deg, #050505 0%, #1a1a1a 100%)",
    },
    {
      id: "data-science-viz",
      title: "Chronos Stream Analytics",
      subtitle: "Ultra-High-Density Real-Time Telemetry Plotter",
      problem: "IoT sensor arrays emit hundreds of signal updates per second, clogging browser standard dashboard visual charts and delaying safety responses.",
      solution: "Built a blistering web visualization engine plotting dense telemetry waves at frame speeds, with custom trigger modules flagging critical variations.",
      techStack: ["TypeScript", "D3.js", "WebSockets", "Rust Engine", "Redis Buffer"],
      keyFeatures: [
        "Dynamic Canvas buffers drawing 10k data coordinates/sec at 60FPS",
        "WebSocket node feeding back telemetry packets without latency",
        "Standard deviation formulas highlighting spike triggers",
        "Automatic dataset compilations"
      ],
      results: "Eliminated browser tracking lag entirely, maximizing network safety monitoring windows.",
      image: "linear-gradient(135deg, #00D4FF 10%, #050505 60%, #7C3AED 100%)",
    },
  ];

  return (
    <>
      <section
        id="projects"
        className="relative min-h-screen py-24 md:py-32 bg-bg-dark border-t border-white/5 overflow-hidden z-10 px-6 md:px-12"
      >
      {/* Background flares */}
      <div className="absolute top-[20%] right-0 w-[45vw] h-[45vw] bg-accent-purple/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[40vw] h-[40vw] bg-accent-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header Title Grid */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-accent-cyan" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-cyan font-bold">
                PORTFOLIO CASE STUDIES
              </span>
            </div>
            <h2 className="font-syne text-4xl md:text-6xl font-extrabold uppercase text-white tracking-tight leading-none">
              FEATURED ENGINEERING<span className="text-accent-cyan">.</span>
            </h2>
          </div>
          <p className="font-sans text-xs md:text-sm text-zinc-400 font-light max-w-sm leading-relaxed">
            Every case represents a rigid solution to a concrete problem, blending high-quality algorithmic math, strict performance guidelines, and elite customer experiences.
          </p>
        </div>

        {/* Modular Grid Panel of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setActiveProject(project)}
              className="glassmorphism rounded-2xl border border-white/5 overflow-hidden group cursor-none relative flex flex-col justify-between"
              style={{ minHeight: "380px" }}
              data-cursor="view"
            >
              {/* Project Card Abstract Background Visual */}
              <div
                className="h-44 w-full relative overflow-hidden transition-transform duration-700 select-none pointer-events-none"
                style={{ background: project.image }}
              >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] group-hover:backdrop-blur-0 transition-all duration-500" />
                <div className="absolute inset-x-6 bottom-4 flex justify-between items-center z-10">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#00D4FF] px-2.5 py-1 bg-black/80 rounded border border-accent-cyan/20">
                    {project.techStack[0]}
                  </span>
                  <span className="text-white/40 text-[10px] font-mono">
                    0{index + 1} {"//"} CASE
                  </span>
                </div>
              </div>

              {/* Title & brief descriptors */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-syne text-xl font-bold text-white group-hover:text-accent-cyan transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="font-sans text-[12px] text-zinc-400 font-light leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>

                {/* Arrow prompt footer indicators */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex gap-1.5 flex-wrap">
                    {project.techStack.slice(0, 3).map((stack) => (
                      <span
                        key={stack}
                        className="font-mono text-[9px] uppercase tracking-wider text-zinc-500"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-accent-cyan border border-white/5 text-white group-hover:text-black flex items-center justify-center transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:-rotate-45 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      {/* Case Study Full Immersive Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl cursor-default"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="glassmorphism w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 p-6 md:p-12 space-y-10 relative scroll-bar shadow-2xl inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Abs Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 p-3 rounded-full bg-white/5 border border-white/5 text-white hover:text-accent-cyan hover:border-accent-cyan/40 transition-colors"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Case Title Section */}
              <div className="space-y-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00D4FF] font-bold block">
                  DETAILED CASE ARCHITECTURE
                </span>
                <h1 className="font-syne text-3xl md:text-5xl font-extrabold uppercase text-white tracking-tight leading-none">
                  {activeProject.title}
                </h1>
                <p className="font-display text-sm text-zinc-400 font-medium">
                  {activeProject.subtitle}
                </p>
              </div>

              {/* Core Case Study Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-t border-white/5 pt-8">
                {/* Left col: Challenge & Solution */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#00D4FF] flex items-center gap-1.5 font-bold">
                      <Bookmark className="w-3 h-3" />
                      THE CHALLENGE
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                      {activeProject.problem}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7C3AED] flex items-center gap-1.5 font-bold">
                      <Cpu className="w-3 h-3" />
                      THE COMPASS SOLUTION
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-zinc-300 font-light leading-relaxed">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>

                {/* Right col: Stack, features, results */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/60 flex items-center gap-1.5 font-bold">
                      <Layers className="w-3 h-3" />
                      ENGINEERING STACK
                    </h3>
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {activeProject.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[9.5px] uppercase tracking-wider px-2 py-1 bg-white/5 border border-white/5 rounded text-white"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent-cyan flex items-center gap-1.5 font-bold">
                      <Sparkles className="w-3 h-3" />
                      KEY CODE FEATURES
                    </h3>
                    <ul className="space-y-1.5">
                      {activeProject.keyFeatures.map((feat, idx) => (
                        <li
                          key={idx}
                          className="font-sans text-[11px] md:text-xs text-zinc-400 font-light flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] mt-1.5 flex-shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-accent-cyan/5 border border-accent-cyan/15 rounded-xl space-y-1">
                    <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#00D4FF] flex items-center gap-1.5 font-bold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      VALIDATED RESULTS
                    </h3>
                    <p className="font-sans text-xs text-zinc-200 mt-1">
                      {activeProject.results}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
