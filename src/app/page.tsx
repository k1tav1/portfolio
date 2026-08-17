"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, MapPin, ExternalLink, ArrowUpRight, Code2, Cloud, Brain, Building2, ChevronRight, Sparkles, GraduationCap, Award, Activity } from "lucide-react";
import { personalInfo, projects, skills, experience, education, certifications, currentlyBuilding } from "@/data/portfolio";
import SkillsGraph from "@/components/SkillsGraph";
import AIPortfolioAssistant from "@/components/AIPortfolioAssistant";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.17c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" /></svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
);

const ComputationalCore = dynamic(() => import("@/components/ComputationalCore"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-[32px] bg-[#07080A] border border-white/[0.08] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#8B5CF6] border-t-transparent animate-spin" />
        <span className="font-mono text-[10px] tracking-widest text-white/40">INITIALIZING CORE • CSS FALLBACK ACTIVE</span>
      </div>
    </div>
  ),
});

export default function Home() {
  const [activeModule, setActiveModule] = useState<string>("software");
  const [scrollY, setScrollY] = useState(0);
  const [githubData, setGithubData] = useState<any[]>([]);
  const whatBuildRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const coreScale = useTransform(scrollYProgress, [0, 0.25, 0.5], [1, 0.9, 0.75]);
  const coreY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const coreRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0.85]);
  const bgIntensity = useTransform(scrollYProgress, [0, 0.5], [0.10, 0.25]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = [
        { id: "software", el: whatBuildRef.current },
        { id: "cloud", el: problemsRef.current },
        { id: "ai", el: projectsRef.current },
        { id: "data", el: skillsRef.current },
      ];
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.el && sec.el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActiveModule(sec.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/github").then(r=>r.json()).then(setGithubData).catch(()=>{});
  }, []);

  const scrollToSection = (id: string) => {
    const map: Record<string, React.RefObject<HTMLDivElement | null>> = {
      software: whatBuildRef,
      cloud: problemsRef,
      ai: projectsRef,
      data: skillsRef,
    };
    map[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveModule(id);
  };

  const philosophySteps = personalInfo.philosophy.split(" → ");

  return (
    <div className="min-h-screen bg-[#050507] text-white antialiased selection:bg-[#8B5CF6]/30">
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#06B6D4] z-[100] origin-left shadow-[0_0_10px_rgba(139,92,246,0.8)]" style={{ scaleX: scrollYProgress }} />
      <motion.div className="fixed inset-0 pointer-events-none" style={{ opacity: bgIntensity }}>
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-[#8B5CF6]/20 blur-[200px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px] bg-[#06B6D4]/[0.15] blur-[200px] rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[30%] right-[20%] w-[500px] h-[500px] bg-[#EC4899]/[0.12] blur-[150px] rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
      </motion.div>

      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#050507]/80 border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1280px] px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center font-mono font-bold text-[11px]">DK</div>
            <div className="font-bold tracking-tight hidden sm:block">DERICK KITAVI</div>
            <span className="hidden sm:inline-flex ml-2 font-mono text-[9px] tracking-widest px-2 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/20 text-[#8B5CF6]">FUTURISTIC • LOCKED • {Math.round(scrollY)}px</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="#contact" className="font-mono text-[11px] tracking-widest px-3 h-8 rounded-full bg-white text-black flex items-center">CONTACT</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative mx-auto max-w-[1280px] px-6 pt-8 pb-8">
        <motion.div style={{ opacity: heroOpacity }} className="grid lg:grid-cols-[1.05fr_1.25fr_0.9fr] gap-6 items-start">
          <div className="order-2 lg:order-1 lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 px-3 py-1 rounded-full mb-5">
              <Sparkles className="w-3 h-3" /> OPEN TO WORK • NAIROBI → REMOTE • SCROLL ACTIVE
            </div>
            <h1 className="font-bold tracking-tight">
              <span className="block text-[12px] font-mono tracking-[0.3em] text-white/40 mb-2">Hi, I'm</span>
              <span className="block text-[48px] lg:text-[56px] leading-[0.9]">DERICK</span>
              <span className="block text-[48px] lg:text-[56px] leading-[0.9] bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent relative">KITAVI
                <span className="absolute -top-6 -right-8 w-20 h-20 rounded-full bg-[#8B5CF6]/20 blur-[20px] pointer-events-none animate-pulse" />
              </span>
            </h1>
            <div className="mt-3 font-mono text-[12px] tracking-[0.15em] text-white/50">{personalInfo.role}</div>
            <p className="mt-5 text-[15px] leading-7 text-white/60 max-w-[34ch]">{personalInfo.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {philosophySteps.map((s, i) => (
                <span key={s} className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60">{s}</span>
                  {i < philosophySteps.length - 1 && <ChevronRight className="w-3 h-3 text-white/20" />}
                </span>
              ))}
            </div>
            <div className="mt-7 flex gap-3">
              <button onClick={()=>scrollToSection("ai")} className="bg-white text-black px-5 h-10 rounded-full text-[13px] font-medium flex items-center gap-2">Explore My Work ↓<ArrowUpRight className="w-4 h-4" /></button>
              <a href={personalInfo.github} target="_blank" className="bg-white/[0.08] border border-white/[0.12] px-5 h-10 rounded-full text-[13px] flex items-center gap-2"><GithubIcon className="w-4 h-4" /> {personalInfo.githubUsername}</a>
            </div>
          </div>

          <motion.div style={{ scale: coreScale, y: coreY, rotate: coreRotate }} className="order-1 lg:order-2 lg:sticky lg:top-24">
            <div className="relative">
              <ComputationalCore activeModule={activeModule} scrollProgress={Math.min(scrollY / 800, 1)} />
              <div className="absolute inset-0 z-20 grid grid-cols-2 grid-rows-2 gap-2 p-8 pointer-events-none">
                <button onClick={() => scrollToSection("software")} className="pointer-events-auto rounded-xl bg-[#8B5CF6]/0 hover:bg-[#8B5CF6]/10 border border-transparent hover:border-[#8B5CF6]/30 transition flex items-end p-2"><span className="font-mono text-[10px] text-white/0 hover:text-[#8B5CF6]">→ SOFTWARE</span></button>
                <button onClick={() => scrollToSection("cloud")} className="pointer-events-auto rounded-xl bg-[#06B6D4]/0 hover:bg-[#06B6D4]/10 border border-transparent hover:border-[#06B6D4]/30 transition flex items-end justify-end p-2"><span className="font-mono text-[10px] text-white/0 hover:text-[#06B6D4]">CLOUD →</span></button>
                <button onClick={() => scrollToSection("ai")} className="pointer-events-auto rounded-xl bg-[#EC4899]/0 hover:bg-[#EC4899]/10 border border-transparent hover:border-[#EC4899]/30 transition flex items-start p-2"><span className="font-mono text-[10px] text-white/0 hover:text-[#EC4899]">→ AI</span></button>
                <button onClick={() => scrollToSection("data")} className="pointer-events-auto rounded-xl bg-[#10B981]/0 hover:bg-[#10B981]/10 border border-transparent hover:border-[#10B981]/30 transition flex items-start justify-end p-2"><span className="font-mono text-[10px] text-white/0 hover:text-[#10B981]">DATA →</span></button>
              </div>
            </div>
                        <div className="mt-3 text-center font-mono text-[10px] tracking-widest text-white/30">
              High-quality • Rings + Core only • Scroll to morph • Drag to rotate
            </div>
          </motion.div>

          <div className="order-3 space-y-3 lg:sticky lg:top-24">
            {[
              { id: "software", title: "Software Engineering", color: "#8B5CF6", desc: "React, Flutter, Python — functional apps" },
              { id: "cloud", title: "Cloud & DevOps", color: "#06B6D4", desc: "AWS/IBM/Oracle — developing deployment" },
              { id: "ai", title: "AI & Agent Systems", color: "#EC4899", desc: "Prompt eng, agents, APIs" },
              { id: "data", title: "Business Automation", color: "#10B981", desc: "SQL Server, D365, ERP" },
            ].map((card) => (
              <div key={card.id} onClick={() => scrollToSection(card.id)} onMouseEnter={() => setActiveModule(card.id)} className={`cursor-pointer p-4 rounded-2xl border transition-all ${activeModule === card.id ? "bg-[#8B5CF6]/10 border-[#8B5CF6]/40 shadow-[0_0_30px_rgba(139,92,246,0.15)] translate-x-[-4px]" : "bg-[#0E0E12] border-white/[0.08] hover:border-white/[0.14]"}`}>
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: `${card.color}20`, color: card.color, border: `1px solid ${card.color}40` }}>{card.title.slice(0, 2).toUpperCase()}</div>
                  {activeModule === card.id && <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />}
                </div>
                <div className="mt-3 font-semibold text-[13px]">{card.title}</div>
                <div className="mt-1 text-[11px] text-white/50">{card.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* WHAT I BUILD */}
      <section ref={whatBuildRef} className="relative mx-auto max-w-[1280px] px-6 py-16 border-t border-white/[0.06] scroll-mt-24">
        <div className="font-mono text-[11px] tracking-[0.2em] text-[#8B5CF6] mb-2">02 — CAPABILITIES • ACTIVE: {activeModule.toUpperCase()}</div>
        <h2 className="text-[32px] lg:text-[40px] font-bold tracking-tight">What I Build</h2>
        <div className="mt-8 grid lg:grid-cols-4 gap-4">
          {[
            { title: "Software Engineering", ev: ["React → Flood Detection", "Flutter → Kaya", "Python → Learning"], stack: "React, Next.js, Python, Flutter" },
            { title: "Cloud Trajectory", ev: ["AWS CLF-C02 certified", "IBM Cloud", "Oracle OCI"], stack: "AWS, IBM, Oracle, Vercel" },
            { title: "AI Systems", ev: ["Prompt Eng → Kaya", "AI Agent → Kaya", "Context eng"], stack: "OpenAI API, Agents, Prompt Eng" },
            { title: "Business Tech", ev: ["SQL Server → AU Innovation", "D365 Business Central"], stack: "SQL Server, MySQL, D365, ERP" },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl bg-[#0E0E12] border border-white/[0.08] p-5">
              <h3 className="font-semibold text-[14px]">{b.title}</h3>
              <div className="mt-3 space-y-1.5">{b.ev.map((e) => (<div key={e} className="text-[12px] text-white/60 flex gap-2"><div className="w-1 h-1 rounded-full bg-[#8B5CF6] mt-2" />{e}</div>))}</div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] font-mono text-[11px] text-white/30">{b.stack}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEMS */}
      <section ref={problemsRef} className="mx-auto max-w-[1280px] px-6 py-16 border-t border-white/[0.06] scroll-mt-24">
        <div className="font-mono text-[11px] tracking-[0.2em] text-[#06B6D4] mb-2">03 — PROBLEM → SOLUTION</div>
        <h2 className="text-[32px] lg:text-[40px] font-bold tracking-tight">Problems I've Tried to Solve</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {projects.slice(0, 4).map((p) => (
            <div key={p.id} className="rounded-2xl bg-[#0E0E12] border border-white/[0.08] p-6 hover:border-white/[0.14] transition">
              <div className="flex justify-between"><h3 className="font-semibold">{p.title}</h3><span className="font-mono text-[10px] px-2 py-1 rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/20">{p.status}</span></div>
              <div className="mt-3 text-[12px] text-white/50"><span className="font-mono text-[10px] text-white/30">PROBLEM:</span> {p.problem}</div>
              <div className="mt-2 text-[12px] text-white/60"><span className="font-mono text-[10px] text-white/30">APPROACH:</span> {p.solution}</div>
              <div className="mt-4 flex gap-2"><a href={`/projects/${p.id}`} className="text-[11px] px-3 h-7 rounded-full bg-white text-black flex items-center">Case Study →</a><a href={p.github} target="_blank" className="text-[11px] px-3 h-7 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center gap-1"><GithubIcon className="w-3 h-3" /> GitHub</a></div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section ref={projectsRef} className="mx-auto max-w-[1280px] px-6 py-16 border-t border-white/[0.06] scroll-mt-24">
        <div className="font-mono text-[11px] tracking-[0.2em] text-[#8B5CF6] mb-2">04 — FEATURED PROJECTS</div>
        <h2 className="text-[32px] lg:text-[40px] font-bold tracking-tight">Selected Work</h2>
        <div className="mt-8 grid lg:grid-cols-3 gap-5">
          {projects.filter(p=>p.featured).map((p)=>(
            <a key={p.id} href={`/projects/${p.id}`} className="group rounded-[24px] overflow-hidden bg-[#0E0E12] border border-white/[0.08] hover:border-white/[0.15] transition">
              <div className="aspect-[16/10] bg-[#07080A] relative overflow-hidden"><img src={p.image} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-[1.02] transition duration-700" alt={p.title} /><div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] to-transparent" /></div>
              <div className="p-5"><h3 className="font-bold">{p.title}</h3><div className="font-mono text-[11px] text-[#8B5CF6] mt-1">{p.subtitle}</div><p className="mt-2 text-[12px] leading-5 text-white/50 line-clamp-2">{p.description}</p></div>
            </a>
          ))}
        </div>
      </section>

      {/* KAYA FLAGSHIP */}
      <section className="mx-auto max-w-[1280px] px-6 py-12">
        <div className="rounded-[32px] bg-gradient-to-br from-[#0E0E12] to-[#0A0A0F] border border-white/[0.08] grid lg:grid-cols-[1.1fr_0.9fr] overflow-hidden">
          <div className="p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 px-3 py-1 rounded-full"><div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />FLAGSHIP • KAYA</div>
            <h2 className="mt-6 text-[40px] font-bold tracking-tight leading-[0.9]">KAYA</h2>
            <p className="text-white/60 mt-2">Intelligent financial management for group savings</p>
            <div className="mt-6 space-y-4 text-[13px]">
              <div className="grid grid-cols-[100px_1fr] gap-3"><span className="font-mono text-[11px] text-white/30">PROBLEM</span><span className="text-white/70">Informal chama contributions lack transparency</span></div>
              <div className="grid grid-cols-[100px_1fr] gap-3"><span className="font-mono text-[11px] text-white/30">SYSTEM</span><span className="text-white/70">User → App → Financial Data → APIs → AI Agent → Recommendations</span></div>
              <div className="grid grid-cols-[100px_1fr] gap-3"><span className="font-mono text-[11px] text-white/30">STACK</span><span className="text-white/70">Flutter, Dart, APIs, AI Agent</span></div>
            </div>
            <div className="mt-6 flex gap-2"><a href="https://github.com/k1tav1/Kaya" target="_blank" className="bg-white text-black px-5 h-10 rounded-full text-[13px] font-medium flex items-center gap-2"><GithubIcon className="w-4 h-4" /> Repo</a><a href="/projects/kaya" className="bg-white/[0.08] border border-white/[0.12] px-5 h-10 rounded-full text-[13px] flex items-center">Case Study →</a></div>
          </div>
          <div className="bg-[#07080A] p-8 border-l border-white/[0.06]">
            <div className="font-mono text-[11px] tracking-widest text-white/30 mb-4">ARCHITECTURE</div>
            <div className="font-mono text-[11px] leading-5 text-white/50">User → Flutter App → API Layer → Financial Engine → AI Agent → Decision Support → Notification</div>
            <div className="mt-6 p-4 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 font-mono text-[11px] text-white/60">TODO: Verify exact contribution — Flutter UI? AI agent? APIs? Confirm before publishing.</div>
          </div>
        </div>
      </section>

      {/* SKILLS GRAPH - NEW */}
      <section ref={skillsRef} className="mx-auto max-w-[1280px] px-6 py-16 border-t border-white/[0.06] scroll-mt-24">
        <div className="font-mono text-[11px] tracking-[0.2em] text-[#8B5CF6] mb-2">05 — SKILLS → EVIDENCE GRAPH • INTERACTIVE</div>
        <h2 className="text-[28px] font-bold tracking-tight">Click skill to see where I used it</h2>
        <div className="mt-8">
          <SkillsGraph />
        </div>
      </section>

      {/* CURRENTLY BUILDING */}
      <section className="mx-auto max-w-[1280px] px-6 py-16 border-t border-white/[0.06]">
        <div className="font-mono text-[11px] tracking-[0.2em] text-[#06B6D4] mb-2">06 — CURRENTLY BUILDING</div>
        <h2 className="text-[28px] font-bold tracking-tight">A living portfolio</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentlyBuilding.map((item)=>(
            <div key={item.title} className="rounded-2xl bg-[#0E0E12] border border-white/[0.08] p-6">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center font-mono font-bold text-[12px] text-[#8B5CF6]">{item.icon}</div>
              <h4 className="mt-4 font-semibold text-[14px]">{item.title}</h4>
              <p className="mt-2 text-[12px] leading-5 text-white/50">{item.desc}</p>
              <div className="mt-3 font-mono text-[10px] tracking-widest px-2 py-1 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] inline-block">{item.status}</div>
            </div>
          ))}
        </div>
      </section>

      {/* GITHUB LIVE */}
      <section className="mx-auto max-w-[1280px] px-6 py-16 border-t border-white/[0.06]">
        <div className="font-mono text-[11px] tracking-[0.2em] text-[#8B5CF6] mb-2">07 — LIVE GITHUB • /api/github</div>
        <h2 className="text-[28px] font-bold tracking-tight">Engineering Snapshot — Live Data</h2>
        <p className="mt-2 text-[13px] text-white/50">Server-side fetch with cache, no token exposed. Fallback to verified static list if rate-limited.</p>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(githubData.length ? githubData : projects).slice(0,6).map((repo:any)=>(
            <a key={repo.name || repo.id || repo.title} href={repo.url || repo.github} target="_blank" className="rounded-2xl bg-[#0E0E12] border border-white/[0.08] p-5 hover:border-white/[0.14] transition group">
              <div className="flex justify-between items-start">
                <div className="font-semibold text-[14px]">{repo.name || repo.title}</div>
                <span className="font-mono text-[10px] px-2 py-1 rounded-full bg-white/[0.06] border border-white/[0.06] text-white/40">{repo.language || repo.tech?.[0] || "—"}</span>
              </div>
              <div className="mt-2 text-[12px] leading-5 text-white/50 line-clamp-2">{repo.description || repo.subtitle || "No description"}</div>
              <div className="mt-3 flex gap-3 font-mono text-[11px] text-white/30">
                <span>★ {repo.stars ?? 0}</span>
                <span>⑂ {repo.forks ?? 0}</span>
                <span className="ml-auto group-hover:text-white">↗ GitHub</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* AI ASSISTANT - NEW */}
      <section className="mx-auto max-w-[1280px] px-6 py-16 border-t border-white/[0.06]">
        <div className="font-mono text-[11px] tracking-[0.2em] text-[#8B5CF6] mb-2">08 — AI PORTFOLIO ASSISTANT • /api/ai</div>
        <h2 className="text-[28px] font-bold tracking-tight">Ask Derick's AI — Grounded, No Hallucinations</h2>
        <p className="mt-2 text-[13px] text-white/50 max-w-[70ch]">Recruiter can ask: What technologies does he know? Tell me about Kaya. What cloud experience? What is he learning? What roles? AI answers only from verified portfolio.ts — never invents employment, metrics, skills. V1 local knowledge, V2 will use OpenAI Agents SDK.</p>
        <div className="mt-8 max-w-[800px]">
          <AIPortfolioAssistant />
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="mx-auto max-w-[1280px] px-6 py-16 border-t border-white/[0.06]">
        <div className="font-mono text-[11px] tracking-[0.2em] text-[#8B5CF6] mb-2">09 — REAL-WORLD EXPERIENCE</div>
        <h2 className="text-[32px] font-bold tracking-tight">Technology in the Real World</h2>
        <div className="mt-8 grid lg:grid-cols-2 gap-5">
          {experience.map((exp)=>(
            <div key={exp.company} className="rounded-2xl bg-[#0E0E12] border border-white/[0.08] p-6">
              <div className="flex justify-between"><div><div className="font-bold">{exp.company}</div><div className="font-mono text-[12px] text-[#8B5CF6] mt-1">{exp.role}</div></div><div className="text-right"><div className="font-mono text-[11px] text-white/60">{exp.period}</div><div className="font-mono text-[10px] text-white/30">{exp.location}</div></div></div>
              <p className="mt-4 text-[13px] leading-6 text-white/60">{exp.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">{exp.highlights.map((h)=><span key={h} className="font-mono text-[10px] px-2 py-1 rounded-full bg-white/[0.06] border border-white/[0.06] text-white/50">{h}</span>)}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-2xl bg-[#0E0E12] border border-white/[0.08] p-6">
            <h3 className="font-semibold flex items-center gap-2"><GraduationCap className="w-5 h-5 text-[#8B5CF6]" /> Education</h3>
            <div className="mt-4 space-y-4">{education.map((edu)=><div key={edu.institution} className="flex justify-between gap-4"><div><div className="font-semibold text-[13px]">{edu.institution}</div><div className="font-mono text-[11px] text-[#8B5CF6]">{edu.degree}</div><div className="text-[11px] text-white/50 mt-1">{edu.details}</div></div><div className="font-mono text-[11px] text-white/40">{edu.period}</div></div>)}</div>
          </div>
          <div className="rounded-2xl bg-[#0E0E12] border border-white/[0.08] p-6">
            <h3 className="font-semibold flex items-center gap-2"><Award className="w-5 h-5 text-[#8B5CF6]" /> Certifications</h3>
            <div className="mt-4 space-y-3">{certifications.map((c)=><div key={c.name} className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] mt-2" /><div><div className="font-medium text-[12px]">{c.name}</div><div className="font-mono text-[10px] text-white/40">{c.issuer} • {c.level}</div></div></div>)}</div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-[1280px] px-6 py-20 border-t border-white/[0.06]">
        <div className="rounded-[32px] bg-gradient-to-br from-[#0E0E12] to-[#130E1F] border border-white/[0.08] p-8 lg:p-12 text-center">
          <div className="max-w-[720px] mx-auto">
            <div className="font-mono text-[11px] tracking-[0.2em] text-[#8B5CF6]">10 — LET'S BUILD SOMETHING USEFUL</div>
            <h2 className="mt-3 text-[40px] font-bold tracking-tight leading-[0.9]">Ready to build intelligent systems?</h2>
            <p className="mt-4 text-[15px] leading-7 text-white/50 mx-auto">Open to internships, entry-level, remote, contract. Focus: Software → Cloud/DevOps → AI Agents. Let's connect and build something useful.</p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3 max-w-[480px] mx-auto">
              <a href={`mailto:${personalInfo.email}`} className="flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl bg-white text-black hover:bg-white/90 transition">
                <Mail className="w-5 h-5" />
                <div className="text-left"><div className="font-mono text-[10px] text-black/50 uppercase">Email</div><div className="font-semibold text-[13px]">{personalInfo.email}</div></div>
              </a>
              <a href={personalInfo.linkedin} target="_blank" className="flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.10] transition">
                <LinkedinIcon className="w-5 h-5" />
                <div className="text-left"><div className="font-mono text-[10px] text-white/40 uppercase">LinkedIn</div><div className="font-semibold text-[13px] text-white">Derick Kitavi</div></div>
              </a>
              <a href={personalInfo.github} target="_blank" className="flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.10] transition">
                <GithubIcon className="w-5 h-5" />
                <div className="text-left"><div className="font-mono text-[10px] text-white/40 uppercase">GitHub</div><div className="font-semibold text-[13px] text-white">{personalInfo.githubUsername}</div></div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
