"use client";

import { useState } from "react";
import { skills, projects } from "@/data/portfolio";

const skillEvidence: Record<string, string[]> = {
  React: ["Flood Detection"],
  "Next.js": ["Portfolio (this)"],
  Python: ["Learning & Adaptive Systems", "Data analysis"],
  Flutter: ["Kaya"],
  Dart: ["Kaya"],
  TypeScript: ["Mradi wa Ardhi", "Portfolio"],
  "Tailwind CSS": ["Flood Detection", "Portfolio"],
  "SQL Server": ["AU Innovation"],
  MySQL: ["Modcom / AU Innovation"],
  "AWS (Foundational - CLF-C02)": ["Certified - developing deployment"],
  "IBM Cloud": ["Certified"],
  "Oracle Cloud (OCI Foundations)": ["Certified"],
  "Prompt Engineering": ["Kaya", "Mradi wa Ardhi"],
  "AI APIs": ["Kaya"],
  "AI Agents": ["Kaya"],
  "Microsoft Dynamics 365 Business Central": ["AU Innovation"],
};

export default function SkillsGraph() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>("React");

  return (
    <div className="rounded-[24px] bg-[#0E0E12] border border-white/[0.08] overflow-hidden">
      <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-[#8B5CF6]">SKILLS → EVIDENCE GRAPH</div>
          <h3 className="font-bold text-[18px] tracking-tight mt-1">No percentages. Only where I used it.</h3>
        </div>
        <div className="hidden lg:block font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/40">CLICK SKILL → SEE EVIDENCE</div>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-0">
        {/* Skill nodes */}
        <div className="p-6 bg-[#07080A]">
          <div className="grid grid-cols-1 gap-6">
            {Object.entries(skills).map(([category, list]) => (
              <div key={category}>
                <div className="font-mono text-[11px] tracking-widest text-white/30 uppercase mb-3">{category}</div>
                <div className="flex flex-wrap gap-1.5">
                  {list.map((skill) => {
                    const isSelected = selectedSkill === skill;
                    const hasEvidence = skillEvidence[skill];
                    return (
                      <button
                        key={skill}
                        onClick={() => setSelectedSkill(skill)}
                        className={`font-mono text-[11px] px-3 py-1.5 rounded-full border transition-all text-left ${
                          isSelected
                            ? "bg-[#8B5CF6] text-white border-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                            : hasEvidence
                            ? "bg-white/[0.06] border-white/[0.12] text-white/70 hover:border-[#8B5CF6]/40 hover:text-white"
                            : "bg-white/[0.03] border-white/[0.06] text-white/30"
                        }`}
                      >
                        {skill}
                        {hasEvidence && <span className="ml-1.5 text-[9px] opacity-60">↗</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence panel */}
        <div className="p-6 border-l border-white/[0.06] bg-[#0E0E12] flex flex-col">
          <div className="font-mono text-[11px] tracking-widest text-white/30">EVIDENCE FOR</div>
          <div className="mt-1 font-bold text-[20px] tracking-tight">{selectedSkill || "Select a skill"}</div>

          <div className="mt-6 space-y-3 flex-1">
            {selectedSkill && skillEvidence[selectedSkill] ? (
              <>
                <div className="font-mono text-[11px] text-white/40">Used in:</div>
                {skillEvidence[selectedSkill].map((ev) => {
                  const proj = projects.find((p) => ev.toLowerCase().includes(p.title.toLowerCase().split(" ")[0]) || ev.includes(p.title));
                  return (
                    <div key={ev} className="rounded-xl bg-white/[0.06] border border-white/[0.08] p-4 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/15 border border-[#8B5CF6]/20 flex items-center justify-center font-mono text-[10px] font-bold text-[#8B5CF6]">
                        {ev.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-[13px]">{ev}</div>
                        {proj && <div className="font-mono text-[11px] text-white/40 mt-1">{proj.type} • {proj.status}</div>}
                        {proj && (
                          <a href={proj.github} target="_blank" className="inline-flex mt-2 font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full bg-white text-black hover:bg-white/90 transition">
                            GITHUB ↗
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div className="mt-4 p-3 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 font-mono text-[11px] leading-5 text-white/60">
                  This graph proves evidence over inflated percentages. Each skill links to real project, internship, or certification — not arbitrary 80%.
                </div>
              </>
            ) : selectedSkill ? (
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4">
                <div className="font-mono text-[11px] text-white/40">No direct evidence mapping yet for {selectedSkill}. Check portfolio.ts to add mapping or verify via TODO.</div>
                <div className="mt-2 font-mono text-[10px] text-white/20">Example: To map, add to skillEvidence in SkillsGraph.tsx</div>
              </div>
            ) : (
              <div className="text-[13px] text-white/40">Click a skill with ↗ to see where Derick used it.</div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/[0.06] grid grid-cols-2 gap-3 font-mono text-[11px]">
            <div className="rounded-xl bg-[#07080A] border border-white/[0.06] p-3">
              <div className="text-white/30">TOTAL SKILLS</div>
              <div className="text-[18px] font-bold text-white mt-1">{Object.values(skills).flat().length}</div>
            </div>
            <div className="rounded-xl bg-[#07080A] border border-white/[0.06] p-3">
              <div className="text-white/30">MAPPED TO EVIDENCE</div>
              <div className="text-[18px] font-bold text-[#8B5CF6] mt-1">{Object.keys(skillEvidence).length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
