import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Linkedin,
  Github,
  Phone,
  Send,
  Loader2,
  CheckCircle,
  Copy,
  Check,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus("submitting");

    // Simulate high-end server-side database submission API
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", org: "", message: "" });
      
      // Return to interactive mode after a short window
      setTimeout(() => setFormStatus("idle"), 6000);
    }, 2000);
  };

  // Modern clipboard copying prompt
  const handleCopyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const coordinates = [
    {
      name: "EMAIL",
      value: "akashlucky@engineer.com",
      link: "mailto:akashlucky@engineer.com",
      icon: Mail,
      accent: "cyan",
    },
    {
      name: "LINKEDIN",
      value: "linkedin.com/in/akash-lucky",
      link: "https://linkedin.com",
      icon: Linkedin,
      accent: "purple",
    },
    {
      name: "GITHUB",
      value: "github.com/akash-lucky",
      link: "https://github.com",
      icon: Github,
      accent: "white",
    },
    {
      name: "WHATSAPP",
      value: "+91 98765 43210",
      link: "https://wa.me/919876543210",
      icon: Phone,
      accent: "cyan",
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 md:py-32 bg-bg-dark border-t border-white/5 overflow-hidden z-10 px-6 md:px-12"
    >
      {/* Background spotlights */}
      <div className="absolute top-[20%] left-0 w-[40vw] h-[40vw] bg-accent-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-0 w-[45vw] h-[40vw] bg-accent-purple/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Title Block */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-[1px] bg-accent-cyan" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-cyan font-bold">
              SYS_ORCHESTRATOR
            </span>
          </div>
          <h2 className="font-syne text-4xl md:text-6xl font-extrabold uppercase text-white tracking-tight leading-none">
            CONNECT COORDINATES<span className="text-accent-cyan">.</span>
          </h2>
        </div>

        {/* Dynamic Split columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Interactive coordinates boxes */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h3 className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em]">
                DIGITAL REFRESH POINTS
              </h3>
              <p className="font-sans text-xs md:text-sm text-zinc-400 font-light leading-relaxed max-w-sm">
                Initiate a sync protocol directly via social nodes, check developer registries, or copy direct email links instantly.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              {coordinates.map((item) => {
                const Icon = item.icon;
                const isCopied = copiedType === item.name;

                return (
                  <div
                    key={item.name}
                    className="glassmorphism p-5 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors duration-300 relative overflow-hidden"
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className={`w-11 h-11 rounded-xl border border-white/5 flex items-center justify-center ${
                        item.accent === "cyan"
                          ? "bg-accent-cyan/5 text-accent-cyan"
                          : item.accent === "purple"
                          ? "bg-accent-purple/5 text-accent-purple"
                          : "bg-white/5 text-white"
                      }`}>
                        <Icon className="w-5 h-5 animate-pulse-slow" />
                      </div>
                      
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">
                          {item.name}
                        </span>
                        <a
                          href={item.link}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="font-display font-medium text-xs sm:text-sm text-white hover:text-accent-cyan transition-colors duration-200 cursor-none"
                        >
                          {item.value}
                        </a>
                      </div>
                    </div>

                    {/* Copy clipboard action trigger button */}
                    <button
                      onClick={() => handleCopyText(item.value, item.name)}
                      className="p-2 border border-white/5 hover:border-accent-cyan text-zinc-500 hover:text-accent-cyan rounded-full transition-colors relative cursor-none"
                      title={`Copy ${item.name}`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-accent-cyan" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Message Terminal */}
          <div className="lg:col-span-7">
            <div className="glassmorphism p-8 md:p-10 rounded-3xl border border-white/5 space-y-6 relative overflow-hidden">
              
              {/* Abs grid effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/5 blur-[50px] pointer-events-none" />

              <div className="space-y-1">
                <h3 className="font-display font-medium text-lg text-white">
                  TRANSMIT_SECURE_PACKET // terminal
                </h3>
                <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                  Secure TLS 1.3 Encryption active
                </p>
              </div>

              <AnimatePresence mode="wait">
                {formStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <CheckCircle className="w-16 h-16 text-accent-cyan animate-bounce" />
                    <div className="space-y-2">
                      <h4 className="font-syne text-xl font-bold uppercase text-white tracking-wide">
                        TRANSMISSION LOGGED SUCESSFULLY!
                      </h4>
                      <p className="font-sans text-xs text-zinc-400 font-light max-w-sm mx-auto leading-relaxed">
                        Akash's automated workspace router has queued your message payload. Sync pipelines are opening shortly.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-5"
                  >
                    {/* Double name/email row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name field */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          autoComplete="off"
                          className="w-full bg-black/60 border border-white/5 focus:border-[#00D4FF] focus:outline-none rounded-xl px-4 py-3 font-sans text-sm text-white placeholder-zinc-600 transition-colors cursor-none"
                          placeholder="e.g. Satoshi"
                        />
                      </div>

                      {/* Email field */}
                      <div className="space-y-1.5">
                        <label className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block">
                          Coordinates E-Mail *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          autoComplete="off"
                          className="w-full bg-black/60 border border-white/5 focus:border-[#00D4FF] focus:outline-none rounded-xl px-4 py-3 font-sans text-sm text-white placeholder-zinc-600 transition-colors cursor-none"
                          placeholder="e.g. satoshi@bitcoin.org"
                        />
                      </div>
                    </div>

                    {/* Organization field */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block">
                        Organization / Venture
                      </label>
                      <input
                        type="text"
                        name="org"
                        value={formData.org}
                        onChange={handleInputChange}
                        autoComplete="off"
                        className="w-full bg-black/60 border border-white/5 focus:border-[#00D4FF] focus:outline-none rounded-xl px-4 py-3 font-sans text-sm text-white placeholder-zinc-600 transition-colors cursor-none"
                        placeholder="e.g. NextGen AI Labs"
                      />
                    </div>

                    {/* Message body field */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block">
                        Project payload / Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-white/5 focus:border-[#00D4FF] focus:outline-none rounded-xl px-4 py-3 font-sans text-sm text-white placeholder-zinc-600 transition-colors cursor-none resize-none"
                        placeholder="Describe your goals, tech timelines, or partnership proposals..."
                      />
                    </div>

                    {/* Transmit action trigger */}
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full group px-6 py-4 bg-white disabled:bg-zinc-800 hover:bg-transparent border border-white hover:border-accent-cyan rounded-xl font-display text-xs font-bold text-black hover:text-accent-cyan tracking-widest uppercase transition-all duration-300 relative overflow-hidden flex items-center justify-center gap-2 cursor-none"
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-accent-cyan" />
                          <span>SYNCHRONIZING SECURE TUNNEL...</span>
                        </>
                      ) : (
                        <>
                          <span>TRANSMIT PACKET payload</span>
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Real Minimalist Human Designer Footer */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="font-mono text-[10px] text-zinc-500 tracking-wider">
              DESIGNED & ARCHITECTED BY AKASH LUCKY
            </p>
            <p className="font-mono text-[9px] text-zinc-600">
              BUILD RUNTIME: SECURE CLOUD CONTAINER // REACT-SPARSE v19
            </p>
          </div>
          
          <div className="flex gap-4">
            <a
              href="#hero"
              className="font-mono text-[9px] uppercase tracking-widest text-[#00D4FF] bg-accent-cyan/5 border border-accent-cyan/15 px-3 py-1 rounded"
              title="Return to topmost coordinates"
            >
              SYS_BOOT_INITIALIZER // BACK TO TOP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
