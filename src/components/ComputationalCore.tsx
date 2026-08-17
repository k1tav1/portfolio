"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Ring } from "@react-three/drei";
import * as THREE from "three";

function Core({ activeModule }: { activeModule: string | null }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={0.8}
            wireframe
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color="#07080A"
            emissive="#8B5CF6"
            emissiveIntensity={0.15}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={1.2}
            transparent
            opacity={0.6}
          />
        </mesh>
      </Float>

      <Ring args={[1.6, 1.65, 64]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshStandardMaterial color="#8B5CF6" transparent opacity={0.3} side={THREE.DoubleSide} emissive="#8B5CF6" emissiveIntensity={0.5} />
      </Ring>
      <Ring args={[2.0, 2.05, 64]} rotation={[0, Math.PI / 3, 0]}>
        <meshStandardMaterial color="#06B6D4" transparent opacity={0.25} side={THREE.DoubleSide} emissive="#06B6D4" emissiveIntensity={0.4} />
      </Ring>
      <Ring args={[2.4, 2.45, 64]} rotation={[Math.PI / 1.5, 0, Math.PI / 4]}>
        <meshStandardMaterial color="#A855F7" transparent opacity={0.15} side={THREE.DoubleSide} />
      </Ring>

      {[
        { label: "CODE", pos: [2.8, 0.5, 0], color: "#8B5CF6" as const, id: "software" },
        { label: "CLOUD", pos: [-2.8, 0.5, 0], color: "#06B6D4" as const, id: "cloud" },
        { label: "AI", pos: [0, 2.2, 1], color: "#EC4899" as const, id: "ai" },
        { label: "DATA", pos: [0, -2.2, 1], color: "#10B981" as const, id: "data" },
      ].map((mod) => {
        const isActive = activeModule === mod.id;
        return (
          <Float key={mod.label} speed={2} floatIntensity={0.8} rotationIntensity={0.3}>
            <group position={mod.pos as [number, number, number]}>
              <mesh>
                <boxGeometry args={[0.7, 0.7, 0.15]} />
                <meshStandardMaterial
                  color={isActive ? mod.color : "#1A1C22"}
                  emissive={mod.color}
                  emissiveIntensity={isActive ? 1 : 0.25}
                  transparent
                  opacity={isActive ? 0.95 : 0.8}
                  roughness={0.3}
                  metalness={0.6}
                />
              </mesh>
              {isActive && (
                <mesh position={[0, 0, -0.1]}>
                  <planeGeometry args={[1.2, 1.2]} />
                  <meshBasicMaterial color={mod.color} transparent opacity={0.2} />
                </mesh>
              )}
            </group>
          </Float>
        );
      })}

      <Sparkles count={80} scale={5} size={0.8} speed={0.3} opacity={0.6} color="#8B5CF6" />
      <Sparkles count={40} scale={4} size={0.5} speed={0.2} opacity={0.4} color="#06B6D4" />
    </group>
  );
}

export default function ComputationalCore({ activeModule }: { activeModule: string | null }) {
  return (
    <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[600px] overflow-hidden rounded-[32px] bg-[#07080A] border border-white/[0.08]">
      {/* CSS FALLBACK - always visible */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(rgba(139,92,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.4) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        {/* Central glow */}
        <div className="absolute w-[220px] h-[220px] bg-[#8B5CF6]/30 blur-[60px] rounded-full animate-pulse" />
        <div className="absolute w-[140px] h-[140px] bg-[#06B6D4]/20 blur-[40px] rounded-full animate-pulse" style={{ animationDelay: "1s" }} />

        {/* CSS Core - visible even if WebGL fails */}
        <div className="relative">
          {/* Orbital rings - CSS */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] border border-[#8B5CF6]/30 rounded-full animate-[spin_8s_linear_infinite]" style={{ transform: "translate(-50%, -50%) rotateX(70deg)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-[#06B6D4]/20 rounded-full animate-[spin_12s_linear_infinite_reverse]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] border border-[#A855F7]/10 rounded-full animate-[spin_20s_linear_infinite]" />

          {/* Central orb CSS */}
          <div className="relative w-[88px] h-[88px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] blur-[1px] opacity-90" />
            <div className="absolute inset-[3px] rounded-full bg-[#07080A] border border-white/10" />
            <div className="absolute inset-[12px] rounded-full bg-[#8B5CF6] blur-[8px] opacity-60 animate-pulse" />
            <div className="relative w-3 h-3 rounded-full bg-white shadow-[0_0_20px_#8B5CF6,0_0_40px_#8B5CF6]" />
          </div>

          {/* Modules CSS - positioned around */}
          <div className={`absolute -right-[88px] top-2 px-2.5 py-1 rounded-lg bg-[#1A1C22] border text-[10px] font-mono tracking-widest transition-all ${activeModule === "software" ? "border-[#8B5CF6] text-[#8B5CF6] shadow-[0_0_15px_rgba(139,92,246,0.5)] scale-110" : "border-white/10 text-white/60"}`}>CODE</div>
          <div className={`absolute -left-[92px] top-2 px-2.5 py-1 rounded-lg bg-[#1A1C22] border text-[10px] font-mono tracking-widest transition-all ${activeModule === "cloud" ? "border-[#06B6D4] text-[#06B6D4] shadow-[0_0_15px_rgba(6,182,214,0.5)] scale-110" : "border-white/10 text-white/60"}`}>CLOUD</div>
          <div className={`absolute left-1/2 -translate-x-1/2 -top-[64px] px-2.5 py-1 rounded-lg bg-[#1A1C22] border text-[10px] font-mono tracking-widest transition-all ${activeModule === "ai" ? "border-[#EC4899] text-[#EC4899] shadow-[0_0_15px_rgba(236,72,153,0.5)] scale-110" : "border-white/10 text-white/60"}`}>AI CORE</div>
          <div className={`absolute left-1/2 -translate-x-1/2 -bottom-[64px] px-2.5 py-1 rounded-lg bg-[#1A1C22] border text-[10px] font-mono tracking-widest transition-all ${activeModule === "data" ? "border-[#10B981] text-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-110" : "border-white/10 text-white/60"}`}>DATA</div>

          {/* Connection lines */}
          <div className="absolute top-1/2 left-full w-[64px] h-[1px] bg-gradient-to-r from-white/20 to-transparent -translate-y-1/2" />
          <div className="absolute top-1/2 right-full w-[64px] h-[1px] bg-gradient-to-l from-white/20 to-transparent -translate-y-1/2" />
          <div className="absolute bottom-full left-1/2 w-[1px] h-[48px] bg-gradient-to-t from-white/20 to-transparent -translate-x-1/2" />
          <div className="absolute top-full left-1/2 w-[1px] h-[48px] bg-gradient-to-b from-white/20 to-transparent -translate-x-1/2" />
        </div>
      </div>

      {/* WebGL Canvas - overlays CSS fallback */}
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]} className="!absolute inset-0 z-10" gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#8B5CF6" />
        <pointLight position={[-5, -3, 2]} intensity={0.8} color="#06B6D4" />
        <Core activeModule={activeModule} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.6} />
      </Canvas>

      {/* Overlays */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 text-[10px] font-mono tracking-widest text-white/40 bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/10">
        <span className={activeModule === "software" ? "text-[#8B5CF6]" : ""}>CODE</span>
        <span>•</span>
        <span className={activeModule === "cloud" ? "text-[#06B6D4]" : ""}>CLOUD</span>
        <span>•</span>
        <span className={activeModule === "ai" ? "text-[#EC4899]" : ""}>AI</span>
        <span>•</span>
        <span className={activeModule === "data" ? "text-[#10B981]" : ""}>DATA</span>
      </div>

      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/60 bg-white/[0.06] border border-white/[0.08] px-3 py-1.5 rounded-full backdrop-blur">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          CORE ONLINE • HYBRID RENDER
        </div>
        <div className="text-[10px] font-mono text-white/30 bg-black/40 backdrop-blur px-2 py-1 rounded-full border border-white/5">CSS FALLBACK + WebGL</div>
      </div>
    </div>
  );
}
