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
  float amplitude = 0.52;
  mat2 rotate = mat2(0.78, -0.63, 0.63, 0.78);

  for (int i = 0; i < 6; i++) {
    value += amplitude * noise(p);
    p = rotate * p * 2.08 + vec2(0.37, -0.19);
    amplitude *= 0.48;
  }

  return value;
}

float plumeMask(vec2 uv, vec2 source, float width, float height) {
  float rise = smoothstep(source.y, source.y + height, uv.y);
  float fadeTop = 1.0 - smoothstep(source.y + height * 0.68, source.y + height, uv.y);
  float spread = width + rise * rise * 0.36;
  float centerDrift = sin((uv.y + source.x) * 6.4 + uTime * 0.22) * rise * 0.16;
  float x = abs(uv.x - source.x - centerDrift);
  return smoothstep(spread, spread * 0.18, x) * rise * fadeTop;
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
  float t = uTime;

  vec2 wind = vec2(t * 0.045, -t * 0.16);
  vec2 warp = vec2(
    fbm(uv * 1.7 + wind),
    fbm(uv * 1.9 - wind.yx + 3.7)
  ) - 0.5;

  vec2 flow = uv;
  flow.x += warp.x * 0.42 + sin(uv.y * 8.0 + t * 0.5) * 0.035;
  flow.y += warp.y * 0.24 + t * 0.026;

  float body = fbm(flow * 2.3 + vec2(-t * 0.06, t * 0.18));
  float detail = fbm(flow * 7.4 + vec2(t * 0.28, -t * 0.34));
  float filaments = fbm(flow * 15.0 + vec2(-t * 0.48, t * 0.36));
  float ridges = 1.0 - abs(detail * 2.0 - 1.0);

  float plumeA = plumeMask(uv, vec2(-0.52, -0.72), 0.09, 1.75);
  float plumeB = plumeMask(uv, vec2(0.04, -0.78), 0.12, 1.92);
  float plumeC = plumeMask(uv, vec2(0.56, -0.70), 0.08, 1.62);
  float plumeD = plumeMask(uv, vec2(-0.05, -0.22), 0.28, 1.04) * 0.48;
  float plume = clamp(plumeA + plumeB + plumeC + plumeD, 0.0, 1.0);

  float density = smoothstep(0.34, 0.78, body + ridges * 0.18 + filaments * 0.08);
  float sharpEdges = smoothstep(0.44, 0.82, filaments + ridges * 0.42);
  float lowerHaze = smoothstep(0.92, 0.1, st.y) * 0.25;
  float sideFade = smoothstep(0.02, 0.23, st.x) * smoothstep(0.98, 0.72, st.x);
  float alpha = (density * 0.62 + sharpEdges * 0.18 + lowerHaze) * plume * sideFade;

  float grain = hash(gl_FragCoord.xy + floor(t * 18.0)) - 0.5;
  vec3 coolSmoke = vec3(0.58, 0.66, 0.72);
  vec3 warmCore = vec3(0.34, 0.38, 0.41);
  vec3 color = mix(warmCore, coolSmoke, density);
  color += vec3(0.18, 0.23, 0.25) * sharpEdges;
  color += grain * 0.026;

  alpha = clamp(alpha * 0.78, 0.0, 0.56);
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

export function AshClouds() {
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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let start = performance.now();
    let visible = true;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvasElement.width = Math.max(1, Math.floor(window.innerWidth * dpr));
      canvasElement.height = Math.max(1, Math.floor(window.innerHeight * dpr));
      gl.viewport(0, 0, canvasElement.width, canvasElement.height);
    }

    function render(now: number) {
      if (!visible || document.hidden) {
        frame = 0;
        return;
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.enableVertexAttribArray(position);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolution, canvasElement.width, canvasElement.height);
      gl.uniform1f(time, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!reducedMotion) {
        frame = window.requestAnimationFrame(render);
      }
    }

    function startRendering() {
      if (reducedMotion || frame || !visible || document.hidden) return;
      frame = window.requestAnimationFrame(render);
    }

    function syncVisibility() {
      if (document.hidden && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        return;
      }

      startRendering();
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else {
        startRendering();
      }
    });

    resize();
    start = performance.now();
    observer.observe(canvasElement);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", syncVisibility);
    render(start);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", syncVisibility);
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
      className="pointer-events-none fixed inset-0 z-[1] h-screen w-screen opacity-95 mix-blend-screen"
    />
  );
}
