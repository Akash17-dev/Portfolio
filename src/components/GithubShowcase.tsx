import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Star, GitFork, BookOpen, Flame, Activity, Terminal } from "lucide-react";
import { GithubRepo } from "../types";

export default function GithubShowcase() {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  // Simulated metrics
  const metrics = {
    totalContributions: "2,842",
    streakDays: "112 days",
    publicRepos: "32",
    activityRate: "94.2%",
  };

  // Simulated active repositories
  const repos: GithubRepo[] = [
    {
      name: "jarvis-os-agent",
      description: "Low-overhead OS supervisor microservice featuring background intent-mapping and local scheduling.",
      stars: 148,
      forks: 24,
      language: "Python",
      languageColor: "#3572A5",
      url: "https://github.com",
    },
    {
      name: "visual-posture-engine",
      description: "High-speed joints posture analyzer utilizing browser local MediaPipe tracking arrays and skeletal geometry calculations.",
      stars: 82,
      forks: 12,
      language: "TypeScript",
      languageColor: "#3178C6",
      url: "https://github.com",
    },
    {
      name: "chronos-stream-compiler",
      description: "Blistering telemetry queuing agent written in Rust to compile hundreds of sensor entries in microsecond frames.",
      stars: 194,
      forks: 35,
      language: "Rust",
      languageColor: "#DEA584",
      url: "https://github.com",
    },
  ];

  // Simulated languages with percentage
  const languages = [
    { name: "TypeScript", percent: 42, color: "bg-accent-cyan" },
    { name: "Python", percent: 35, color: "bg-accent-purple" },
    { name: "Rust", percent: 15, color: "bg-[#DEA584]" },
    { name: "Shell/Bash", percent: 8, color: "bg-[#89e051]" },
  ];

  // Generate 24 weeks or 168 days of contribution map (5 rows x 34 columns etc. Let's make a grid for look and feel)
  const columns = 28;
  const rows = 7;
  const days = Array.from({ length: columns * rows }, (_, idx) => {
    // Generate dates working backwards
    const date = new Date();
    date.setDate(date.getDate() - (columns * rows - idx));
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Create random weights where weekends have lower contributions
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    let baseRand = Math.random();
    if (isWeekend) baseRand *= 0.3; // Lower weight on weekend

    let count = 0;
    if (baseRand > 0.88) count = Math.floor(Math.random() * 8) + 6;
    else if (baseRand > 0.6) count = Math.floor(Math.random() * 5) + 2;
    else if (baseRand > 0.3) count = 1;

    return {
      date: formattedDate,
      count,
    };
  });

  return (
    <section
      id="github"
      className="relative min-h-screen py-24 md:py-32 bg-bg-dark border-t border-white/5 overflow-hidden z-10 px-6 md:px-12"
    >
      <div className="absolute top-[20%] right-0 w-[35vw] h-[35vw] bg-accent-cyan/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-[1px] bg-accent-cyan" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-cyan font-bold">
              GITHUB COMPASS SYSTEM
            </span>
          </div>
          <h2 className="font-syne text-4xl md:text-6xl font-extrabold uppercase text-white tracking-tight leading-none">
            OPEN SOURCE SYSTEM<span className="text-accent-cyan">.</span>
          </h2>
        </div>

        {/* Triple Grid Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left panel cols spanning 8: Contribution tracker & Repos */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Simulation Calendar Tracker */}
            <div className="glassmorphism p-6 md:p-8 rounded-2xl border border-white/5 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Github className="w-5 h-5 text-accent-cyan" />
                  <h3 className="font-display font-medium text-sm text-white">
                    git_commit_ledger // akash-lucky
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded bg-zinc-900 border border-white/5" />
                  <div className="w-2.5 h-2.5 rounded bg-emerald-950/40" />
                  <div className="w-2.5 h-2.5 rounded bg-emerald-800/60" />
                  <div className="w-2.5 h-2.5 rounded bg-emerald-600" />
                  <div className="w-2.5 h-2.5 rounded bg-accent-cyan" />
                  <span>More</span>
                </div>
              </div>

              {/* Grid block */}
              <div className="relative">
                <div className="grid grid-flow-col grid-rows-7 gap-1.5 justify-between">
                  {days.map((day, idx) => {
                    let tileColor = "bg-[#0b0c10]/40 border border-white/5";
                    if (day.count >= 8) tileColor = "bg-[#00D4FF]";
                    else if (day.count >= 5) tileColor = "bg-[#047857]";
                    else if (day.count >= 2) tileColor = "bg-[#065f46]";
                    else if (day.count === 1) tileColor = "bg-[#064e3b]/80";

                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-${
                          day.count > 0 ? "sm" : ""
                        } transition-transform duration-100 hover:scale-[1.3] hover:relative hover:z-10 cursor-none ${tileColor}`}
                      />
                    );
                  })}
                </div>

                {/* Floating tooltip overlay */}
                <AnimatePresence>
                  {hoveredDay && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: -45, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-1/2 -translate-x-1/2 -top-4 glassmorphism px-3 py-1.5 rounded-lg border border-white/10 text-center font-mono pointer-events-none select-none"
                    >
                      <p className="text-[10px] text-zinc-400">{hoveredDay.date}</p>
                      <p className="text-[10px] text-accent-cyan font-bold">
                        {hoveredDay.count === 0 ? "No" : hoveredDay.count} contributions
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="pt-2 border-t border-white/5 flex flex-wrap gap-x-6 gap-y-3 font-mono text-[10px] text-zinc-500 justify-between">
                <p>DEV LEVEL: PLATINUM // HARD WORKING</p>
                <p>SYS_STREAK: {metrics.streakDays} ACCORDING</p>
              </div>
            </div>

            {/* Repos Cards List */}
            <div className="space-y-4">
              <h3 className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em]">
                ACTIVE PUBLIC REPO STACKS
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {repos.map((repo) => (
                  <motion.a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    whileHover={{ y: -4 }}
                    className="glassmorphism p-5 rounded-xl border border-white/5 flex flex-col justify-between hover:border-white/12 transition-colors duration-300 cursor-none group"
                    data-cursor="click"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-accent-cyan font-display font-medium text-[13px]">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span className="truncate pr-1 group-hover:underline">{repo.name}</span>
                      </div>
                      <p className="font-sans text-[11px] leading-relaxed text-zinc-400 font-light">
                        {repo.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[9px] text-zinc-500">
                      <div className="flex items-center gap-1">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: repo.languageColor }}
                        />
                        <span>{repo.language}</span>
                      </div>
                      <div className="flex gap-2.5">
                        <span className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 text-yellow-500" />
                          {repo.stars}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <GitFork className="w-3 h-3 text-zinc-500" />
                          {repo.forks}
                        </span>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel side stats cols spanning 4 */}
          <div className="lg:col-span-4 space-y-6">
            {/* Top Stats column */}
            <div className="glassmorphism p-6 rounded-2xl border border-white/5 space-y-5">
              <h3 className="font-display font-medium text-sm text-white border-b border-white/5 pb-3">
                git_terminal_metrics // LOGS
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Activity className="w-4 h-4 text-accent-cyan" />
                    <span className="font-mono text-[10px] uppercase tracking-wider">Public Commits</span>
                  </div>
                  <span className="font-syne font-bold text-lg text-white">
                    {metrics.totalContributions}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Flame className="w-4 h-4 text-accent-purple" />
                    <span className="font-mono text-[10px] uppercase tracking-wider">Active Streak</span>
                  </div>
                  <span className="font-syne font-bold text-lg text-white">
                    {metrics.streakDays}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <BookOpen className="w-4 h-4 text-white/60" />
                    <span className="font-mono text-[10px] uppercase tracking-wider">Index Repos</span>
                  </div>
                  <span className="font-syne font-bold text-lg text-white">
                    {metrics.publicRepos}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Terminal className="w-4 h-4 text-accent-cyan" />
                    <span className="font-mono text-[10px] uppercase tracking-wider">Sync Integrity</span>
                  </div>
                  <span className="font-syne font-bold text-lg text-white">
                    {metrics.activityRate}
                  </span>
                </div>
              </div>
            </div>

            {/* Languages Graph Block */}
            <div className="glassmorphism p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="font-display font-medium text-sm text-white">
                active_syntax_balance // STACK
              </h3>

              <div className="space-y-4 pt-1">
                {languages.map((lang) => (
                  <div key={lang.name} className="space-y-1.5">
                    <div className="flex justify-between font-mono text-[10px]">
                      <span className="text-zinc-300">{lang.name}</span>
                      <span className="text-zinc-500 font-bold">{lang.percent}%</span>
                    </div>
                    {/* Visual bar container */}
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${lang.color} rounded-full`}
                        style={{ width: `${lang.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
