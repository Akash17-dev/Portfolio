import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "click">("default");
  const [hoverText, setHoverText] = useState("");
  const cursorRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth elastic movement
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hide default cursor on desktop
    const addCursorStyling = () => {
      document.body.style.cursor = "none";
    };
    
    // Only enable premium custom cursor if not a touch screen
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return;
    }

    addCursorStyling();
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Determine cursor states based on class attributes or tags
      const interactive = target.closest("button, a, [role='button'], input, textarea, select");
      const projectCard = target.closest("[data-cursor='view']");
      const clickCard = target.closest("[data-cursor='click']");
      const textHover = target.closest("[data-cursor='hover']");

      if (projectCard) {
        setCursorType("view");
        setHoverText("VIEW");
      } else if (clickCard) {
        setCursorType("click");
        setHoverText("OPEN");
      } else if (textHover) {
        setCursorType("hover");
        setHoverText("");
      } else if (interactive) {
        setCursorType("hover");
        setHoverText("");
      } else {
        setCursorType("default");
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Halo ring with spring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-cyan/60 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen flex items-center justify-center font-mono text-[9px] font-bold tracking-wider text-accent-cyan bg-accent-cyan/5"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: cursorType === "view" || cursorType === "click" ? 72 : cursorType === "hover" ? 48 : 32,
          height: cursorType === "view" || cursorType === "click" ? 72 : cursorType === "hover" ? 48 : 32,
          borderColor: cursorType === "view" ? "rgba(0, 212, 255, 0.8)" : cursorType === "click" ? "rgba(124, 58, 237, 0.8)" : "rgba(0, 212, 255, 0.4)",
          backgroundColor: cursorType === "view" ? "rgba(0, 212, 255, 0.1)" : cursorType === "click" ? "rgba(124, 58, 237, 0.15)" : "rgba(0, 212, 255, 0.02)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {hoverText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-white text-[10px] font-display font-bold select-none text-center"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: cursorType !== "default" ? 0.3 : 1,
          backgroundColor: cursorType === "view" ? "#00D4FF" : cursorType === "click" ? "#7C3AED" : "#FFFFFF",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </>
  );
}
