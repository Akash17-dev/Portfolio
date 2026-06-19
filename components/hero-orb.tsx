"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function LiquidSphere() {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.18;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.26;
    const pulse = Math.sin(state.clock.elapsedTime * 1.3) * 0.04;
    mesh.current.scale.setScalar(1 + pulse);
  });

  return (
    <Float speed={1.8} rotationIntensity={0.55} floatIntensity={1.6}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[2.15, 12]} />
        <meshPhysicalMaterial
          color="#c9fbff"
          emissive="#122a3a"
          emissiveIntensity={0.55}
          metalness={0.08}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.05}
          reflectivity={1}
          transparent
          opacity={0.78}
        />
      </mesh>
      <mesh scale={2.32}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#6ee7ff" wireframe transparent opacity={0.16} />
      </mesh>
      <mesh position={[1.2, -0.9, -0.8]} scale={0.42}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color="#88ffc8" emissive="#88ffc8" emissiveIntensity={0.7} roughness={0.2} />
      </mesh>
    </Float>
  );
}

export default function HeroOrb() {
  return (
    <div className="absolute inset-0 z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 42 }}
        dpr={[1, 1.6]}
        gl={{ alpha: true, antialias: true }}
        performance={{ min: 0.6 }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 4, 5]} intensity={3.2} color="#ffffff" />
        <pointLight position={[4, 4, 4]} intensity={5.5} color="#6ee7ff" />
        <pointLight position={[-4, -2, 3]} intensity={3.2} color="#b79cff" />
        <LiquidSphere />
      </Canvas>
    </div>
  );
}
