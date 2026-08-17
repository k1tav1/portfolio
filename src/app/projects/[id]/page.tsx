import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return notFound();

  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="mx-auto max-w-[900px] px-6 py-12">
        <Link href="/" className="font-mono text-[11px] tracking-widest px-3 h-8 rounded-full border border-white/[0.12] inline-flex items-center hover:bg-white hover:text-black transition">
          ← BACK TO PORTFOLIO
        </Link>

        <div className="mt-8 rounded-[24px] overflow-hidden bg-[#0E0E12] border border-white/[0.08]">
          <div className="aspect-[16/9] relative bg-[#07080A]">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="inline-flex font-mono text-[11px] tracking-widest px-2.5 py-1 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 text-[#8B5CF6] mb-3">{project.type}</div>
              <h1 className="font-bold text-[36px] tracking-tight leading-[0.9]">{project.title}</h1>
              <div className="font-mono text-[13px] text-white/60 mt-2">{project.subtitle}</div>
            </div>
          </div>

          <div className="p-8 grid lg:grid-cols-[1.3fr_0.7fr] gap-10">
            <div className="space-y-8">
              {[
                { k: "Overview", v: project.longDescription },
                { k: "Problem", v: project.problem },
                { k: "Solution", v: project.solution },
                { k: "Technologies", v: project.tech.join(", ") },
                { k: "My Contribution", v: "TODO: VERIFY before publishing — confirm exact role (Flutter UI? AI agent? APIs? Backend?)" },
                { k: "Challenges", v: "TODO: Add real challenges faced (e.g., integration, data, performance)" },
                { k: "Lessons", v: "TODO: Add lessons learned from this project" },
                { k: "Future Improvements", v: "TODO: Add roadmap" },
              ].map((sec) => (
                <div key={sec.k}>
                  <div className="font-mono text-[11px] tracking-[0.2em] text-[#8B5CF6] mb-2">{sec.k.toUpperCase()}</div>
                  <div className="text-[14px] leading-7 text-white/70">{sec.v}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-[#07080A] border border-white/[0.06] p-5">
                <div className="font-mono text-[11px] tracking-widest text-white/30 mb-3">PROJECT META</div>
                <div className="space-y-3 font-mono text-[12px]">
                  {[
                    { l: "Status", v: project.status },
                    { l: "Stack", v: project.tech[0] },
                    { l: "Featured", v: project.featured ? "Yes" : "No" },
                  ].map((r) => (
                    <div key={r.l} className="flex justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-white/30">{r.l}</span>
                      <span className="text-white/70">{r.v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-2">
                  <a href={project.github} target="_blank" className="block w-full h-10 rounded-full bg-white text-black font-medium text-[13px] flex items-center justify-center gap-2">GitHub Repository ↗</a>
                  <div className="w-full h-10 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/40 font-mono text-[12px] flex items-center justify-center">Live Demo — TODO: VERIFY URL</div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 p-4">
                <div className="font-mono text-[11px] tracking-widest text-[#8B5CF6]">CONTENT GOVERNANCE</div>
                <div className="mt-2 font-mono text-[11px] leading-5 text-white/60">This page uses only verified info from portfolio.ts + GitHub. No metrics, users, revenue invented. TODOs must be resolved before public launch.</div>
              </div>

              <div className="rounded-2xl bg-[#07080A] border border-white/[0.06] p-5">
                <div className="font-mono text-[11px] tracking-widest text-white/30 mb-2">TAGS</div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((t) => (
                    <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.06] text-white/50">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          {projects
            .filter((p) => p.id !== project.id)
            .slice(0, 3)
            .map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`} className="font-mono text-[11px] tracking-widest px-3 h-8 rounded-full bg-white/[0.06] border border-white/[0.08] hover:bg-white hover:text-black transition inline-flex items-center">
                {p.title} →
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
