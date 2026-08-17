"use client";

import { useState, useEffect } from "react";

type Island = {
  id: string;
  title: string;
  short: string;
  islandEmoji: string;
  color: string;
  accent: string;
  front: { label: string; desc: string };
  back: { evidence: string[] };
  pos: { x: number; y: number };
};

const islands: Island[] = [
  {
    id: "kaya",
    title: "Kaya",
    short: "KAYA",
    islandEmoji: "🏦",
    color: "#0F172A",
    accent: "#0F172A",
    front: { label: "Fintech Island", desc: "Group savings & AI agent" },
    back: { evidence: ["Flutter → Kaya", "AI Agent → Kaya", "Dart • Fintech"] },
    pos: { x: -70, y: -60 },
  },
  {
    id: "flood",
    title: "Flood Detection",
    short: "FLOOD",
    islandEmoji: "🌊",
    color: "#0369A1",
    accent: "#0891B2",
    front: { label: "Map Island", desc: "Scraping X + mapping risk" },
    back: { evidence: ["React → Flood Detection", "Tailwind • APIs • Maps"] },
    pos: { x: 80, y: -40 },
  },
  {
    id: "ardhi",
    title: "Mradi wa Ardhi",
    short: "ARDHI",
    islandEmoji: "📜",
    color: "#854D0E",
    accent: "#A16207",
    front: { label: "Document Island", desc: "AI-assisted title deed check" },
    back: { evidence: ["Prompt Eng → Mradi wa Ardhi", "TypeScript • AI"] },
    pos: { x: -60, y: 65 },
  },
  {
    id: "learning",
    title: "Learning System",
    short: "LEARN",
    islandEmoji: "📊",
    color: "#14532D",
    accent: "#15803D",
    front: { label: "Data Island", desc: "Algorithms & probability" },
    back: { evidence: ["Python → Learning Systems", "Algorithms • Probability"] },
    pos: { x: 70, y: 75 },
  },
];

export default function ProfessionalIslandsCore({ activeModule }: { activeModule: string | null }) {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollProgress(Math.min(window.scrollY / 800, 1));
    };
    const onMouse = (e: MouseEvent) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 6,
        y: (e.clientY / window.innerHeight - 0.5) * -4,
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  const toggleFlip = (id: string) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative w-full h-[580px] lg:h-[620px] overflow-hidden rounded-[28px] bg-[#FCFDFF] border border-[#E2E8F0] shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_24px_64px_rgba(0,0,0,0.07)]">
      {/* Isometric grid background - 10% overlap */}
      <div className="absolute inset-0">
        {/* Base grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(30deg, #0F172A 12%, transparent 12.5%, transparent 87%, #0F172A 87.5%, #0F172A), linear-gradient(150deg, #0F172A 12%, transparent 12.5%, transparent 87%, #0F172A 87.5%, #0F172A), linear-gradient(30deg, #0F172A 12%, transparent 12.5%, transparent 87%, #0F172A 87.5%, #0F172A), linear-gradient(150deg, #0F172A 12%, transparent 12.5%, transparent 87%, #0F172A 87.5%, #0F172A), linear-gradient(60deg, #E2E8F0 25%, transparent 25.5%, transparent 75%, #E2E8F0 75%, #E2E8F0), linear-gradient(60deg, #E2E8F0 25%, transparent 25.5%, transparent 75%, #E2E8F0 75%, #E2E8F0)`,
            backgroundSize: "40px 70px",
            backgroundPosition: "0 0, 0 0, 20px 35px, 20px 35px, 0 0, 20px 35px",
          }}
        />
        {/* Overlap text - 10% as requested */}
        <div className="absolute left-[6%] top-[18%] font-bold text-[88px] leading-[0.85] tracking-tighter text-[#0F172A]/[0.10] select-none pointer-events-none">
          CODE
          <br />
          <span className="ml-10">CLOUD</span>
          <br />
          <span className="text-[#0F172A]/[0.07]">AI SYSTEMS</span>
        </div>
        {/* Connecting lines between islands */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12]">
          <line x1="40%" y1="38%" x2="60%" y2="42%" stroke="#0F172A" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="40%" y1="62%" x2="60%" y2="58%" stroke="#0F172A" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="45%" y1="42%" x2="45%" y2="58%" stroke="#0F172A" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="55%" y1="42%" x2="55%" y2="58%" stroke="#0F172A" strokeWidth="1" strokeDasharray="6 6" />
        </svg>
      </div>

      {/* Window chrome */}
      <div className="absolute top-0 left-0 right-0 h-[44px] border-b border-[#E2E8F0] bg-white/90 backdrop-blur-xl flex items-center justify-between px-5 z-20">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-black/5" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/5" />
            <div className="w-3 h-3 rounded-full bg-[#28CA42] border border-black/5" />
          </div>
          <span className="ml-3 font-mono text-[11px] font-medium text-[#0F172A]">islands.tsx • 4 projects • isometric</span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#0F172A] text-white">10% OVERLAP • FLIP ON CLICK</span>
        </div>
        <div className="font-mono text-[10px] text-[#94A3B8]">SCROLL {Math.round(scrollProgress * 100)}% • TILT {tilt.x.toFixed(1)}°</div>
      </div>

      {/* Islands Scene */}
      <div className="absolute inset-0 top-[44px] flex items-center justify-center" style={{ perspective: "1200px" }}>
        <div
          className="relative w-[380px] h-[380px] transition-transform duration-700 ease-out"
          style={{
            transform: `rotateX(${8 + tilt.y}deg) rotateZ(${-2 + tilt.x * 0.5}deg) translateY(${scrollProgress * -20}px)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Central hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 z-0">
            <div className="w-full h-full rounded-full bg-white border border-[#E2E8F0] shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center justify-center font-mono font-bold text-[10px]">CORE</div>
            <div className="absolute inset-0 rounded-full bg-[#0F172A]/5 blur-[12px] -z-10" />
          </div>

          {islands.map((island) => {
            const isFlipped = flipped[island.id];
            const isActive = activeModule === island.id || activeModule === "software";
            return (
              <div
                key={island.id}
                className="absolute top-1/2 left-1/2 w-[148px] h-[96px] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  transform: `translate(${island.pos.x}px, ${island.pos.y + scrollProgress * (island.pos.y > 0 ? 15 : -15)}px) rotateX(55deg) rotateZ(-45deg)`,
                  zIndex: isActive ? 10 : 1,
                }}
                onClick={() => toggleFlip(island.id)}
              >
                {/* Isometric island - flip container */}
                <div
                  className={`relative w-full h-full transition-all duration-700 preserve-3d ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front face - island top */}
                  <div
                    className={`absolute inset-0 rounded-[12px] border-2 bg-white p-3 flex flex-col justify-between shadow-[0_8px_20px_rgba(0,0,0,0.08)] backface-hidden transition-all duration-500 ${
                      isActive ? "border-[#0F172A] shadow-[0_12px_32px_rgba(0,0,0,0.12)] scale-[1.05]" : "border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-[0_12px_28px_rgba(0,0,0,0.1)]"
                    }`}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[14px] border" style={{ backgroundColor: `${island.color}0D`, borderColor: `${island.color}20` }}>
                        {island.islandEmoji}
                      </div>
                      <div className="flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-[#E2E8F0]"}`} />
                        <span className="font-mono text-[9px] tracking-widest text-[#94A3B8]">{island.short}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-[11px] leading-tight tracking-tight" style={{ color: island.color }}>{island.title}</div>
                      <div className="font-mono text-[10px] text-[#64748B] mt-0.5 leading-3">{island.front.desc}</div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-[8px] tracking-widest px-1.5 py-0.5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B]">CLICK → FLIP</span>
                      <span className="text-[10px]">↗</span>
                    </div>
                  </div>

                  {/* Back face - evidence */}
                  <div
                    className="absolute inset-0 rounded-[12px] border-2 bg-[#0F172A] p-3 flex flex-col justify-between shadow-[0_8px_20px_rgba(0,0,0,0.15)] backface-hidden"
                    style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                  >
                    <div className="font-mono text-[9px] tracking-widest text-white/50">EVIDENCE • {island.short}</div>
                    <div className="space-y-1.5 mt-2">
                      {island.back.evidence.map((ev) => (
                        <div key={ev} className="flex items-center gap-1.5 text-[10px] text-white/80 leading-3">
                          <div className="w-1 h-1 rounded-full bg-emerald-400" />
                          {ev}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center">
                      <span className="font-mono text-[8px] tracking-widest text-white/40">↩ CLICK TO FLIP BACK</span>
                      <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-white text-black">VERIFIED</span>
                    </div>
                  </div>
                </div>

                {/* Isometric sides - give 3D depth */}
                <div className="absolute top-[4px] left-[2px] right-[-4px] bottom-[-6px] rounded-[12px] bg-[#E2E8F0] -z-10 opacity-60" style={{ transform: "translateZ(-6px)" }} />
                <div className="absolute top-[6px] left-[4px] right-[-6px] bottom-[-10px] rounded-[12px] bg-[#F1F5F9] -z-20 opacity-40" style={{ transform: "translateZ(-12px)" }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom bar with instructions */}
      <div className="absolute bottom-0 left-0 right-0 h-[44px] border-t border-[#E2E8F0] bg-white/95 backdrop-blur grid grid-cols-[1.5fr_1fr_1fr] divide-x divide-[#E2E8F0] z-20">
        <div className="px-4 flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-[10px]">✦</div>
          <div className="font-mono text-[10px] leading-3">
            <div className="tracking-widest text-[#94A3B8]">ISOMETRIC ISLANDS • 10% OVERLAP</div>
            <div className="font-semibold text-[#0F172A]">Click island → flip to evidence</div>
          </div>
        </div>
        <div className="px-4 flex flex-col justify-center">
          <div className="font-mono text-[9px] tracking-widest text-[#94A3B8]">SCROLL</div>
          <div className="font-semibold text-[11px]">Parallax • Islands drift ±15px</div>
        </div>
        <div className="px-4 flex flex-col justify-center">
          <div className="font-mono text-[9px] tracking-widest text-[#94A3B8]">OVERLAP</div>
          <div className="font-semibold text-[11px]">CODE CLOUD AI at 10% behind</div>
        </div>
      </div>
    </div>
  );
}
