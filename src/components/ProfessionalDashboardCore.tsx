"use client";

import { useState, useEffect } from "react";

type Metric = {
  id: string;
  label: string;
  value: string;
  sub: string;
  trend: string;
  color: string;
  bg: string;
  evidence: string;
};

const metrics: Metric[] = [
  { id: "projects", label: "PROJECTS", value: "5+", sub: "Verified repos", trend: "↗ +2 this month", color: "#0F172A", bg: "#F8FAFC", evidence: "Kaya, Flood, Ardhi, Learning, GaloreHub" },
  { id: "certs", label: "CLOUD CERTS", value: "3", sub: "AWS • IBM • Oracle", trend: "● Certified", color: "#0369A1", bg: "#F0F9FF", evidence: "CLF-C02, IBM Practitioner, OCI Foundations" },
  { id: "skills", label: "SKILL EVIDENCE", value: "15+", sub: "Mapped to projects", trend: "↗ No %", color: "#14532D", bg: "#F0FDF4", evidence: "React→Flood, Flutter→Kaya, etc." },
  { id: "experience", label: "REAL-WORLD", value: "2", sub: "Intern + Attaché", trend: "AU Innovation", color: "#7C2D12", bg: "#FFF7ED", evidence: "SQL Server, D365, Trade ops" },
];

export default function ProfessionalDashboardCore({ activeModule }: { activeModule: string | null }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [counts, setCounts] = useState({ projects: 0, certs: 0, skills: 0, exp: 0 });

  useEffect(() => {
    const onScroll = () => {
      const prog = Math.min(window.scrollY / 900, 1);
      setScrollProgress(prog);
      // Animate counters based on scroll
      setCounts({
        projects: Math.round(prog * 5),
        certs: Math.round(prog * 3),
        skills: Math.round(prog * 15),
        exp: Math.round(prog * 2),
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative w-full h-[580px] lg:h-[620px] overflow-hidden rounded-[28px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-[0_0_0_1px_rgba(0,0,0,0.02),0_24px_64px_rgba(0,0,0,0.07),0_0_120px_rgba(15,23,42,0.04)]">
      {/* Subtle dot grid + 10% overlap text */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(#0F172A 1px, transparent 1px)`, backgroundSize: "20px 20px" }} />
        <div className="absolute left-[5%] top-[20%] font-bold text-[80px] leading-[0.85] tracking-tighter text-[#0F172A]/[0.10] select-none pointer-events-none">
          CODE
          <br />
          <span className="ml-8">CLOUD</span>
          <br />
          <span className="text-[#0F172A]/[0.06]">DATA</span>
        </div>
        <div className="absolute right-[8%] bottom-[18%] font-mono text-[11px] leading-4 tracking-widest text-[#0F172A]/[0.08] select-none pointer-events-none text-right">
          PROBLEM → RESEARCH
          <br />
          → DESIGN → BUILD
          <br />
          → TEST → AUTOMATE → IMPROVE
        </div>
      </div>

      {/* Header - Linear / Stripe dashboard style */}
      <div className="absolute top-0 left-0 right-0 h-[52px] border-b border-[#E2E8F0] bg-white/90 backdrop-blur-xl flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-black/5" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/5" />
            <div className="w-3 h-3 rounded-full bg-[#28CA42] border border-black/5" />
          </div>
          <div className="ml-3 flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold tracking-wide text-[#0F172A]">engineering-dashboard.tsx</span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-[#0F172A] text-white">10% OVERLAP • SCROLL MORPH</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-widest text-[#64748B] hidden sm:block">SCROLL {Math.round(scrollProgress * 100)}% • COUNTS MORPH</span>
          <div className="w-6 h-6 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[10px]">◧</div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="absolute inset-0 top-[52px] p-5 lg:p-6 flex flex-col gap-4 overflow-hidden">
        {/* Top metrics - morph on scroll */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {metrics.map((m, idx) => {
            const isHovered = hovered === m.id;
            const isActive = activeModule === m.id || (idx === 0 && !activeModule);
            const countVal = m.id === "projects" ? counts.projects : m.id === "certs" ? counts.certs : m.id === "skills" ? counts.skills : counts.exp;
            return (
              <div
                key={m.id}
                onMouseEnter={() => setHovered(m.id)}
                onMouseLeave={() => setHovered(null)}
                className={`relative rounded-[14px] border bg-white p-4 transition-all duration-500 cursor-pointer ${isActive || isHovered ? "border-[#0F172A] shadow-[0_12px_32px_rgba(15,23,42,0.10)] scale-[1.02] z-10" : "border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:border-[#CBD5E1]"}`}
                style={{ transform: `translateY(${scrollProgress * (idx % 2 === 0 ? -6 : 6)}px)` }}
              >
                <div className="flex justify-between items-start">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold border" style={{ backgroundColor: m.bg, borderColor: `${m.color}20`, color: m.color }}>
                    {m.label.slice(0, 2)}
                  </div>
                  <span className={`font-mono text-[9px] tracking-widest px-1.5 py-0.5 rounded-full border ${isActive ? "bg-[#0F172A] text-white border-[#0F172A]" : "bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]"}`}>
                    {m.trend}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="font-mono text-[10px] tracking-[0.15em] text-[#94A3B8]">{m.label}</div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-bold text-[22px] tracking-tight text-[#0F172A]">{m.id === "projects" ? `${countVal}+` : m.id === "certs" ? `${countVal}` : m.id === "skills" ? `${countVal}+` : `${countVal}`}</span>
                    <span className="font-mono text-[11px] text-[#64748B]">{m.sub}</span>
                  </div>
                  {/* Mini bar chart morphing on scroll */}
                  <div className="mt-3 h-[24px] flex items-end gap-1">
                    {[0.3, 0.6, 0.9, 0.5, 0.8, 0.4].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm transition-all duration-700"
                        style={{
                          height: `${h * (20 + scrollProgress * 40)}%`,
                          backgroundColor: isActive ? m.color : "#E2E8F0",
                          opacity: isActive ? 1 : 0.6 + scrollProgress * 0.4,
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 font-mono text-[10px] leading-3 text-[#94A3B8]">{m.evidence}</div>
                </div>
                {/* Active indicator */}
                {isActive && <div className="absolute top-0 left-4 right-4 h-[2px] bg-[#0F172A] rounded-full" />}
              </div>
            );
          })}
        </div>

        {/* Middle - Project pipeline visualization */}
        <div className="flex-1 grid lg:grid-cols-[1.3fr_0.7fr] gap-4 min-h-0">
          {/* Pipeline flow */}
          <div className="rounded-[14px] border border-[#E2E8F0] bg-[#F8FAFC] p-4 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-[11px] tracking-widest text-[#64748B]">PIPELINE • PROBLEM → IMPROVE • SCROLL MORPHS FLOW</div>
              <div className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#E2E8F0] text-[#64748B]">{Math.round(scrollProgress * 100)}% THROUGH</div>
            </div>
            <div className="relative h-[80px] flex items-center">
              {/* Pipeline track */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#E2E8F0] -translate-y-1/2" />
              <div className="absolute top-1/2 left-0 h-[2px] bg-[#0F172A] -translate-y-1/2 transition-all duration-300" style={{ width: `${scrollProgress * 100}%` }} />
              {/* Moving dot */}
              <div className="absolute top-1/2 w-3 h-3 rounded-full bg-[#0F172A] border-2 border-white shadow-[0_0_0_3px_rgba(15,23,42,0.1)] -translate-y-1/2 transition-all duration-300" style={{ left: `calc(${scrollProgress * 100}% - 6px)` }} />

              {["Problem", "Research", "Design", "Build", "Test", "Automate", "Improve"].map((step, i) => {
                const isPast = scrollProgress >= i / 6;
                return (
                  <div key={step} className="flex-1 flex flex-col items-center relative z-10">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold transition-all duration-500 ${isPast ? "bg-[#0F172A] border-[#0F172A] text-white scale-110 shadow-[0_0_0_4px_rgba(15,23,42,0.1)]" : "bg-white border-[#E2E8F0] text-[#94A3B8]"}`}>
                      {i + 1}
                    </div>
                    <div className={`mt-2 font-mono text-[9px] tracking-widest text-center leading-3 transition-colors ${isPast ? "text-[#0F172A] font-semibold" : "text-[#94A3B8]"}`}>{step}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 font-mono text-[10px] leading-4 text-[#64748B]">Scroll → pipeline fills, dot moves, stages activate. Your philosophy visualized — exactly what banks/consulting want to see: systematic, not chaotic.</div>
          </div>

          {/* Live GitHub mini */}
          <div className="rounded-[14px] border border-[#E2E8F0] bg-white p-4 flex flex-col">
            <div className="font-mono text-[11px] tracking-widest text-[#64748B]">LIVE GITHUB • /api/github</div>
            <div className="mt-3 space-y-2.5 flex-1">
              {[
                { name: "Kaya", lang: "Dart", stars: "—" },
                { name: "flood-detection", lang: "JS", stars: "—" },
                { name: "Mradi-wa-Ardhi", lang: "TS", stars: "—" },
              ].map((repo) => (
                <div key={repo.name} className="flex items-center justify-between py-2 border-b border-[#F1F5F9] last:border-0">
                  <div>
                    <div className="font-medium text-[12px]">{repo.name}</div>
                    <div className="font-mono text-[10px] text-[#94A3B8]">{repo.lang}</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              ))}
            </div>
            <div className="mt-3 font-mono text-[10px] text-[#94A3B8]">Server-side cached, no token exposed — professional, secure.</div>
          </div>
        </div>

        {/* Bottom - Evidence map teaser */}
        <div className="h-[56px] rounded-[12px] bg-[#0F172A] text-white px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center font-mono text-[10px] font-bold">↗</div>
            <div>
              <div className="font-mono text-[10px] tracking-widest text-white/50">SKILLS → EVIDENCE • NO PERCENTAGES</div>
              <div className="font-medium text-[12px]">React → Flood Detection • Flutter → Kaya • SQL → AU Innovation</div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full bg-white text-black">CORPORATE PROFESSIONAL</div>
        </div>
      </div>
    </div>
  );
}
