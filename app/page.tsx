import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Boxes,
  BrainCircuit,
  CalendarDays,
  Code2,
  Database,
  Download,
  FolderKanban,
  Github,
  HomeIcon,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Rocket,
  Send,
  ServerCog,
  Sparkles,
  Terminal,
  UserRound,
  ShieldCheck,
} from "lucide-react";
import { AnimatedCounter } from "@/components/animated-counter";
import { ContactForm } from "@/components/contact-form";
import { MagneticButton } from "@/components/magnetic-button";
import { MotionDiv, MotionSection } from "@/components/motion";
import { MouseGlow } from "@/components/mouse-glow";
import { ScrollAnimations } from "@/components/scroll-animations";
import { SectionHeading } from "@/components/section-heading";
import { TiltCard } from "@/components/tilt-card";
import { ProjectShowcase, type Project } from "@/components/project-showcase";
import { GitHubDashboard } from "@/components/github-dashboard";
import { RoleSwitcher } from "@/components/role-switcher";
import { HeroOrbLoader } from "@/components/hero-orb-loader";
import { OrbitFace } from "@/components/orbit-face";
import { AshClouds } from "@/components/ash-clouds";
import { ShaderBackdrop } from "@/components/shader-backdrop";

const roles = [
  "AI/ML Engineer",
  "Data Scientist",
  "Full Stack Developer",
  "Cybersecurity Enthusiast",
  "Linux & DevOps Enthusiast",
];

const stats = [
  ["Projects Built", 18, "+"],
  ["GitHub Contributions", 1240, "+"],
  ["Technologies Learned", 42, "+"],
  ["Startup Ideas Developed", 9, "+"],
];

const credibilitySignals = ["AI/ML", "Full-Stack", "Security", "Open Source", "Product UX"];

const aboutDetails = [
  {
    title: "Current Focus",
    description: "Deep learning, secure full-stack architecture, network security, and production-ready AI features.",
  },
  {
    title: "Build Style",
    description: "Clean interfaces, practical automation, strong data handling, and products that solve real local problems.",
  },
  {
    title: "Learning Direction",
    description: "AI-driven threat detection, DevSecOps fundamentals, scalable backend systems, and polished frontend UX.",
  },
];

const skills = [
  {
    title: "AI & Machine Learning",
    icon: BrainCircuit,
    tone: "from-cyan/25 to-violet/15",
    items: ["Python", "TensorFlow", "PyTorch", "Scikit-Learn", "Pandas"],
    level: 86,
    focus: "Designing practical intelligence layers with data preparation, model training, evaluation, and product-ready inference flows.",
    proof: ["AI/ML academic foundation", "Deep learning practice", "Applied product features"],
  },
  {
    title: "Data Science",
    icon: Database,
    tone: "from-mint/20 to-cyan/10",
    items: ["Data Analysis", "Data Visualization", "Machine Learning", "Statistics", "Power BI"],
    level: 82,
    focus: "Turning raw datasets into clear analysis, visual reporting, and decision-ready insights for product and business questions.",
    proof: ["Exploratory analysis", "Visual storytelling", "Metric-led decisions"],
  },
  {
    title: "Full-Stack Engineering",
    icon: Code2,
    tone: "from-violet/25 to-coral/10",
    items: ["React", "Next.js", "TypeScript", "Node.js", "Express"],
    level: 90,
    focus: "Building responsive interfaces, reliable APIs, database-backed workflows, and product surfaces that feel polished end to end.",
    proof: ["Real estate platform", "Portfolio systems", "REST API delivery"],
  },
  {
    title: "Security & DevOps",
    icon: ServerCog,
    tone: "from-coral/20 to-cyan/10",
    items: ["Linux", "Docker", "Git", "Postman", "Wireshark", "CI/CD"],
    level: 78,
    focus: "Working across Linux environments, API testing, deployment habits, automation, and security-aware engineering practices.",
    proof: ["Secure architecture habits", "Network analysis practice", "DevSecOps direction"],
  },
  {
    title: "Cloud & Database",
    icon: Boxes,
    tone: "from-cyan/20 to-mint/10",
    items: ["PostgreSQL", "MySQL", "Firebase", "Neon", "Cloudinary", "AWS"],
    level: 80,
    focus: "Structuring data layers, hosted databases, media pipelines, and storage flows that support real application behavior.",
    proof: ["PostgreSQL systems", "Cloudinary uploads", "Auth/session data"],
  },
  {
    title: "Cybersecurity",
    icon: ShieldCheck,
    tone: "from-mint/20 to-violet/15",
    items: ["Secure Architecture", "SecOps", "Regex", "Network Security", "Data Protection"],
    level: 74,
    focus: "Building a stronger security lens around user data, threat reasoning, application hardening, and safer defaults.",
    proof: ["SecOps learning path", "Threat detection interest", "Clean secure coding"],
  },
];

const projects: Project[] = [
  {
    title: "Ecommerce Repo: Siddipet Real Estate Web",
    description: "Built a district-level property discovery platform with verified listings, saved-property comparison, inquiry tracking, WhatsApp contact flows, media uploads, protected admin operations, audit logs, and chatbot support.",
    features: ["Property Search", "Saved Listings", "Admin Dashboard", "Audit Logs", "WhatsApp Contact", "AI Chatbot"],
    accent: "cyan",
    demoUrl: "https://real-estate-ten-red-17.vercel.app",
    repoUrl: "https://github.com/Akash17-dev/Ecommerce",
    images: [
      "https://github.com/user-attachments/assets/56271c79-8e5e-4992-84c5-35b73d103b80",
    ],
    preview: "District-level property discovery app with verified listings, inquiry tracking, media uploads, and authenticated admin operations.",
    caseStudy: [
      ["Problem", "Local property discovery was fragmented across calls, chats, and manual follow-ups."],
      ["Solution", "Centralized listings, saved comparisons, inquiry flows, WhatsApp actions, and admin workflows in one product surface."],
      ["Tech", "React, Tailwind CSS, Node.js, Express, PostgreSQL, JWT auth, and Cloudinary media handling."],
      ["Result", "A cleaner path for buyers to explore properties and for admins to manage listings, leads, uploads, and follow-ups."],
    ],
    details: [
      "Public users can search verified land, houses, villas, and commercial spaces across Siddipet mandals.",
      "Saved listings stay in the browser, making it easier for visitors to compare properties before contacting the office.",
      "The admin dashboard manages listings, inquiries, follow-ups, users, audit logs, dashboard metrics, and uploads.",
      "The platform supports optional Cloudinary media, WhatsApp/Telegram/email notifications, and a chatbot fallback.",
    ],
    stack: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "JWT Auth", "Cloudinary"],
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
  {
    year: "2024",
    title: "Started The AI/ML Foundation",
    description: "Built the base in Python, statistics, data analysis, machine learning concepts, and the mindset needed for intelligent systems.",
    tags: ["Python", "ML Basics", "Data Analysis"],
  },
  {
    year: "2025",
    title: "Moved Into Full-Stack Product Building",
    description: "Expanded from learning code to shipping web experiences using React, Tailwind, Node.js, Express, and database-backed flows.",
    tags: ["React", "Node.js", "Tailwind"],
  },
  {
    year: "2025",
    title: "Added Security And Systems Thinking",
    description: "Started focusing on Linux, network security, Wireshark, API testing, automation, and security-first architecture habits.",
    tags: ["Linux", "SecOps", "Postman"],
  },
  {
    year: "2026",
    title: "Shipped Real-World Startup-Style Apps",
    description: "Built larger product surfaces like the Siddipet Real Estate platform with public discovery, admin workflows, PostgreSQL, uploads, logs, and notifications.",
    tags: ["PostgreSQL", "Express", "Product UX"],
  },
  {
    year: "Now",
    title: "Combining AI, Web, And DevSecOps",
    description: "Current direction is AI-driven threat detection, secure full-stack systems, polished frontend UX, and scalable founder-led prototypes.",
    tags: ["AI Features", "DevSecOps", "UX"],
  },
];

const ventures = [
  "Open Source Deployment Platform",
  "AI Fitness Ecosystem",
  "Smart Attendance SaaS",
  "AI HR Analytics Platform",
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-white">
      <ScrollAnimations />
      <MouseGlow />
      <AshClouds />
      <AuroraBackground />
      <ShaderBackdrop className="pointer-events-none fixed inset-0 z-0 h-screen w-screen mix-blend-screen opacity-45" />
      <Header />
      <MobileBottomNav />

      <section id="hero" className="relative min-h-screen overflow-hidden pt-24">
        <div className="section-shell relative z-10 grid min-h-[calc(100vh-6rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
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
            <div className="mt-6 flex flex-wrap gap-2">
              {credibilitySignals.map((signal) => (
                <span key={signal} className="rounded-full border border-white/12 bg-white/[0.055] px-3 py-1.5 text-xs font-semibold text-white/[0.72]">
                  {signal}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href="#projects" icon={<ArrowUpRight className="h-4 w-4" />}>
                Explore My Work
              </MagneticButton>
              <MagneticButton href="/Aakula_Akash_ATS_Optimized_Resume.docx" icon={<Download className="h-4 w-4" />} variant="muted">
                Download Resume
              </MagneticButton>
              <MagneticButton href="#contact" icon={<Mail className="h-4 w-4" />} variant="ghost">
                Discuss a Project
              </MagneticButton>
            </div>
          </MotionDiv>

          <div className="relative h-[430px] min-h-[430px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(110,231,255,0.14),transparent_20rem),linear-gradient(135deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))] shadow-glass lg:h-[590px]">
            <ShaderBackdrop />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_48%,transparent_0,rgba(5,6,10,0.08)_34%,rgba(5,6,10,0.46)_100%)]" />
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
            solutions, with a security-first mindset and a bias for shipping
            useful, real-world applications.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {aboutDetails.map((detail) => (
              <div key={detail.title} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-cyan">
                  {detail.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/[0.62]">
                  {detail.description}
                </p>
              </div>
            ))}
          </div>
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

      <MotionSection id="skills" className="section-shell !py-16 sm:!py-24" data-reveal>
        <SectionHeading eyebrow="Capability Stack" title="A focused toolkit for AI-first product engineering." />
        <div className="mb-8 max-w-3xl text-base leading-7 text-white/[0.62]">
          A practical blend of AI, data, web engineering, cloud, and security skills, shaped for building useful products rather than collecting tools.
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill, index) => (
            <MotionDiv
              key={skill.title}
              className={`calm-panel group flex min-h-[23rem] flex-col overflow-hidden rounded-[1.35rem] bg-gradient-to-br ${skill.tone} p-5 transition duration-300 hover:-translate-y-1.5 hover:border-cyan/30`}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.07] text-cyan transition group-hover:bg-cyan/10">
                  <skill.icon className="h-6 w-6" />
                </div>
                <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">
                  {skill.level}% depth
                </div>
              </div>
              <h3 className="mt-5 text-xl font-bold text-white">{skill.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/[0.62]">{skill.focus}</p>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-white/[0.42]">
                  <span>Working proficiency</span>
                  <span>In use</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <MotionDiv
                    className="h-full rounded-full bg-gradient-to-r from-cyan via-mint to-violet"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: index * 0.05 }}
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-white/[0.72]">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-6">
                <div className="grid gap-2">
                  {skill.proof.map((point) => (
                    <div key={point} className="flex items-center gap-2 text-xs text-white/[0.58]">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_12px_rgba(110,231,255,0.55)]" />
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </MotionSection>

      <MotionSection id="projects" className="section-shell" data-reveal>
        <SectionHeading eyebrow="Featured Projects" title="Products shaped like real startups." />
        <ProjectShowcase projects={projects} />
      </MotionSection>

      <MotionSection id="github" className="section-shell !py-16 sm:!py-24" data-reveal>
        <SectionHeading eyebrow="GitHub Dashboard" title="Open-source activity with product discipline." />
        <GitHubDashboard username="Akash17-dev" />
      </MotionSection>

      <MotionSection id="experience" className="section-shell" data-reveal>
        <SectionHeading eyebrow="Experience Timeline" title="From learning curve to product velocity." />
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-cyan via-violet to-transparent sm:left-1/2" />
          {timeline.map((event, index) => (
            <MotionDiv
              key={`${event.year}-${event.title}`}
              className={`relative mb-6 flex ${index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="absolute left-[1.05rem] top-7 z-10 h-3 w-3 rounded-full border border-cyan/60 bg-ink shadow-[0_0_22px_rgba(110,231,255,0.55)] sm:left-1/2 sm:-translate-x-1/2" />
              <div className="calm-panel ml-12 w-full rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan/30 sm:ml-0 sm:w-[46%]">
                <div className="flex items-center gap-3 text-cyan">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.07]">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-[0.18em] text-white/[0.52]">
                    {event.year}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold">{event.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/[0.6]">{event.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/[0.68]">
                      {tag}
                    </span>
                  ))}
                </div>
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
                [Github, "GitHub", "https://github.com/Akash17-dev"],
                [Linkedin, "LinkedIn", "https://www.linkedin.com/in/akash-aakula-584002397/"],
                [MessageCircle, "WhatsApp", "https://wa.me/918897422872"],
                [Mail, "Email", "mailto:akulaakash17@gmail.com"],
              ].map(([Icon, label, href]) => (
                <a
                  key={String(label)}
                  href={String(href)}
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

      <footer className="relative z-10 mx-auto flex max-w-7xl flex-col gap-3 px-5 pb-28 text-sm text-white/[0.42] sm:flex-row sm:items-center sm:justify-between sm:px-8 md:pb-10 lg:px-10">
        <p>© 2026 Akash Aakula. Built with Next.js, Three.js, and liquid glass details.</p>
        <a href="#hero" className="transition hover:text-cyan">Back to top</a>
      </footer>
    </main>
  );
}

function MobileBottomNav() {
  const items = [
    [HomeIcon, "Home", "#hero"],
    [UserRound, "About", "#about"],
    [FolderKanban, "Projects", "#projects"],
    [BarChart3, "GitHub", "#github"],
    [Phone, "Contact", "#contact"],
  ];

  return (
    <nav
      aria-label="Mobile section navigation"
      className="fixed inset-x-3 bottom-3 z-50 rounded-full border border-white/15 bg-ink/75 px-2 py-2 shadow-glass backdrop-blur-2xl md:hidden"
    >
      <div className="grid grid-cols-5 gap-1">
        {items.map(([Icon, label, href]) => (
          <a
            key={String(label)}
            href={String(href)}
            aria-label={String(label)}
            className="grid h-12 place-items-center rounded-full text-white/[0.62] transition hover:bg-white/[0.08] hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </nav>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-ink/35 backdrop-blur-2xl">
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
          <span className="hidden sm:inline">Discuss a Project</span>
        </a>
      </nav>
    </header>
  );
}

function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-14%] top-[-12%] h-[38rem] w-[38rem] animate-aurora rounded-full bg-cyan/20 blur-3xl" />
      <div className="absolute right-[-12%] top-[4%] h-[34rem] w-[34rem] animate-aurora rounded-full bg-violet/20 blur-3xl [animation-delay:2s]" />
      <div className="absolute bottom-[-20%] left-[22%] h-[36rem] w-[42rem] animate-aurora rounded-full bg-mint/10 blur-3xl [animation-delay:4s]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(5,6,10,0.92)_76%)]" />
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
      className={`glass-panel absolute z-20 hidden w-44 rounded-3xl p-4 shadow-glow lg:block ${className}`}
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
