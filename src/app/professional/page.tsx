"use client";

import { useState, useEffect, useRef } from "react";
import { personalInfo, projects, skills, experience, certifications } from "@/data/portfolio";
import ProfessionalDashboardCore from "@/components/ProfessionalDashboardCore";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.17c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" /></svg>
);

export default function ProfessionalPage() {
  const [activeModule, setActiveModule] = useState("software");
  const [scrollY, setScrollY] = useState(0);
  const whatRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const secs = [
        { id: "kaya", ref: whatRef },
        { id: "flood", ref: problemsRef },
        { id: "ardhi", ref: projectsRef },
      ];
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = secs[i].ref.current;
        if (el && el.getBoundingClientRect().top < 450) {
          setActiveModule(secs[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (id: string) => {
    const map: Record<string, any> = { kaya: whatRef, flood: problemsRef, ardhi: projectsRef, software: whatRef };
    map[id]?.current?.scrollIntoView({ behavior: "smooth" });
    setActiveModule(id);
  };

  return (
    <div className="min-h-screen bg-[#FCFDFD] text-[#0F172A] antialiased">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#E2E8F0]">
        <div className="mx-auto max-w-[1280px] px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[10px] bg-[#0F172A] text-white flex items-center justify-center font-mono font-bold text-[11px]">DK</div>
            <div>
              <div className="font-semibold tracking-tight text-[14px]">Derick Kitavi</div>
              <div className="font-mono text-[10px] text-[#64748B]">PROFESSIONAL • DASHBOARD METRICS • 10% OVERLAP • PIPELINE MORPH</div>
            </div>
            <span className="ml-3 hidden lg:inline-flex font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 animate-pulse">● LIVE • {scrollY}px • {activeModule.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="font-mono text-[11px] tracking-widest px-3 h-8 rounded-full bg-[#0F172A] text-white flex items-center">← FUTURISTIC</a>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-[1280px] px-6 pt-10 pb-16 grid lg:grid-cols-[1.05fr_1fr] gap-8 items-start">
        <div className="lg:sticky lg:top-24">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wide bg-white border border-[#E2E8F0] shadow-sm px-3 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            DASHBOARD METRICS • 4 KPIs • PIPELINE FLOW • 10% OVERLAP
          </div>
          <h1 className="mt-6 font-bold tracking-tighter leading-[0.88]">
            <span className="block text-[12px] font-mono tracking-[0.25em] text-[#64748B] mb-3">SOFTWARE ENGINEER | CLOUD & INTELLIGENT SYSTEMS</span>
            <span className="block text-[52px] lg:text-[60px] text-[#0F172A]">Derick</span>
            <span className="block text-[52px] lg:text-[60px] text-[#0F172A]/[0.10] relative">
              Kitavi
              <span className="absolute -top-1 -right-6 bg-[#0F172A] text-white font-mono text-[10px] px-2 py-1 rounded-full rotate-3">10% OVERLAP</span>
            </span>
          </h1>
          <p className="mt-5 text-[15px] leading-7 text-[#475569] max-w-[44ch]">{personalInfo.tagline}</p>

          <div className="mt-6 rounded-[14px] border border-[#E2E8F0] bg-white p-4 shadow-sm">
            <div className="font-mono text-[11px] tracking-widest text-[#94A3B8] mb-2">NEW SCROLL EFFECT: DASHBOARD METRICS MORPH (CORPORATE)</div>
            <ul className="font-mono text-[11px] leading-5 text-[#475569] space-y-1">
              <li>• 4 islands in isometric 30° grid: Kaya, Flood, Ardhi, Learning</li>
              <li>• Scroll → islands parallax ±15px + tilt follows mouse 6°</li>
              <li>• 10% overlap: CODE CLOUD AI text behind islands at 10% opacity</li>
              <li>• Click island → flips to show evidence (React → Flood, etc.)</li>
              <li>• Dashed lines connect islands to central CORE</li>
            </ul>
          </div>

          <div className="mt-6 flex gap-2">
            <button onClick={() => scrollToId("kaya")} className="bg-[#0F172A] text-white px-5 h-11 rounded-full text-[13px] font-medium">Explore Dashboard ↓</button>
            <a href={personalInfo.github} target="_blank" className="bg-white border border-[#E2E8F0] px-5 h-11 rounded-full text-[13px] font-medium flex items-center gap-2"><GithubIcon className="w-4 h-4" /> {personalInfo.githubUsername}</a>
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <ProfessionalDashboardCore activeModule={activeModule} />
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              { id: "kaya", title: "Kaya Island", sub: "Fintech • AI Agent", action: "Flip → Flutter → Kaya" },
              { id: "flood", title: "Flood Island", sub: "Map • Scraping", action: "Flip → React → Flood" },
              { id: "ardhi", title: "Ardhi Island", sub: "Docs • AI", action: "Flip → Prompt Eng" },
              { id: "learning", title: "Data Island", sub: "Python • Algo", action: "Flip → Python → Learning" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveModule(c.id)}
                className={`text-left p-3 rounded-xl border bg-white transition-all shadow-sm ${activeModule === c.id ? "border-[#0F172A] shadow-[0_8px_24px_rgba(0,0,0,0.10)] scale-[1.02]" : "border-[#E2E8F0] hover:border-[#CBD5E1]"}`}
              >
                <div className="font-semibold text-[12px]">{c.title}</div>
                <div className="font-mono text-[11px] text-[#64748B]">{c.sub}</div>
                <div className="font-mono text-[10px] text-[#94A3B8] mt-1 pt-1 border-t border-[#F1F5F9]">{c.action}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section ref={whatRef} className="mx-auto max-w-[1280px] px-6 py-16 border-t border-[#E2E8F0] scroll-mt-24 bg-[#F8FAFC]/40">
        <div className="font-mono text-[11px] tracking-[0.2em] text-[#64748B]">02 — KAYA ISLAND → GROUP SAVINGS</div>
        <h2 className="mt-2 text-[28px] font-bold tracking-tight">Isometric islands represent real projects</h2>
        <div className="mt-6 rounded-xl border border-[#E2E8F0] bg-white p-5">
          <div className="font-mono text-[11px] tracking-widest text-[#94A3B8]">HOW FLIP WORKS</div>
          <div className="mt-2 text-[13px] leading-6 text-[#475569]">Front: Island shows project name + emoji + short desc. Click → 3D flip Y 180° → Back shows <span className="font-mono bg-[#0F172A] text-white px-1.5 py-0.5 rounded">evidence</span> like <span className="bg-[#F1F5F9] border border-[#E2E8F0] px-1.5 py-0.5 rounded font-mono text-[11px]">Flutter → Kaya</span> instead of percentages. This proves Skills → Evidence.</div>
        </div>
      </section>

      <section ref={problemsRef} className="mx-auto max-w-[1280px] px-6 py-16 border-t border-[#E2E8F0] scroll-mt-24">
        <div className="font-mono text-[11px] tracking-[0.2em] text-[#64748B]">03 — FLOOD ISLAND → MAPS & SOCIAL SIGNALS</div>
        <h2 className="text-[28px] font-bold tracking-tight mt-2">Scroll parallax: islands drift in opposite directions</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {projects.slice(0,3).map((p)=>(
            <div key={p.id} className="rounded-xl border border-[#E2E8F0] bg-white p-5">
              <div className="font-semibold text-[14px]">{p.title}</div>
              <div className="text-[12px] text-[#64748B] mt-1">{p.problem.slice(0,70)}...</div>
              <div className="mt-3 font-mono text-[10px] px-2 py-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] inline-block">{p.tags[0]}</div>
            </div>
          ))}
        </div>
      </section>

      <section ref={projectsRef} className="mx-auto max-w-[1280px] px-6 py-12 border-t border-[#E2E8F0] scroll-mt-24">
        <div className="rounded-[20px] bg-[#0F172A] text-white p-7 flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <div className="font-mono text-[11px] tracking-widest text-white/50">PROFESSIONAL • DASHBOARD METRICS MORPH • 10% OVERLAP</div>
            <h3 className="mt-2 text-[22px] font-bold tracking-tight">You picked: Dashboard Metrics + 10% overlap</h3>
            <p className="mt-2 text-white/60 text-[13px] max-w-[50ch]">Islands were too playful. Now: Corporate dashboard with KPI cards that morph counts on scroll (5+ projects, 3 certs, 15+ skills), pipeline Problem→Improve fills as you scroll, bar charts animate. 10% overlap CODE CLOUD behind grid — professional, not playful.</p>
          </div>
          <div className="flex gap-2 items-start">
            <a href="/" className="bg-white text-black px-5 h-10 rounded-full text-[13px] font-medium flex items-center">Futuristic →</a>
            <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} className="bg-white/10 border border-white/20 px-5 h-10 rounded-full text-[13px]">Top ↑</button>
          </div>
        </div>
      </section>
    </div>
  );
}
