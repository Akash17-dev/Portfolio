"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uPointer;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotate = mat2(0.8, -0.6, 0.6, 0.8);

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = rotate * p * 2.03 + 0.17;
    amplitude *= 0.52;
  }

  return value;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
  vec2 pointer = (uPointer - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
  float time = uTime * 0.14;

  vec2 flow = uv;
  flow.x += sin(uv.y * 3.2 + time * 2.0) * 0.09;
  flow.y += cos(uv.x * 2.6 - time * 1.5) * 0.08;
  flow += pointer * 0.16;

  float smokeA = fbm(flow * 1.25 + vec2(time * 0.55, -time * 0.38));
  float smokeB = fbm((flow + vec2(0.42, -0.18)) * 2.1 + vec2(-time * 0.72, time * 0.46));
  float smoke = smoothstep(0.24, 0.86, smokeA * 0.68 + smokeB * 0.42);
  float field = fbm(flow * 2.4 + vec2(time, -time * 0.72));
  float veins = smoothstep(0.42, 0.9, field);
  float core = smoothstep(0.72, 0.12, length(uv - pointer * 0.28));
  float ring = smoothstep(0.34, 0.08, abs(length(uv) - 0.58));

  vec3 ink = vec3(0.02, 0.025, 0.04);
  vec3 cyan = vec3(0.43, 0.91, 1.0);
  vec3 mint = vec3(0.53, 1.0, 0.78);
  vec3 violet = vec3(0.72, 0.61, 1.0);

  vec3 color = ink;
  color += cyan * smoke * 0.22;
  color += mint * smokeA * 0.12;
  color += violet * smokeB * 0.08;
  color += cyan * veins * 0.30;
  color += mint * core * 0.30;
  color += violet * ring * 0.25;
  color += vec3(1.0) * pow(max(0.0, smoke + veins + core - 0.72), 2.0) * 0.16;

  float vignette = smoothstep(1.18, 0.18, length(uv));
  float alpha = clamp((smoke * 0.56 + veins * 0.34 + core * 0.25 + ring * 0.14) * vignette, 0.0, 0.86);

  gl_FragColor = vec4(color, alpha);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function ShaderBackdrop({
  className = "pointer-events-none absolute inset-0 z-[12] h-full w-full mix-blend-screen opacity-70",
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasElement = canvas;

    const context = canvasElement.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!context) return;
    const gl = context;

    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, "aPosition");
    const resolution = gl.getUniformLocation(program, "uResolution");
    const time = gl.getUniformLocation(program, "uTime");
    const pointer = gl.getUniformLocation(program, "uPointer");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointerState = { x: 0.55, y: 0.52 };
    let frame = 0;
    let start = performance.now();

    function resize() {
      const rect = canvasElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvasElement.width = Math.max(1, Math.floor(rect.width * dpr));
      canvasElement.height = Math.max(1, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvasElement.width, canvasElement.height);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = canvasElement.getBoundingClientRect();
      pointerState.x = (event.clientX - rect.left) / Math.max(1, rect.width);
      pointerState.y = 1 - (event.clientY - rect.top) / Math.max(1, rect.height);
    }

    function render(now: number) {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.enableVertexAttribArray(position);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolution, canvasElement.width, canvasElement.height);
      gl.uniform1f(time, (now - start) / 1000);
      gl.uniform2f(pointer, pointerState.x, pointerState.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!reducedMotion) {
        frame = window.requestAnimationFrame(render);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    canvasElement.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = window.requestAnimationFrame((now) => {
      start = now;
      render(now);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvasElement.removeEventListener("pointermove", onPointerMove);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  );
}
