"use client";

import { useState, useEffect } from "react";

export default function ProfessionalCore({ activeModule }: { activeModule: string | null }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * -8;
      setTilt({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div className="relative w-full h-[520px] lg:h-[580px] overflow-hidden rounded-[28px] bg-[#FCFDFF] border border-[#E2E8F0] shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_20px_60px_rgba(0,0,0,0.06)]">
      {/* Premium grid */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.4]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-[#F8FAFC]/80" />
      </div>

      {/* Window chrome - premium */}
      <div className="absolute top-0 left-0 right-0 h-[44px] border-b border-[#E2E8F0] bg-white/90 backdrop-blur-xl flex items-center justify-between px-5 z-10">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-black/5" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/5" />
            <div className="w-3 h-3 rounded-full bg-[#28CA42] border border-black/5" />
          </div>
          <div className="ml-3 flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-[#0F172A] flex items-center justify-center text-[8px] text-white font-bold">⌘</div>
            <span className="font-mono text-[11px] tracking-wide text-[#0F172A] font-medium">derick-kitavi / core / system.tsx</span>
            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700">● LIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest text-[#94A3B8] hidden sm:block">TS • 4 MODULES • READY</span>
          <div className="w-6 h-6 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center">↗</div>
        </div>
      </div>

      {/* Isometric / Stack Scene - Premium */}
      <div className="absolute inset-0 top-[44px] flex items-center justify-center perspective-[1200px]">
        {/* Background glow */}
        <div className="absolute w-[380px] h-[380px] bg-gradient-to-br from-[#E0E7FF] via-[#F0F9FF] to-[#ECFDF5] blur-[60px] rounded-full opacity-60" />

        {/* Overlap text - 3% */}
        <div className="absolute left-[8%] top-[22%] font-bold text-[88px] leading-none tracking-tighter text-[#0F172A]/[0.025] select-none pointer-events-none rotate-[-4deg]">
          CODE
          <br />
          <span className="ml-12">CLOUD</span>
          <br />
          AI
        </div>

        {/* 3D Stack with mouse tilt */}
        <div
          className="relative transition-transform duration-700 ease-out preserve-3d"
          style={{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`, transformStyle: "preserve-3d" as any }}
        >
          {/* Shadow */}
          <div className="absolute top-[68%] left-1/2 -translate-x-1/2 w-[300px] h-[40px] bg-[#0F172A]/[0.06] blur-[24px] rounded-full" />

          {[
            { id: "software", icon: "◧", title: "Software Engineering", desc: "React • Next.js • Flutter • Python", meta: "4 projects • Evidence: Flood Detection", color: "#0F172A", y: -56, rot: -4, z: 40 },
            { id: "cloud", icon: "☁", title: "Cloud & DevOps Trajectory", desc: "AWS CLF-C02 • IBM • Oracle • Learning CI/CD", meta: "3 certs • Developing deployment", color: "#334155", y: -18, rot: 2.5, z: 30 },
            { id: "ai", icon: "✦", title: "AI & Agent Systems", desc: "Prompt Eng • Context Eng • Agents • APIs", meta: "Kaya AI • Mradi wa Ardhi", color: "#475569", y: 18, rot: -1.5, z: 20 },
            { id: "data", icon: "◫", title: "Business Automation", desc: "SQL Server • Dynamics 365 • Reporting • ERP", meta: "AU Innovation • Real-world", color: "#64748B", y: 54, rot: 1, z: 10 },
          ].map((card) => {
            const isActive = activeModule === card.id;
            return (
              <div
                key={card.id}
                className={`absolute left-1/2 top-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-[16px] border bg-white p-5 transition-all duration-500 cursor-pointer group ${
                  isActive
                    ? "border-[#0F172A] shadow-[0_20px_60px_rgba(15,23,42,0.12),0_0_0_1px_rgba(15,23,42,1)] z-50 scale-[1.03]"
                    : "border-[#E2E8F0] shadow-[0_8px_24px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-[#CBD5E1]"
                }`}
                style={{
                  transform: `translate(-50%, calc(-50% + ${card.y}px)) rotate(${card.rot}deg) translateZ(${isActive ? card.z + 20 : card.z}px)`,
                  zIndex: card.z,
                }}
              >
                {/* Top accent */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] rounded-full transition ${isActive ? "bg-[#0F172A]" : "bg-[#E2E8F0] group-hover:bg-[#CBD5E1]"}`} />
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-[13px] font-bold border transition ${isActive ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] group-hover:bg-[#0F172A] group-hover:text-white"}`}>
                      {card.icon}
                    </div>
                    <div className={`w-2 h-2 rounded-full transition ${isActive ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-[#E2E8F0] group-hover:bg-[#94A3B8]"}`} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`font-mono text-[10px] tracking-widest px-2 py-1 rounded-full border transition ${isActive ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]"}`}>0{["software", "cloud", "ai", "data"].indexOf(card.id) + 1}</span>
                    <span className="w-5 h-5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[10px]">↗</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="font-semibold text-[13.5px] tracking-tight text-[#0F172A]">{card.title}</div>
                  <div className="mt-1 font-mono text-[11px] leading-5 text-[#64748B]">{card.desc}</div>
                  <div className={`mt-3 pt-3 border-t font-mono text-[10.5px] leading-4 flex items-center gap-2 transition ${isActive ? "border-[#E2E8F0] text-[#0F172A] opacity-100" : "border-[#F1F5F9] text-[#94A3B8] opacity-80"}`}>
                    <span className={`w-1 h-1 rounded-full ${isActive ? "bg-emerald-500" : "bg-[#CBD5E1]"}`} />
                    {card.meta}
                    {isActive && <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-[#0F172A] text-white">ACTIVE</span>}
                  </div>
                </div>
                {/* Connection line to next card */}
                {card.id !== "data" && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[1px] h-3 bg-gradient-to-b from-[#E2E8F0] to-transparent" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom system bar - premium dashboard */}
      <div className="absolute bottom-0 left-0 right-0 h-[48px] border-t border-[#E2E8F0] bg-white/95 backdrop-blur-xl grid grid-cols-[1.2fr_1fr_1fr_1fr] divide-x divide-[#E2E8F0] z-10">
        <div className="px-4 flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-[#0F172A] text-white flex items-center justify-center font-mono text-[10px] font-bold">DK</div>
          <div>
            <div className="font-mono text-[10px] tracking-widest text-[#94A3B8] leading-none">SYSTEM</div>
            <div className="font-semibold text-[11px] text-[#0F172A]">READY • 4 MODULES</div>
          </div>
        </div>
        {[
          { k: "PROJECTS", v: "5+", sub: "GitHub" },
          { k: "CERTS", v: "3", sub: "AWS/IBM/Oracle" },
          { k: "STATUS", v: "OPEN TO WORK", sub: "Nairobi → Remote" },
        ].map((s) => (
          <div key={s.k} className="px-4 flex flex-col justify-center">
            <div className="font-mono text-[9px] tracking-[0.15em] text-[#94A3B8]">{s.k}</div>
            <div className="font-semibold text-[11px] text-[#0F172A] mt-0.5 leading-none">{s.v}</div>
            <div className="font-mono text-[9px] text-[#64748B]">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Subtle vignette */}
      <div className="absolute inset-0 top-[44px] bg-gradient-to-b from-transparent via-transparent to-[#F8FAFC]/40 pointer-events-none" />
    </div>
  );
}
