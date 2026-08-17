"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sparkles, Ring, Torus, Text, Billboard } from "@react-three/drei";
import * as THREE from "three";

function Core({ activeModule, scrollProgress }: { activeModule: string | null; scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const isActive = !!activeModule;
    const scroll = scrollProgress; // 0 to 1
    
    // Base rotation + scroll-driven morph
    const baseSpeed = isActive ? 0.4 : 0.15;
    const scrollSpeed = 1 + scroll * 2; // Faster when scrolled
    
    if (meshRef.current) {
      meshRef.current.rotation.y = t * baseSpeed * scrollSpeed;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2 + scroll * 0.5;
      meshRef.current.rotation.z = Math.cos(t * 0.2) * 0.1 + scroll * 0.3;
      // Morph scale with scroll - expands
      const morphScale = 1 + scroll * 0.4 + (isActive ? Math.sin(t * 3) * 0.05 : 0);
      meshRef.current.scale.set(morphScale, morphScale, morphScale);
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08 + scroll * 0.5;
      const scale = isActive ? 1 + Math.sin(t * 3) * 0.04 : 1;
      // Scroll makes whole group slightly expand and tilt
      groupRef.current.scale.set(scale + scroll * 0.1, scale + scroll * 0.1, scale + scroll * 0.1);
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1 + scroll * -0.5;
    }
    if (glowRef.current) {
      const glowScale = 1 + Math.sin(t * 2) * 0.15 + scroll * 0.3;
      glowRef.current.scale.set(glowScale, glowScale, glowScale);
      // Color shift with scroll
      const material = glowRef.current.material as THREE.MeshStandardMaterial;
      if (material) {
        // Shift from cyan to purple to pink as scroll progresses
        const r = 0.02 + scroll * 0.5;
        const g = 0.71 - scroll * 0.3;
        const b = 0.83;
        material.emissive.setRGB(r, g * 0.8, b);
      }
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.y = t * 0.1 + scroll * 0.8;
      ringsRef.current.rotation.x = Math.sin(t * 0.2) * 0.2 + scroll * 0.3;
    }
  });

  // Scroll-driven ring scales
  const ringScale1 = 1 + scrollProgress * 0.8;
  const ringScale2 = 1 + scrollProgress * 0.6;
  const ringScale3 = 1 + scrollProgress * 0.4;
  const ringScale4 = 1 + scrollProgress * 0.3;

  return (
    <group ref={groupRef}>
      <group ref={ringsRef}>
        {/* Morphing rings - scale and opacity change with scroll */}
        <group scale={ringScale1}>
          <Ring args={[1.65, 1.72, 64]} rotation={[Math.PI / 2.5, 0, 0]}>
            <meshStandardMaterial color="#8B5CF6" transparent opacity={0.7 - scrollProgress * 0.2} side={THREE.DoubleSide} emissive="#8B5CF6" emissiveIntensity={1.5 + scrollProgress} />
          </Ring>
        </group>
        <group scale={ringScale2}>
          <Ring args={[2.05, 2.12, 64]} rotation={[0, Math.PI / 3, 0]}>
            <meshStandardMaterial color="#06B6D4" transparent opacity={0.6 - scrollProgress * 0.15} side={THREE.DoubleSide} emissive="#06B6D4" emissiveIntensity={1.2 + scrollProgress} />
          </Ring>
        </group>
        <group scale={ringScale3}>
          <Ring args={[2.45, 2.52, 64]} rotation={[Math.PI / 1.5, 0, Math.PI / 4]}>
            <meshStandardMaterial color="#EC4899" transparent opacity={0.45 - scrollProgress * 0.1} side={THREE.DoubleSide} emissive="#EC4899" emissiveIntensity={1.0 + scrollProgress * 0.5} />
          </Ring>
        </group>
        <group scale={ringScale4}>
          <Ring args={[2.85, 2.92, 48]} rotation={[Math.PI / 4, Math.PI / 2, 0]}>
            <meshStandardMaterial color="#10B981" transparent opacity={0.35 - scrollProgress * 0.1} side={THREE.DoubleSide} emissive="#10B981" emissiveIntensity={0.8 + scrollProgress} />
          </Ring>
        </group>
        {/* Extra scroll ring - appears on scroll */}
        {scrollProgress > 0.1 && (
          <Ring args={[3.3 + scrollProgress, 3.35 + scrollProgress, 32]} rotation={[Math.PI / 6, 0, Math.PI / 3]}>
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.15 * scrollProgress} side={THREE.DoubleSide} emissive="#FFFFFF" emissiveIntensity={0.5 * scrollProgress} />
          </Ring>
        )}
      </group>

      <Float speed={2 + scrollProgress} rotationIntensity={0.3 + scrollProgress * 0.2} floatIntensity={0.6 + scrollProgress * 0.4}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.3 + scrollProgress * 0.2, 2 + Math.floor(scrollProgress * 2)]} />
          <meshStandardMaterial
            color="#A855F7"
            emissive="#8B5CF6"
            emissiveIntensity={1.8 + scrollProgress}
            wireframe
            transparent
            opacity={1 - scrollProgress * 0.15}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.85, 32, 32]} />
          <meshStandardMaterial
            color="#0A0A0F"
            emissive="#8B5CF6"
            emissiveIntensity={0.5 + scrollProgress * 0.5}
            roughness={0.15}
            metalness={0.9}
          />
        </mesh>
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.48, 32, 32]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={2.5 + scrollProgress * 1.5}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9 + scrollProgress * 0.1} />
        </mesh>
      </Float>

      {/* Modules - with icons/text inside - clearly in front, no clipping */}
      {[
        { label: "CODE", basePos: [3.4, 0.7, 0.4], color: "#8B5CF6" as const, id: "software", icon: "◧" },
        { label: "CLOUD", basePos: [-3.4, 0.7, 0.4], color: "#06B6D4" as const, id: "cloud", icon: "☁" },
        { label: "AI", basePos: [0.4, 2.8, 1.3], color: "#EC4899" as const, id: "ai", icon: "✦" },
        { label: "DATA", basePos: [0.4, -2.8, 1.3], color: "#10B981" as const, id: "data", icon: "◫" },
      ].map((mod) => {
        const isActive = activeModule === mod.id;
        const expand = 1 + scrollProgress * 0.4;
        const pos: [number, number, number] = [mod.basePos[0] * expand, mod.basePos[1] * expand, mod.basePos[2]];
        return (
          <Float key={mod.label} speed={isActive ? 2.8 : 1.6} floatIntensity={isActive ? 1.2 : 0.5} rotationIntensity={0.3}>
            <group position={pos}>
              <mesh>
                <boxGeometry args={[1.0, 1.0, 0.25]} />
                <meshStandardMaterial
                  color={isActive ? mod.color : "#181825"}
                  emissive={mod.color}
                  emissiveIntensity={isActive ? 3.2 : 0.8}
                  transparent
                  opacity={0.96}
                  roughness={0.25}
                  metalness={0.6}
                />
              </mesh>
              {/* Black backing for text - ensures readability */}
              <mesh position={[0, 0, 0.16]}>
                <planeGeometry args={[0.8, 0.6]} />
                <meshBasicMaterial color="black" transparent opacity={0.85} />
              </mesh>
              {/* Icon + Label INSIDE - clearly in front of box (z=0.17) with thick outline */}
              <Billboard>
                <Text
                  position={[0, 0.15, 0.18]}
                  fontSize={0.38}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                  outlineWidth={0.06}
                  outlineColor="black"
                >
                  {mod.icon}
                </Text>
                <Text
                  position={[0, -0.2, 0.18]}
                  fontSize={0.18}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                  outlineWidth={0.05}
                  outlineColor="black"
                >
                  {mod.label}
                </Text>
              </Billboard>
              {isActive && (
                <>
                  <mesh position={[0, 0, -0.18]}>
                    <planeGeometry args={[1.9, 1.9]} />
                    <meshBasicMaterial color={mod.color} transparent opacity={0.4} />
                  </mesh>
                  <mesh position={[0, 0, -0.4]}>
                    <planeGeometry args={[2.9, 2.9]} />
                    <meshBasicMaterial color={mod.color} transparent opacity={0.18} />
                  </mesh>
                </>
              )}
            </group>
          </Float>
        );
      })}

      {/* High-density sparkles - density increases with scroll */}
      <Sparkles count={120 + Math.floor(scrollProgress * 80)} scale={5.5 + scrollProgress * 2} size={1.0 + scrollProgress * 0.3} speed={0.5 + scrollProgress * 0.3} opacity={0.8} color="#8B5CF6" />
      <Sparkles count={80 + Math.floor(scrollProgress * 50)} scale={4.5 + scrollProgress} size={0.7 + scrollProgress * 0.2} speed={0.35 + scrollProgress * 0.2} opacity={0.6} color="#06B6D4" />
      <Sparkles count={50 + Math.floor(scrollProgress * 30)} scale={4 + scrollProgress} size={0.6 + scrollProgress * 0.2} speed={0.4 + scrollProgress * 0.2} opacity={0.5} color="#EC4899" />
      <Sparkles count={30 + Math.floor(scrollProgress * 20)} scale={6 + scrollProgress} size={1.2} speed={0.2 + scrollProgress * 0.1} opacity={0.4} color="#FFFFFF" />
      {/* Scroll-emergent white sparkles */}
      {scrollProgress > 0.3 && (
        <Sparkles count={Math.floor((scrollProgress - 0.3) * 100)} scale={7} size={1.5} speed={0.6} opacity={scrollProgress * 0.5} color="#FFFFFF" />
      )}
    </group>
  );
}

export default function ComputationalCore({ activeModule, scrollProgress = 0 }: { activeModule: string | null; scrollProgress?: number }) {
  const scrollPercent = Math.round(scrollProgress * 100);

  return (
    <div className="relative w-full h-[500px] sm:h-[580px] lg:h-[680px] overflow-hidden rounded-[32px] bg-[#050507] border border-white/[0.12] shadow-[0_0_0_1px_rgba(139,92,246,0.15),0_0_100px_rgba(139,92,246,0.20),0_0_200px_rgba(6,182,214,0.10)] group">
      {/* High-quality grid with scroll morph */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: 0.15 + scrollProgress * 0.1,
          backgroundImage: `linear-gradient(rgba(139,92,246,${0.6 + scrollProgress * 0.3}) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(6,182,214,${0.4 + scrollProgress * 0.3}) 1.5px, transparent 1.5px)`,
          backgroundSize: `${28 - scrollProgress * 4}px ${28 - scrollProgress * 4}px`,
        }}
      />

      {/* Multi-layer vibrant glows that intensify on scroll */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-700" style={{ width: `${320 + scrollProgress * 120}px`, height: `${320 + scrollProgress * 120}px`, background: `radial-gradient(circle, rgba(139,92,246,${0.4 + scrollProgress * 0.2}) 0%, transparent 70%)`, filter: `blur(${60 + scrollProgress * 20}px)` }} />
      <div className="absolute top-1/3 right-1/3 w-[280px] h-[280px] bg-[#06B6D4]/30 blur-[60px] rounded-full pointer-events-none animate-pulse transition-all duration-700" style={{ transform: `scale(${1 + scrollProgress * 0.5})`, opacity: 0.6 + scrollProgress * 0.4 } as any} />
      <div className="absolute bottom-1/3 left-1/3 w-[220px] h-[220px] bg-[#EC4899]/20 blur-[50px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: "1.4s", transform: `scale(${1 + scrollProgress * 0.3})` } as any} />
      {/* Scroll-emergent third glow */}
      <div className="absolute top-[20%] left-[20%] w-[180px] h-[180px] bg-[#10B981]/15 blur-[40px] rounded-full pointer-events-none transition-all duration-700" style={{ opacity: scrollProgress, transform: `scale(${scrollProgress})` }} />

      {/* CSS FALLBACK - high quality complex scroll morph - NO module labels here (WebGL has icons inside now) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative" style={{ transform: `scale(${1 + scrollProgress * 0.1}) rotate(${scrollProgress * 6}deg)` }}>
          {/* 4 orbital rings - subtle, not overlapping labels */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-700" style={{ width: `${160 + scrollProgress * 20}px`, height: `${160 + scrollProgress * 20}px`, borderColor: `rgba(139,92,246,0.25)`, borderWidth: `1px` }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-700" style={{ width: `${200 + scrollProgress * 30}px`, height: `${200 + scrollProgress * 30}px`, borderColor: `rgba(6,182,214,0.2)`, transform: `translate(-50%, -50%) rotateX(70deg)` } as any} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] border border-[#EC4899]/15 rounded-full transition-all duration-700" style={{ width: `${240 + scrollProgress * 40}px`, height: `${240 + scrollProgress * 40}px` }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-700" style={{ width: `${280 + scrollProgress * 50}px`, height: `${280 + scrollProgress * 50}px`, borderColor: `rgba(16,185,129,0.12)` }} />

          {/* Central orb - limited max scale to avoid covering labels */}
          <div className="relative flex items-center justify-center" style={{ width: `${80 + scrollProgress * 12}px`, height: `${80 + scrollProgress * 12}px` }}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#8B5CF6] via-[#A855F7] to-[#06B6D4] blur-[2px] opacity-90 animate-pulse transition-all duration-700" style={{ filter: `blur(${2 + scrollProgress * 2}px)` }} />
            <div className="absolute inset-[2px] rounded-full bg-[#07080A] border-2 border-white/20 transition-all" style={{ borderWidth: `${2}px` }} />
            <div className="absolute inset-[12px] rounded-full bg-[#8B5CF6] blur-[10px] opacity-70 animate-pulse" />
            <div className="relative rounded-full bg-white shadow-[0_0_20px_#8B5CF6,0_0_40px_#8B5CF6] animate-pulse transition-all" style={{ width: `${12 + scrollProgress * 4}px`, height: `${12 + scrollProgress * 4}px` }} />
          </div>
        </div>
      </div>

      {/* WebGL Canvas - high quality */}
      <Canvas camera={{ position: [0, 0, 6], fov: 50 + scrollProgress * 5 }} dpr={[1, 2]} className="!absolute inset-0 z-10" gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.8 + scrollProgress * 0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5 + scrollProgress} color="#8B5CF6" />
        <pointLight position={[-5, -3, 2]} intensity={1.2 + scrollProgress} color="#06B6D4" />
        <pointLight position={[0, 5, -3]} intensity={0.8 + scrollProgress} color="#EC4899" />
        <Core activeModule={activeModule} scrollProgress={scrollProgress} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6 + scrollProgress * 0.8} minPolarAngle={Math.PI / 2.8} maxPolarAngle={Math.PI / 1.8} />
      </Canvas>

      {/* High-quality overlays */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 text-[11px] font-mono font-bold tracking-widest text-white/80 bg-black/70 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
        <span className={`transition-all px-1 ${activeModule === "software" ? "text-[#8B5CF6] scale-110 bg-[#8B5CF6]/20 rounded-full" : "hover:text-white"}`}>CODE</span>
        <span className="opacity-30">•</span>
        <span className={`transition-all px-1 ${activeModule === "cloud" ? "text-[#06B6D4] scale-110 bg-[#06B6D4]/20 rounded-full" : "hover:text-white"}`}>CLOUD</span>
        <span className="opacity-30">•</span>
        <span className={`transition-all px-1 ${activeModule === "ai" ? "text-[#EC4899] scale-110 bg-[#EC4899]/20 rounded-full" : "hover:text-white"}`}>AI</span>
        <span className="opacity-30">•</span>
        <span className={`transition-all px-1 ${activeModule === "data" ? "text-[#10B981] scale-110 bg-[#10B981]/20 rounded-full" : "hover:text-white"}`}>DATA</span>
      </div>

      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        <div className="flex items-center gap-2.5 text-[11px] font-mono font-bold tracking-widest text-white bg-[#8B5CF6]/25 border border-[#8B5CF6]/50 px-4 py-2 rounded-full backdrop-blur-md shadow-[0_0_25px_rgba(139,92,246,0.4)]">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
          CORE ONLINE • HIGH QUALITY • {scrollPercent}% SCROLL
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono font-bold text-white/80 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" /> MORPH {scrollPercent}%</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>✦ CLICK</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>DRAG</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span>SCROLL</span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-20 hidden lg:flex flex-col gap-1.5">
        <div className="font-mono text-[10px] tracking-widest text-white/60 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
          HOVER CARDS → GLOWS + MORPHS CORE
        </div>
        <div className="font-mono text-[10px] tracking-widest text-white/60 bg-black/50 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
          SCROLL → RINGS EXPAND • PARTICLES x{Math.floor(1 + scrollProgress * 2)} • LIGHTS x{ (1 + scrollProgress).toFixed(1)}
        </div>
      </div>

      {/* Scroll progress morph indicator */}
      <div className="absolute top-1/2 right-3 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-1">
        <div className="w-[2px] h-[120px] bg-white/10 rounded-full overflow-hidden">
          <div className="w-full bg-gradient-to-b from-[#8B5CF6] to-[#06B6D4] transition-all duration-300" style={{ height: `${scrollPercent}%` }} />
        </div>
        <span className="font-mono text-[9px] tracking-widest text-white/40 rotate-90 mt-2 origin-center whitespace-nowrap">SCROLL MORPH</span>
      </div>

      {activeModule && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className={`absolute inset-0 transition-all duration-700 ${activeModule === "software" ? "bg-[#8B5CF6]/[0.06]" : activeModule === "cloud" ? "bg-[#06B6D4]/[0.06]" : activeModule === "ai" ? "bg-[#EC4899]/[0.06]" : "bg-[#10B981]/[0.06]"}`} style={{ opacity: 0.03 + scrollProgress * 0.05 }} />
        </div>
      )}
    </div>
  );
}
