"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  FolderKanban,
  HomeIcon,
  Phone,
  Send,
  Sparkles,
  UserRound,
  Wrench,
} from "lucide-react";

const desktopItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

const mobileItems = [
  { icon: HomeIcon, label: "Home", href: "#hero" },
  { icon: UserRound, label: "About", href: "#about" },
  { icon: Wrench, label: "Skills", href: "#skills" },
  { icon: FolderKanban, label: "Projects", href: "#projects" },
  { icon: BarChart3, label: "GitHub", href: "#github" },
  { icon: Phone, label: "Contact", href: "#contact" },
];

export function SiteNavigation() {
  const sectionIds = useMemo(
    () => ["hero", ...desktopItems.map((item) => item.href.slice(1))],
    [],
  );
  const [activeId, setActiveId] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function updateScrollState() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

      setScrollProgress(Math.min(1, Math.max(0, progress)));
      setIsScrolled(window.scrollY > 16);

      const currentSection = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .findLast((section) => section!.getBoundingClientRect().top <= 120);

      if (currentSection?.id) {
        setActiveId(currentSection.id);
      }
    }

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [sectionIds]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-40 transition duration-300 ${
          isScrolled
            ? "border-b border-white/10 bg-ink/72 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
            : "border-b border-white/5 bg-ink/28 backdrop-blur-xl"
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-cyan via-mint to-violet transition-[width]"
          style={{ width: `${scrollProgress * 100}%` }}
        />
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a
            href="#hero"
            aria-label="Go to home"
            className="group flex min-w-0 items-center gap-3 text-white"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/14 bg-white/[0.06] text-sm font-black shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition group-hover:border-cyan/45 group-hover:text-cyan">
              AA
            </span>
            <span className="hidden leading-none sm:block">
              <span className="block text-[0.68rem] font-black uppercase tracking-[0.22em]">Akash</span>
              <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/45">
                AI Product Engineer
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.045] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl md:flex">
            {desktopItems.map((item) => {
              const id = item.href.slice(1);
              const isActive = activeId === id;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-white text-ink shadow-[0_10px_30px_rgba(255,255,255,0.12)]"
                      : "text-white/[0.62] hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <a href="#contact" className="liquid-button min-h-10 px-4 py-2">
            <Send className="relative z-10 h-4 w-4" />
            <span className="relative z-10 hidden sm:inline">Discuss a Project</span>
            <Sparkles className="relative z-10 hidden h-4 w-4 lg:block" />
          </a>
        </nav>
      </header>

      <nav
        aria-label="Mobile section navigation"
        className="fixed inset-x-3 bottom-3 z-50 rounded-full border border-white/15 bg-ink/78 px-2 py-2 shadow-glass backdrop-blur-2xl md:hidden"
      >
        <div className="grid grid-cols-6 gap-1">
          {mobileItems.map(({ icon: Icon, label, href }) => {
            const isActive = activeId === href.slice(1);

            return (
              <a
                key={label}
                href={href}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                className={`relative grid h-12 place-items-center rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan ${
                  isActive
                    ? "bg-white text-ink shadow-[0_10px_28px_rgba(255,255,255,0.14)]"
                    : "text-white/[0.62] hover:bg-white/[0.08] hover:text-cyan"
                }`}
              >
                <Icon className="h-5 w-5" />
                {isActive ? (
                  <span className="absolute bottom-1 h-1 w-1 rounded-full bg-cyan" />
                ) : null}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
