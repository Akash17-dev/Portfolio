import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  z: number; // 3D depth field
  vx: number;
  vy: number;
  vz: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  radius: number;
  alpha: number;
  color: string;
}

export default function NeuralNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 220 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    const maxNodes = 90; // Balanced for pure performance & density
    const connectionDist = 140;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initNodes();
    };

    // Initialize 3D points inside canvas
    const initNodes = () => {
      nodes = [];
      const colors = ["#00D4FF", "#7C3AED", "#ffffff"];
      
      for (let i = 0; i < maxNodes; i++) {
        // Uniform random distribution in 3D frame
        const x = Math.random() * width;
        const y = Math.random() * height;
        const z = Math.random() * 800 - 400; // -400 to +400 depth

        const color = colors[Math.floor(Math.random() * colors.length)];

        nodes.push({
          x,
          y,
          z,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          vz: (Math.random() - 0.5) * 0.3,
          baseX: x,
          baseY: y,
          baseZ: z,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5 + 0.3,
          color,
        });
      }
    };

    // Setup Resize Observer for robust sizing
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinate tracking
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Update and project nodes (simple 3D orthographic projection with parallax)
      const fov = 400; // Field of view depth scale
      const cx = width / 2;
      const cy = height / 2;

      nodes.forEach((node) => {
        // Standard random brownian motion
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Space boundary wrap-around
        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;
        if (node.z < -fov) node.z = fov;
        if (node.z > fov) node.z = -fov;

        // Apply mouse distortion / interactive warp
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Push nodes away subtly
            const angle = Math.atan2(dy, dx);
            node.x += Math.cos(angle) * force * 1.5;
            node.y += Math.sin(angle) * force * 1.5;
          }
        }

        // Parallax Projection based on Depth Z
        // 3D perspective divider
        const scale = fov / (fov + node.z);
        const projX = (node.x - cx) * scale + cx;
        const projY = (node.y - cy) * scale + cy;
        const projR = node.radius * scale;

        // Skip drawing if projected out-of-bounds
        if (projX < 0 || projX > width || projY < 0 || projY > height) return;

        // Draw neuron spark
        ctx.beginPath();
        ctx.arc(projX, projY, projR, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        
        // Intensity matches depth scaling
        const depthAlpha = Math.max(0.05, Math.min(1, (fov - node.z) / (fov * 2)));
        ctx.globalAlpha = node.alpha * depthAlpha;
        ctx.fill();
      });

      // Draw synapse links inside distance limit
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        
        const scale1 = fov / (fov + n1.z);
        const p1X = (n1.x - cx) * scale1 + cx;
        const p1Y = (n1.y - cy) * scale1 + cy;

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          
          const scale2 = fov / (fov + n2.z);
          const p2X = (n2.x - cx) * scale2 + cx;
          const p2Y = (n2.y - cy) * scale2 + cy;

          const dx = p1X - p2X;
          const dy = p1Y - p2Y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            // Check proximity to mouse to light up synapses!
            let synapseAlpha = (connectionDist - dist) / connectionDist * 0.16;
            
            if (mouse.x > 0 && mouse.y > 0) {
              const mx1 = (p1X + p2X) / 2 - mouse.x;
              const my1 = (p1Y + p2Y) / 2 - mouse.y;
              const mouseDist = Math.sqrt(mx1 * mx1 + my1 * my1);
              if (mouseDist < mouse.radius) {
                // Glow up near mouse pointer!
                const boost = (mouse.radius - mouseDist) / mouse.radius;
                synapseAlpha += boost * 0.25;
              }
            }

            // Draw link with visual weight
            ctx.beginPath();
            ctx.moveTo(p1X, p1Y);
            ctx.lineTo(p2X, p2Y);
            
            // Choose line gradient or color
            if (n1.color === "#00D4FF" || n2.color === "#00D4FF") {
              ctx.strokeStyle = "rgba(0, 212, 255, " + synapseAlpha + ")";
            } else if (n1.color === "#7C3AED" || n2.color === "#7C3AED") {
              ctx.strokeStyle = "rgba(124, 58, 237, " + synapseAlpha + ")";
            } else {
              ctx.strokeStyle = "rgba(255, 255, 255, " + synapseAlpha + ")";
            }
            
            ctx.lineWidth = Math.min(1.2, 0.4 + (connectionDist - dist) / 50);
            ctx.globalAlpha = 1; // Alpha already calculated in strokeStyle
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 noise-overlay opacity-56"
      id="neural-visualizer"
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
}
