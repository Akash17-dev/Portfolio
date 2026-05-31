import { motion } from "motion/react";
import { Sparkles, Compass } from "lucide-react";

export default function Vision() {
  const line1 = "I don't just build applications.";
  const line2 = "I build intelligent products";
  const line3 = "that solve real-world problems.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="vision"
      className="relative min-h-[90vh] py-24 flex flex-col justify-center bg-bg-dark border-t border-white/5 overflow-hidden z-10 px-6 md:px-12"
    >
      {/* Background massive neural shadow flare */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-[70vw] h-[30vw] mx-auto rounded-full bg-gradient-to-r from-accent-cyan/10 to-accent-purple/10 blur-[140px] pointer-events-none select-none" />

      <div className="max-w-6xl mx-auto w-full text-center relative space-y-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Compass className="w-5 h-5 text-accent-cyan animate-spin-slow" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00D4FF] font-bold">
            MISSION MANIFESTO
          </span>
        </div>

        {/* Big Typographic statement using word by word trigger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          {/* Line 1 */}
          <div className="flex flex-wrap justify-center overflow-hidden py-1">
            {line1.split(" ").map((word, idx) => (
              <motion.span
                key={idx}
                variants={wordVariants}
                className="font-syne text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#7C3AED] py-1 inline-block uppercase tracking-tight mr-4"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Line 2 */}
          <div className="flex flex-wrap justify-center overflow-hidden py-1">
            {line2.split(" ").map((word, idx) => (
              <motion.span
                key={idx}
                variants={wordVariants}
                className="font-syne text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white py-1 inline-block uppercase tracking-tight mr-4"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Line 3 */}
          <div className="flex flex-wrap justify-center overflow-hidden py-1">
            {line3.split(" ").map((word, idx) => (
              <motion.span
                key={idx}
                variants={wordVariants}
                className="font-syne text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold py-1 inline-block uppercase tracking-tight text-stroke mr-4"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              variants={wordVariants}
              className="font-syne text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold py-1 text-accent-cyan inline-block uppercase leading-none"
            >
              .
            </motion.span>
          </div>
        </motion.div>

        {/* Small detail tagline below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pt-6 font-mono text-[11px] text-zinc-500 uppercase tracking-widest flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
          <span>EVALUATING SYSTEM DESIGN PARADIGMS</span>
        </motion.div>
      </div>
    </section>
  );
}
