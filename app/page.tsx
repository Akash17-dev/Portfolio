import {
  ArrowUpRight,
  Bot,
  Boxes,
  BrainCircuit,
  CalendarDays,
  Code2,
  Database,
  Download,
  Github,
  Linkedin,
  Mail,
  Rocket,
  Send,
  ServerCog,
  Sparkles,
  Terminal,
  Twitter,
} from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";
import { ContactForm } from "@/components/contact-form";
import { MagneticButton } from "@/components/magnetic-button";
import { MotionDiv, MotionSection } from "@/components/motion";
import { MouseGlow } from "@/components/mouse-glow";
import { ScrollAnimations } from "@/components/scroll-animations";
import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/tilt-card";
import { RoleSwitcher } from "@/components/role-switcher";
import { HeroOrbLoader } from "@/components/hero-orb-loader";
import { OrbitFace } from "@/components/orbit-face";
import { AshClouds } from "@/components/ash-clouds";

const roles = [
  "AI/ML Engineer",
  "Data Scientist",
  "Full Stack Developer",
  "Linux & DevOps Enthusiast",
];

const stats = [
  ["Projects Built", 18, "+"],
  ["GitHub Contributions", 1240, "+"],
  ["Technologies Learned", 42, "+"],
  ["Startup Ideas Developed", 9, "+"],
];

const skills = [
  {
    title: "AI & ML",
    icon: BrainCircuit,
    tone: "from-cyan/25 to-violet/15",
    items: ["Python", "TensorFlow", "PyTorch", "Scikit-Learn", "Pandas"],
  },
  {
    title: "Data Science",
    icon: Database,
    tone: "from-mint/20 to-cyan/10",
    items: ["Data Analysis", "Data Visualization", "Machine Learning", "Statistics"],
  },
  {
    title: "Development",
    icon: Code2,
    tone: "from-violet/25 to-coral/10",
    items: ["React", "Next.js", "TypeScript", "Node.js"],
  },
  {
    title: "DevOps",
    icon: ServerCog,
    tone: "from-coral/20 to-cyan/10",
    items: ["Linux", "Docker", "Kubernetes", "Nginx", "CI/CD"],
  },
  {
    title: "Cloud & Database",
    icon: Boxes,
    tone: "from-cyan/20 to-mint/10",
    items: ["Firebase", "PostgreSQL", "Neon", "AWS"],
  },
];

const projects = [
  {
    title: "Open Source Vercel Alternative",
    description: "A deployment platform with GitHub-connected releases and containerized previews.",
    features: ["GitHub Integration", "Docker Deployments", "Logs", "Custom Domains"],
    accent: "cyan",
  },
  {
    title: "AI Fitness Coach",
    description: "Adaptive workouts, habit loops, analytics, and social motivation for fitness teams.",
    features: ["AI Workouts", "Gamification", "Leaderboards", "Analytics"],
    accent: "mint",
  },
  {
    title: "Smart Attendance System",
    description: "A fast attendance layer for classrooms and teams using recognition and QR workflows.",
    features: ["Face Recognition", "QR Attendance", "Reports", "Dashboard"],
    accent: "violet",
  },
  {
    title: "AI Employee Retention Platform",
    description: "Workforce sentiment intelligence with predictive insights for people teams.",
    features: ["Feedback Analysis", "Employee Insights", "AI Predictions"],
    accent: "coral",
  },
];

const timeline = [
  ["2024", "Started Data Science Journey"],
  ["2025", "Built AI Applications"],
  ["2025", "Learned Linux & DevOps"],
  ["2026", "Building Startup-Level Products"],
];

const githubStats = [
  ["Total Repositories", 32],
  ["Contributions", 1240],
  ["Stars", 86],
  ["Followers", 58],
  ["Most Used Languages", 6],
];

const ventures = [
  "Open Source Deployment Platform",
  "AI Fitness Ecosystem",
  "Smart Attendance SaaS",
  "AI HR Analytics Platform",
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent text-white">
      <ScrollAnimations />
      <MouseGlow />
      <AshClouds />
      <AuroraBackground />
      <Header />

      <section id="hero" className="relative min-h-screen overflow-hidden pt-24 before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(5,8,14,0.56),rgba(5,8,14,0.18)_54%,rgba(255,255,255,0.05))] before:content-['']">
        <div className="section-shell grid min-h-[calc(100vh-6rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <MotionDiv
            className="relative z-10"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pill mb-7 inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan" />
              Startup-grade AI systems and web products
            </div>
            <h1 className="max-w-5xl text-balance text-6xl font-black leading-[0.9] tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl">
              AKASH
              <span className="block bg-gradient-to-r from-cyan via-white to-violet bg-clip-text text-transparent">
                AAKULA
              </span>
            </h1>
            <div className="mt-6 min-h-12 text-2xl font-semibold text-white/[0.86] sm:text-3xl">
              <RoleSwitcher roles={roles} />
            </div>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/[0.66]">
              Building intelligent products across AI, machine learning, data science,
              modern web engineering, Linux systems, and DevOps automation.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href="#projects" icon={<ArrowUpRight className="h-4 w-4" />}>
                View Projects
              </MagneticButton>
              <MagneticButton href="/resume.pdf" icon={<Download className="h-4 w-4" />} variant="muted">
                Download Resume
              </MagneticButton>
              <MagneticButton href="#contact" icon={<Mail className="h-4 w-4" />} variant="ghost">
                Contact Me
              </MagneticButton>
            </div>
          </MotionDiv>

          <div className="relative h-[430px] min-h-[430px] overflow-hidden rounded-[2rem] border border-white/20 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.24),transparent_16rem),radial-gradient(circle_at_64%_80%,rgba(110,231,255,0.16),transparent_18rem),linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.02))] shadow-glass lg:h-[590px]">
            <HeroOrbLoader />
            <OrbitFace />
            <FloatingCard className="left-0 top-12" title="AI Pipeline" value="96%" icon={<Bot />} />
            <FloatingCard className="bottom-12 right-2" title="Deploy Ready" value="24/7" icon={<Terminal />} />
          </div>
        </div>
      </section>

      <MotionSection id="about" className="section-shell" data-reveal>
        <SectionHeading eyebrow="About" title="Intelligent products with a founder's pace." />
        <div className="glass-panel overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:p-12">
          <p className="max-w-4xl text-2xl font-semibold leading-tight text-white sm:text-4xl">
            I&apos;m passionate about building intelligent products using Artificial
            Intelligence, Machine Learning, Data Science, Linux, DevOps, and Modern
            Web Technologies.
          </p>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/[0.64]">
            I enjoy transforming ideas into scalable products and startup-grade
            solutions.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(([label, value, suffix]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.05] p-5">
                <div className="text-4xl font-black text-white">
                  <AnimatedCounter value={Number(value)} suffix={String(suffix)} />
                </div>
                <p className="mt-2 text-sm text-white/[0.58]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="skills" className="section-shell" data-reveal>
        <SectionHeading eyebrow="Skills" title="A full-stack AI builder toolkit." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {skills.map((skill, index) => (
            <MotionDiv
              key={skill.title}
              className={`glass-panel group rounded-[1.6rem] bg-gradient-to-br ${skill.tone} p-5 transition duration-300 hover:-translate-y-2`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08 }}
            >
              <skill.icon className="h-7 w-7 text-cyan" />
              <h3 className="mt-5 text-xl font-bold">{skill.title}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span key={item} className="rounded-full bg-white/[0.08] px-3 py-1.5 text-xs text-white/[0.72]">
                    {item}
                  </span>
                ))}
              </div>
            </MotionDiv>
          ))}
        </div>
      </MotionSection>

      <MotionSection id="projects" className="section-shell" data-reveal>
        <SectionHeading eyebrow="Featured Projects" title="Products shaped like real startups." />
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <TiltCard key={project.title} className="glass-panel min-h-[330px] rounded-[2rem] p-6">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="mb-6 h-36 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
                    <div className={`h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_12rem),linear-gradient(135deg,var(--tw-gradient-stops))] ${
                      project.accent === "cyan"
                        ? "from-cyan/35 via-violet/20 to-transparent"
                        : project.accent === "mint"
                          ? "from-mint/30 via-cyan/15 to-transparent"
                          : project.accent === "violet"
                            ? "from-violet/35 via-coral/15 to-transparent"
                            : "from-coral/30 via-cyan/15 to-transparent"
                    }`} />
                  </div>
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="mt-3 text-white/[0.62]">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.features.map((feature) => (
                      <span key={feature} className="pill px-3 py-1 text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-8 flex gap-3">
                  <MagneticButton href="#" icon={<ArrowUpRight className="h-4 w-4" />}>
                    Live Demo
                  </MagneticButton>
                  <MagneticButton href="#" icon={<Github className="h-4 w-4" />} variant="ghost">
                    GitHub
                  </MagneticButton>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </MotionSection>

      <MotionSection id="github" className="section-shell" data-reveal>
        <SectionHeading eyebrow="GitHub Dashboard" title="Signals from the build graph." />
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {githubStats.map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="text-3xl font-black text-white">
                  <AnimatedCounter value={Number(value)} suffix={label === "Most Used Languages" ? "" : "+"} />
                </div>
                <p className="mt-2 text-sm text-white/[0.58]">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-5">
            {["TypeScript", "Python", "Shell", "SQL", "JavaScript"].map((lang, index) => (
              <div key={lang} className="h-3 overflow-hidden rounded-full bg-white/10">
                <MotionDiv
                  className="h-full rounded-full bg-gradient-to-r from-cyan via-mint to-violet"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${94 - index * 12}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection id="experience" className="section-shell" data-reveal>
        <SectionHeading eyebrow="Experience Timeline" title="From learning curve to product velocity." />
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-cyan via-violet to-transparent sm:left-1/2" />
          {timeline.map(([year, title], index) => (
            <MotionDiv
              key={`${year}-${title}`}
              className={`relative mb-6 flex ${index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="glass-panel ml-12 w-full rounded-3xl p-5 sm:ml-0 sm:w-[46%]">
                <CalendarDays className="h-5 w-5 text-cyan" />
                <div className="mt-4 text-sm text-white/[0.52]">{year}</div>
                <h3 className="mt-1 text-xl font-bold">{title}</h3>
              </div>
            </MotionDiv>
          ))}
        </div>
      </MotionSection>

      <MotionSection id="ventures" className="section-shell" data-reveal>
        <SectionHeading eyebrow="Startup Ventures" title="Ambitious concepts ready for productization." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {ventures.map((venture, index) => (
            <TiltCard key={venture} className="glass-panel rounded-[1.6rem] p-6">
              <Rocket className="h-7 w-7 text-mint" />
              <h3 className="mt-6 text-xl font-bold">{venture}</h3>
              <p className="mt-3 text-sm leading-6 text-white/[0.58]">
                Market-aware product thinking, AI-assisted workflows, scalable systems,
                and clean execution.
              </p>
              <div className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/[0.36]">
                Venture 0{index + 1}
              </div>
            </TiltCard>
          ))}
        </div>
      </MotionSection>

      <MotionSection id="contact" className="section-shell pb-14" data-reveal>
        <SectionHeading eyebrow="Contact" title="Let's build something unusually good." />
        <div className="glass-panel grid gap-8 rounded-[2rem] p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h3 className="text-3xl font-black tracking-[-0.03em]">Akash Aakula</h3>
            <p className="mt-4 max-w-md text-white/[0.62]">
              Available for AI products, full stack builds, DevOps systems, and founder-led prototypes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                [Github, "GitHub"],
                [Linkedin, "LinkedIn"],
                [Twitter, "X/Twitter"],
                [Mail, "Email"],
              ].map(([Icon, label]) => (
                <a
                  key={String(label)}
                  href="#"
                  aria-label={String(label)}
                  className="grid h-12 w-12 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-white/70 transition hover:border-cyan/40 hover:text-cyan"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </MotionSection>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-5 pb-10 text-sm text-white/[0.42] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>© 2026 Akash Aakula. Built with Next.js, Three.js, and liquid glass details.</p>
        <a href="#hero" className="transition hover:text-cyan">Back to top</a>
      </footer>
    </main>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/15 bg-[#071321]/45 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a href="#hero" className="text-sm font-black tracking-[0.22em] text-white">
          AKASH
        </a>
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 md:flex">
          {["About", "Skills", "Projects", "GitHub", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="rounded-full px-4 py-2 text-sm text-white/[0.62] transition hover:bg-white/[0.08] hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>
        <a href="#contact" className="liquid-button min-h-10 px-4 py-2">
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Start</span>
        </a>
      </nav>
    </header>
  );
}

function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-14%] top-[-12%] h-[38rem] w-[38rem] animate-aurora rounded-full bg-cyan/20 blur-3xl" />
      <div className="absolute right-[-12%] top-[4%] h-[34rem] w-[34rem] animate-aurora rounded-full bg-sky-200/20 blur-3xl [animation-delay:2s]" />
      <div className="absolute bottom-[-18%] left-[22%] h-[36rem] w-[42rem] animate-aurora rounded-full bg-white/16 blur-3xl [animation-delay:4s]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,14,0.5),transparent_42%,rgba(217,238,249,0.16)_100%)]" />
    </div>
  );
}

function FloatingCard({
  className,
  title,
  value,
  icon,
}: {
  className: string;
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <MotionDiv
      className={`glass-panel absolute z-10 hidden w-44 rounded-3xl p-4 shadow-glow lg:block ${className}`}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="flex items-center gap-3 text-cyan">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 [&_svg]:h-5 [&_svg]:w-5">
          {icon}
        </div>
        <span className="text-xs uppercase tracking-[0.18em] text-white/[0.42]">{title}</span>
      </div>
      <div className="mt-4 text-3xl font-black">{value}</div>
    </MotionDiv>
  );
}
