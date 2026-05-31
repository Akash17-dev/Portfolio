import { motion } from "motion/react";
import { ArrowDownRight, Sparkles, Terminal } from "lucide-react";

export default function Hero() {
  const nameFirst = "AKASH";
  const nameLast = "LUCKY";

  // Framer motion variants for staggering letter entries
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 120, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }, // Cinematic ease
    },
  };

  const handleScrollToProjects = () => {
    const projectsSection = document.querySelector("#projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center bg-bg-dark overflow-hidden px-6 md:px-12 pt-28 pb-12 z-10"
    >
      {/* Background radial spotlight flare glowing in bottom-right/left */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-accent-cyan/10 blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-1/4 right-10 w-[50vw] h-[50vw] rounded-full bg-accent-purple/5 blur-[160px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center relative">
        
        {/* Floating tech badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full w-max mb-8 backdrop-blur"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent-cyan animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white">
            Available for Core Engineering Roles
          </span>
        </motion.div>

        {/* Master Heading Typography */}
        <div className="relative">
          {/* Big Name Backdrop Stroke Word (Behind Name) */}
          <div className="absolute -top-12 md:-top-24 left-0 right-0 font-syne text-[14vw] font-extrabold uppercase text-white/5 opacity-5 tracking-tight pointer-events-none select-none leading-none">
            CREATIVE AI
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col select-none"
          >
            {/* Akash */}
            <div className="flex flex-wrap overflow-hidden h-[9vw] sm:h-[10vw] md:h-[11vw] items-center">
              {Array.from(nameFirst).map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="font-syne text-[8.5vw] font-extrabold text-white leading-none tracking-tight inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Lucky / Aakula */}
            <div className="flex flex-wrap overflow-hidden h-[9vw] sm:h-[10vw] md:h-[11vw] items-center">
              {Array.from(nameLast).map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="font-syne text-[8.5vw] font-extrabold text-stroke leading-none tracking-tight inline-block"
                  style={{ marginRight: char === " " ? "2rem" : "0" }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                variants={letterVariants}
                className="font-syne text-[8.5vw] font-extrabold text-accent-cyan leading-none tracking-tight select-none"
              >
                .
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* Animated Roles & Core Taglines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
        >
          {/* Tagline sentence */}
          <div className="space-y-4 max-w-md">
            <h2 className="font-display font-medium text-lg text-white tracking-wide">
              BUILDER • ENGINEER • SCIENTIST
            </h2>
            <p className="font-sans text-sm text-zinc-400 font-light leading-relaxed">
              Designing immersive software products, advanced full-stack apps, data architectures, and predictive machine intelligence systems. Located globally, building locally.
            </p>
          </div>

          {/* Interactive Stack Rolling Wheel */}
          <div className="border-l border-white/5 pl-6 py-1 flex flex-col justify-center space-y-2">
            <div className="flex items-center gap-2 font-mono text-[10px] text-accent-cyan uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" />
              Core Competence Stack
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              {["AI Engine", "Full Stack", "Data Science"].map((role, idx) => (
                <span
                  key={role}
                  className={`font-display text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded border ${
                    idx === 0
                      ? "border-accent-cyan bg-accent-cyan/5 text-accent-cyan"
                      : idx === 1
                      ? "border-accent-purple bg-accent-purple/5 text-accent-purple"
                      : "border-zinc-800 bg-zinc-900/50 text-zinc-300"
                  }`}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Prompt / Command stats card */}
          <div className="hidden lg:block border-l border-white/5 pl-6 py-2 font-mono text-zinc-500 text-[10px] space-y-1">
            <p className="text-white/60">SYS_LOG: STATUS ONLINE</p>
            <p>INTEGRATION: GEMINI // AGENTIC</p>
            <p>GRAVITY_WARP: ACTIVE [9.81m/s]</p>
            <p className="text-accent-cyan">LOC: HYDERABAD, IN</p>
          </div>
        </motion.div>

        {/* Action Button cluster */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
          className="mt-12 flex flex-wrap gap-4 items-center"
        >
          {/* Button 1: View Projects */}
          <button
            onClick={handleScrollToProjects}
            className="group px-8 py-4 bg-white hover:bg-transparent border border-white hover:border-accent-cyan rounded-full font-display text-xs font-bold text-black hover:text-accent-cyan tracking-widest uppercase transition-all duration-300 cursor-none relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <ArrowDownRight className="w-4 h-4 group-hover:-rotate-45 transition-transform duration-300" />
            </span>
            <span className="absolute inset-x-0 bottom-0 top-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
          </button>

          {/* Button 2: Contact Me */}
          <button
            onClick={handleScrollToContact}
            className="group px-8 py-4 bg-zinc-950 hover:bg-accent-purple border border-zinc-800 hover:border-accent-purple rounded-full font-display text-xs font-bold text-white tracking-widest uppercase transition-all duration-300 cursor-none relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-1">
              Contact Me
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
          </button>
        </motion.div>
      </div>

      {/* Floating scrolling anchor at bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 select-none">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
          EXPLORE SYSTEMS
        </span>
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-4 h-7 rounded-full border border-white/20 p-1 flex justify-center"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
        </motion.div>
      </div>
    </section>
  );
}
