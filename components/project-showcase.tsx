"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Eye, Github, X } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";

export type Project = {
  title: string;
  description: string;
  features: string[];
  accent: string;
  demoUrl?: string;
  repoUrl?: string;
  images?: string[];
  preview?: string;
  details?: string[];
  stack?: string[];
  caseStudy?: [string, string][];
};

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!activeProject) return;

    const previousOverflow = document.body.style.overflow;
    const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveProject(null);
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = closeButtonRef.current?.closest("[role='dialog']");
      if (!dialog) return;

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"),
      ).filter((element) => !element.hasAttribute("disabled"));

      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);
      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousActiveElement?.focus();
    };
  }, [activeProject]);

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <TiltCard key={project.title} className="glass-panel min-h-[330px] rounded-[2rem] p-5">
            <div className="flex h-full flex-col justify-between">
              <div>
                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="group/preview mb-5 block w-full overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-2 text-left"
                  aria-label={`Preview ${project.title}`}
                >
                  {project.images?.[0] ? (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-950/70">
                      <img
                        src={project.images[0]}
                        alt={`${project.title} preview`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top transition duration-500 group-hover/preview:scale-[1.03]"
                      />
                      <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/72 via-black/10 to-transparent p-4 opacity-100">
                        <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white/85 backdrop-blur">
                          Full preview
                        </span>
                        <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-slate-950 transition group-hover/preview:scale-105">
                          <Eye className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className={`aspect-[16/9] rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_12rem),linear-gradient(135deg,var(--tw-gradient-stops))] ${
                      project.accent === "cyan"
                        ? "from-cyan/35 via-violet/20 to-transparent"
                        : project.accent === "mint"
                          ? "from-mint/30 via-cyan/15 to-transparent"
                          : project.accent === "violet"
                            ? "from-violet/35 via-coral/15 to-transparent"
                            : "from-coral/30 via-cyan/15 to-transparent"
                    }`} />
                  )}
                </button>

                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/[0.62]">
                  {project.preview ?? project.description}
                </p>
                {project.caseStudy?.length ? (
                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {project.caseStudy.map(([label, value]) => (
                      <div key={label} className="rounded-2xl border border-white/10 bg-black/15 p-3">
                        <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan">{label}</div>
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/[0.58]">{value}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.features.slice(0, 5).map((feature) => (
                    <span key={feature} className="pill px-3 py-1 text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="liquid-button bg-cyan/10"
                >
                  <span className="relative z-10">View Case Study</span>
                  <Eye className="relative z-10 h-4 w-4" />
                </button>
                <a href={project.demoUrl ?? "https://github.com/Akash17-dev"} className="liquid-button bg-white/[0.06]">
                  <span className="relative z-10">Live Demo</span>
                  <ArrowUpRight className="relative z-10 h-4 w-4" />
                </a>
                <a href={project.repoUrl ?? "https://github.com/Akash17-dev"} className="liquid-button bg-transparent">
                  <span className="relative z-10">GitHub</span>
                  <Github className="relative z-10 h-4 w-4" />
                </a>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {activeProject ? (
                <motion.div
                  className="fixed inset-0 z-[120] flex min-h-dvh items-center justify-center overflow-y-auto bg-black/92 p-4 backdrop-blur-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveProject(null)}
                >
                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${activeProject.title} project preview`}
                    className="relative max-h-[80dvh] w-full max-w-3xl overflow-hidden rounded-[1.25rem] border border-white/16 bg-[#020617] shadow-[0_28px_120px_rgba(0,0,0,0.86)]"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      ref={closeButtonRef}
                      type="button"
                      onClick={() => setActiveProject(null)}
                      aria-label="Close preview"
                      className="absolute right-4 top-4 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-slate-950 text-white/70 shadow-[0_10px_32px_rgba(0,0,0,0.55)] transition hover:text-cyan"
                    >
                      <X className="h-5 w-5" />
                    </button>

                    <div className="max-h-[80dvh] overflow-y-auto p-4 pr-16 sm:p-5 sm:pr-20">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan">Project Preview</p>
                        <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">
                          {activeProject.title}
                        </h3>
                      </div>

                      {activeProject.images?.[0] ? (
                        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black p-2">
                          <div className="mx-auto aspect-[16/9] max-h-[15rem] overflow-hidden rounded-xl bg-black">
                            <img
                              src={activeProject.images[0]}
                              alt={`${activeProject.title} full screenshot`}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-contain"
                            />
                          </div>
                        </div>
                      ) : null}

                      <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                        <div>
                          <h4 className="text-base font-bold text-white">Overview</h4>
                          <p className="mt-2 text-sm leading-6 text-white/[0.68]">{activeProject.description}</p>

                          {activeProject.details?.length ? (
                            <div className="mt-4 grid gap-2 sm:grid-cols-2">
                              {activeProject.details.map((detail) => (
                                <div key={detail} className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 text-xs leading-5 text-white/[0.66]">
                                  {detail}
                                </div>
                              ))}
                            </div>
                          ) : null}

                          {activeProject.caseStudy?.length ? (
                            <div className="mt-5 grid gap-2 sm:grid-cols-2">
                              {activeProject.caseStudy.map(([label, value]) => (
                                <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan">{label}</div>
                                  <p className="mt-2 text-xs leading-5 text-white/[0.66]">{value}</p>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>

                        <div>
                          <h4 className="text-base font-bold text-white">Stack & Links</h4>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {(activeProject.stack ?? activeProject.features).map((item) => (
                              <span key={item} className="pill px-3 py-1 text-xs">
                                {item}
                              </span>
                            ))}
                          </div>
                          <div className="mt-5 grid grid-cols-2 gap-3">
                            <a href={activeProject.demoUrl ?? "https://github.com/Akash17-dev"} className="liquid-button w-full bg-cyan/10 px-4">
                              <span className="relative z-10">Live Demo</span>
                              <ArrowUpRight className="relative z-10 h-4 w-4" />
                            </a>
                            <a href={activeProject.repoUrl ?? "https://github.com/Akash17-dev"} className="liquid-button w-full bg-transparent px-4">
                              <span className="relative z-10">View Code</span>
                              <Github className="relative z-10 h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
