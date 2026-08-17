"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Ring } from "@react-three/drei";
import * as THREE from "three";

function Core({ activeModule }: { activeModule: string | null }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const isActive = !!activeModule;
    const speed = isActive ? 0.35 : 0.15;
    
    if (meshRef.current) {
      meshRef.current.rotation.y = t * speed;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
      meshRef.current.rotation.z = Math.cos(t * 0.2) * 0.05;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      // Pulsate scale slightly when active
      const scale = isActive ? 1 + Math.sin(t * 3) * 0.03 : 1;
      groupRef.current.scale.set(scale, scale, scale);
    }
    if (glowRef.current) {
      const glowScale = 1 + Math.sin(t * 2) * 0.15;
      glowRef.current.scale.set(glowScale, glowScale, glowScale);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
        {/* Outer wireframe - more vibrant */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.3, 2]} />
          <meshStandardMaterial
            color="#A855F7"
            emissive="#8B5CF6"
            emissiveIntensity={1.8}
            wireframe
            transparent
            opacity={1}
          />
        </mesh>
        {/* Middle shell - dark with glow */}
        <mesh>
          <sphereGeometry args={[0.85, 32, 32]} />
          <meshStandardMaterial
            color="#0A0A0F"
            emissive="#8B5CF6"
            emissiveIntensity={0.5}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>
        {/* Inner core - super vibrant cyan */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.48, 32, 32]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={2.5}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Innermost bright dot */}
        <mesh>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9} />
        </mesh>
      </Float>

      {/* Orbital rings - more vibrant, more rings */}
      <Ring args={[1.65, 1.7, 64]} rotation={[Math.PI / 2.5, 0, 0]}>
        <meshStandardMaterial color="#8B5CF6" transparent opacity={0.6} side={THREE.DoubleSide} emissive="#8B5CF6" emissiveIntensity={1.2} />
      </Ring>
      <Ring args={[2.05, 2.1, 64]} rotation={[0, Math.PI / 3, 0]}>
        <meshStandardMaterial color="#06B6D4" transparent opacity={0.5} side={THREE.DoubleSide} emissive="#06B6D4" emissiveIntensity={1.0} />
      </Ring>
      <Ring args={[2.45, 2.5, 64]} rotation={[Math.PI / 1.5, 0, Math.PI / 4]}>
        <meshStandardMaterial color="#EC4899" transparent opacity={0.35} side={THREE.DoubleSide} emissive="#EC4899" emissiveIntensity={0.8} />
      </Ring>
      <Ring args={[2.85, 2.9, 48]} rotation={[Math.PI / 4, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#10B981" transparent opacity={0.25} side={THREE.DoubleSide} emissive="#10B981" emissiveIntensity={0.6} />
      </Ring>

      {/* Modules - more vibrant */}
      {[
        { label: "CODE", pos: [3.0, 0.6, 0.3], color: "#8B5CF6" as const, id: "software", icon: "◧" },
        { label: "CLOUD", pos: [-3.0, 0.6, 0.3], color: "#06B6D4" as const, id: "cloud", icon: "☁" },
        { label: "AI", pos: [0.3, 2.4, 1.2], color: "#EC4899" as const, id: "ai", icon: "✦" },
        { label: "DATA", pos: [0.3, -2.4, 1.2], color: "#10B981" as const, id: "data", icon: "◫" },
      ].map((mod) => {
        const isActive = activeModule === mod.id;
        return (
          <Float key={mod.label} speed={isActive ? 3 : 1.8} floatIntensity={isActive ? 1.2 : 0.6} rotationIntensity={0.4}>
            <group position={mod.pos as [number, number, number]}>
              {/* Module box - vibrant */}
              <mesh>
                <boxGeometry args={[0.8, 0.8, 0.18]} />
                <meshStandardMaterial
                  color={isActive ? mod.color : "#15151F"}
                  emissive={mod.color}
                  emissiveIntensity={isActive ? 2.0 : 0.4}
                  transparent
                  opacity={isActive ? 1 : 0.85}
                  roughness={0.2}
                  metalness={0.8}
                />
              </mesh>
              {/* Active glow plane */}
              {isActive && (
                <>
                  <mesh position={[0, 0, -0.15]}>
                    <planeGeometry args={[1.6, 1.6]} />
                    <meshBasicMaterial color={mod.color} transparent opacity={0.3} />
                  </mesh>
                  <mesh position={[0, 0, -0.25]}>
                    <planeGeometry args={[2.2, 2.2]} />
                    <meshBasicMaterial color={mod.color} transparent opacity={0.12} />
                  </mesh>
                </>
              )}
              {/* Connection line to center */}
              <mesh position={[mod.id === "software" ? -0.9 : mod.id === "cloud" ? 0.9 : 0, mod.id === "ai" ? -0.7 : mod.id === "data" ? 0.7 : 0, -0.2]}>
                <boxGeometry args={[mod.id === "software" || mod.id === "cloud" ? 1.2 : 0.04, mod.id === "ai" || mod.id === "data" ? 1.2 : 0.04, 0.02]} />
                <meshBasicMaterial color={mod.color} transparent opacity={isActive ? 0.8 : 0.25} />
              </mesh>
            </group>
          </Float>
        );
      })}

      {/* More vibrant sparkles */}
      <Sparkles count={120} scale={5.5} size={1.0} speed={0.5} opacity={0.8} color="#8B5CF6" />
      <Sparkles count={80} scale={4.5} size={0.7} speed={0.35} opacity={0.6} color="#06B6D4" />
      <Sparkles count={50} scale={4} size={0.6} speed={0.4} opacity={0.5} color="#EC4899" />
      <Sparkles count={30} scale={6} size={1.2} speed={0.2} opacity={0.4} color="#FFFFFF" />
    </group>
  );
}

export default function ComputationalCore({ activeModule }: { activeModule: string | null }) {
  return (
    <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[640px] overflow-hidden rounded-[32px] bg-[#07080A] border border-white/[0.10] shadow-[0_0_0_1px_rgba(139,92,246,0.1),0_0_80px_rgba(139,92,246,0.15)] group">
      {/* Vibrant grid background */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.6) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(6,182,214,0.4) 1.5px, transparent 1.5px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* More vibrant glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-[#8B5CF6]/40 blur-[80px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-[240px] h-[240px] bg-[#06B6D4]/30 blur-[60px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: "0.7s" }} />
      <div className="absolute bottom-1/3 left-1/3 w-[200px] h-[200px] bg-[#EC4899]/20 blur-[50px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: "1.4s" }} />

      {/* CSS FALLBACK - more vibrant */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Central orb CSS - more vibrant */}
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] border border-[#8B5CF6]/40 rounded-full animate-[spin_8s_linear_infinite] shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] border border-[#06B6D4]/30 rounded-full animate-[spin_12s_linear_infinite_reverse] shadow-[0_0_20px_rgba(6,182,214,0.2)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] border border-[#EC4899]/20 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-[#10B981]/15 rounded-full animate-[spin_25s_linear_infinite_reverse]" />

          <div className="relative w-[96px] h-[96px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8B5CF6] via-[#A855F7] to-[#06B6D4] blur-[2px] opacity-100 animate-pulse" />
            <div className="absolute inset-[2px] rounded-full bg-[#07080A] border-2 border-white/20" />
            <div className="absolute inset-[14px] rounded-full bg-[#8B5CF6] blur-[12px] opacity-80 animate-pulse" />
            <div className="absolute inset-[22px] rounded-full bg-[#06B6D4] blur-[8px] opacity-60 animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="relative w-4 h-4 rounded-full bg-white shadow-[0_0_30px_#8B5CF6,0_0_60px_#8B5CF6,0_0_90px_#06B6D4] animate-pulse" />
          </div>

          {/* Modules CSS - more vibrant, user friendly with icons */}
          <div className={`absolute -right-[92px] top-1 px-3 py-1.5 rounded-xl bg-[#1A1C22] border-2 text-[11px] font-mono font-bold tracking-widest transition-all flex items-center gap-1.5 ${activeModule === "software" ? "border-[#8B5CF6] text-white bg-[#8B5CF6] shadow-[0_0_25px_rgba(139,92,246,0.8)] scale-110" : "border-white/20 text-white/70 hover:border-[#8B5CF6]/50 hover:text-white"}`}>
            <span>◧</span> CODE
          </div>
          <div className={`absolute -left-[96px] top-1 px-3 py-1.5 rounded-xl bg-[#1A1C22] border-2 text-[11px] font-mono font-bold tracking-widest transition-all flex items-center gap-1.5 ${activeModule === "cloud" ? "border-[#06B6D4] text-white bg-[#06B6D4] shadow-[0_0_25px_rgba(6,182,214,0.8)] scale-110" : "border-white/20 text-white/70 hover:border-[#06B6D4]/50 hover:text-white"}`}>
            <span>☁</span> CLOUD
          </div>
          <div className={`absolute left-1/2 -translate-x-1/2 -top-[68px] px-3 py-1.5 rounded-xl bg-[#1A1C22] border-2 text-[11px] font-mono font-bold tracking-widest transition-all flex items-center gap-1.5 ${activeModule === "ai" ? "border-[#EC4899] text-white bg-[#EC4899] shadow-[0_0_25px_rgba(236,72,153,0.8)] scale-110" : "border-white/20 text-white/70 hover:border-[#EC4899]/50 hover:text-white"}`}>
            <span>✦</span> AI CORE
          </div>
          <div className={`absolute left-1/2 -translate-x-1/2 -bottom-[68px] px-3 py-1.5 rounded-xl bg-[#1A1C22] border-2 text-[11px] font-mono font-bold tracking-widest transition-all flex items-center gap-1.5 ${activeModule === "data" ? "border-[#10B981] text-white bg-[#10B981] shadow-[0_0_25px_rgba(16,185,129,0.8)] scale-110" : "border-white/20 text-white/70 hover:border-[#10B981]/50 hover:text-white"}`}>
            <span>◫</span> DATA
          </div>

          {/* Vibrant connection lines with glow */}
          <div className="absolute top-1/2 left-full w-[68px] h-[2px] bg-gradient-to-r from-[#8B5CF6] via-[#8B5CF6]/50 to-transparent -translate-y-1/2 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
          <div className="absolute top-1/2 right-full w-[68px] h-[2px] bg-gradient-to-l from-[#06B6D4] via-[#06B6D4]/50 to-transparent -translate-y-1/2 shadow-[0_0_10px_rgba(6,182,214,0.5)]" />
          <div className="absolute bottom-full left-1/2 w-[2px] h-[52px] bg-gradient-to-t from-[#EC4899] via-[#EC4899]/50 to-transparent -translate-x-1/2 shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
          <div className="absolute top-full left-1/2 w-[2px] h-[52px] bg-gradient-to-b from-[#10B981] via-[#10B981]/50 to-transparent -translate-x-1/2 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        </div>
      </div>

      {/* WebGL Canvas */}
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]} className="!absolute inset-0 z-10" gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#8B5CF6" />
        <pointLight position={[-5, -3, 2]} intensity={1.2} color="#06B6D4" />
        <pointLight position={[0, 5, -3]} intensity={0.8} color="#EC4899" />
        <Core activeModule={activeModule} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} minPolarAngle={Math.PI / 2.8} maxPolarAngle={Math.PI / 1.8} />
      </Canvas>

      {/* User friendly overlays */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 text-[11px] font-mono font-bold tracking-widest text-white/70 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <span className={`transition-all ${activeModule === "software" ? "text-[#8B5CF6] scale-110" : "hover:text-white"}`}>CODE</span>
        <span>•</span>
        <span className={`transition-all ${activeModule === "cloud" ? "text-[#06B6D4] scale-110" : "hover:text-white"}`}>CLOUD</span>
        <span>•</span>
        <span className={`transition-all ${activeModule === "ai" ? "text-[#EC4899] scale-110" : "hover:text-white"}`}>AI</span>
        <span>•</span>
        <span className={`transition-all ${activeModule === "data" ? "text-[#10B981] scale-110" : "hover:text-white"}`}>DATA</span>
      </div>

      {/* Top status - more vibrant */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        <div className="flex items-center gap-2.5 text-[11px] font-mono font-bold tracking-widest text-white bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 px-4 py-2 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.3)]">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          CORE ONLINE • VIBRANT MODE
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono font-bold text-white/70 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <span>✦ CLICK</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>DRAG</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>SCROLL</span>
        </div>
      </div>

      {/* User friendly hint - bottom left */}
      <div className="absolute bottom-4 left-4 z-20 hidden lg:flex flex-col gap-1.5">
        <div className="font-mono text-[10px] tracking-widest text-white/50 bg-black/40 backdrop-blur px-2.5 py-1 rounded-full border border-white/5">💡 HOVER CARDS → GLOWS</div>
        <div className="font-mono text-[10px] tracking-widest text-white/50 bg-black/40 backdrop-blur px-2.5 py-1 rounded-full border border-white/5">🎯 CLICK MODULE → JUMP</div>
      </div>

      {/* Active module highlight pulse */}
      {activeModule && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className={`absolute inset-0 opacity-[0.03] transition-all duration-500 ${activeModule === "software" ? "bg-[#8B5CF6]" : activeModule === "cloud" ? "bg-[#06B6D4]" : activeModule === "ai" ? "bg-[#EC4899]" : "bg-[#10B981]"}`} />
        </div>
      )}
    </div>
  );
}
