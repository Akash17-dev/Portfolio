import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Github, Linkedin } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Background blur reveal threshold
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll progress percentage calculation
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (windowHeight > 0) {
        const progress = (window.scrollY / windowHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Intro", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Expertise", href: "#expertise" },
    { name: "Projects", href: "#projects" },
    { name: "Journey", href: "#journey" },
    { name: "GitHub", href: "#github" },
    { name: "Vision", href: "#vision" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Header container */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo / Personal Brand */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="group flex items-center gap-3 pointer-events-auto"
            id="brand-logo"
          >
            <div className="w-8 h-8 rounded-full border border-accent-cyan/60 flex items-center justify-center bg-transparent group-hover:border-accent-purple group-hover:rotate-18 *:transition-all duration-500">
              <span className="font-syne text-[11px] text-white tracking-widest font-extrabold group-hover:text-accent-cyan">AL</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xs font-bold tracking-[0.25em] text-white group-hover:text-accent-cyan transition-colors duration-300">
                AKASH LUCKY
              </span>
              <span className="font-mono text-[9px] text-white/40 tracking-wider">
                BUILDER // AI & DEV
              </span>
            </div>
          </a>

          {/* Desktop Navigation Link Cluster */}
          <nav className="hidden lg:flex items-center gap-1 glassmorphism px-3 py-1.5 rounded-full shadow-lg">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-display font-medium text-[11px] tracking-widest uppercase px-3 py-1.5 rounded-full text-white/70 hover:text-white transition-all duration-300 relative group"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-0 bg-white/5 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 z-0" />
              </a>
            ))}
          </nav>

          {/* Call to action & Social items */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              referrerPolicy="no-referrer"
              className="p-2 border border-white/5 rounded-full hover:border-accent-cyan text-white/60 hover:text-accent-cyan transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              referrerPolicy="no-referrer"
              className="p-2 border border-white/5 rounded-full hover:border-accent-purple text-white/60 hover:text-accent-purple transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="relative px-4 py-2 border border-accent-cyan/40 hover:border-accent-cyan rounded-full font-mono text-[10px] tracking-wider text-accent-cyan font-bold overflow-hidden group scale-btn"
            >
              <span className="relative z-10 flex items-center gap-1 uppercase">
                Connect
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-accent-cyan scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300 z-0 opacity-10" />
            </a>
          </div>

          {/* Mobile menu triggers */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="px-3 py-1.5 border border-accent-cyan/40 rounded-full font-mono text-[9px] tracking-wider text-accent-cyan"
            >
              STRIKE //
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-white/10 rounded-full bg-white/5 text-white hover:text-accent-cyan hover:border-accent-cyan/40 transition-colors pointer-events-auto"
              aria-label="Toggle menu"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Dynamic Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-black/90 z-40 lg:hidden flex flex-col justify-center px-8"
          >
            <div className="space-y-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -40, opacity: 0 }}
                  transition={{ delay: index * 0.05, ease: "easeOut" }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="font-syne text-4xl font-extrabold uppercase tracking-wide hover:text-accent-cyan text-white block transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Footer coordinates inside drawer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 left-8 right-8 border-t border-white/5 pt-8 flex justify-between text-mono text-xs text-white/40"
            >
              <div>
                <p>AKASH LUCKY</p>
                <p className="text-[10px]">AI ENGINEER // DEVELOPER</p>
              </div>
              <div className="flex gap-4">
                <a href="https://github.com" target="_blank" referrerPolicy="no-referrer" className="hover:text-accent-cyan transition-colors">GH</a>
                <a href="https://linkedin.com" target="_blank" referrerPolicy="no-referrer" className="hover:text-accent-purple transition-colors">LN</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
