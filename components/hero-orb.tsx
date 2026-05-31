"use client";

import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
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
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.7}
          chromaticAberration={0.08}
          anisotropy={0.18}
          distortion={0.34}
          distortionScale={0.22}
          temporalDistortion={0.18}
          iridescence={1}
          iridescenceIOR={1.5}
          roughness={0.08}
          transmission={1}
          color="#dff9ff"
        />
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
    <div data-parallax className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.6]} performance={{ min: 0.6 }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[4, 4, 4]} intensity={7} color="#6ee7ff" />
        <pointLight position={[-4, -2, 3]} intensity={4} color="#b79cff" />
        <LiquidSphere />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
