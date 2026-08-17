# DERICK KITAVI — Software Engineer | Cloud & Intelligent Systems

**Futuristic portfolio locked • Professional V2 available at `/professional`**

> I build intelligent, efficient and adaptable software systems that solve real-world problems and improve organizational efficiency.

**Philosophy:** `Problem → Research → Design → Build → Test → Automate → Improve`

Live: `https://github.com/k1tav1/portfolio` → Deploy to Vercel → `derick-kitavi.vercel.app` (after deployment)

---

## 🚀 Features (Phase 3 Live)

### Design & Experience
- **Futuristic Theme (Default `/`)** — Near-black #050507, purple/blue glow, glassmorphism, grid, hybrid CSS+WebGL 3D core
- **Professional V2 (`/professional`)** — Isometric islands (Kaya, Flood, Ardhi, Learning), 10% overlap, flip to evidence, mouse tilt parallax
- **3D Core — Computational Core:** Central icosahedron + inner glow + 3 orbital rings + CODE/CLOUD/AI/DATA modules + sparkles (R3F + Drei)
- **Scroll-linked effects:** Parallax scale 1→0.85, sticky sections, auto-activate modules on scroll, clickable quadrants → scroll to sections, progress bar top
- **Overlap demos:** Futuristic 20% particles over text, Professional 3%→10% subtle

### Content
- **Hero:** Name, role, tagline, availability, GitHub/LinkedIn/email
- **What I Build:** 4 capability cards (Software, Cloud, AI, Business)
- **Problem → Solution:** 4 projects with problem/approach
- **Featured Projects:** 3 flagship with images
- **Kaya Flagship:** Full architecture (User → App → Financial Data → APIs → AI Agent → Recommendations)
- **Skills → Evidence Graph (NEW):** Interactive — click skill → shows where used (React → Flood Detection, Flutter → Kaya, etc.) — no percentages
- **Currently Building:** Cloud Deployment, DevOps Automation, AI Agent Systems, Network & Security
- **Live GitHub (`/api/github`):** Server-side fetch with 1hr cache, no token exposed, fallback to verified list
- **AI Portfolio Assistant (`/api/ai`):** ASK DERICK'S AI — grounded answers only from `portfolio.ts`, never halls, V1 local knowledge, V2 will use OpenAI Agents SDK
- **Experience:** AU Innovation (SQL Server, D365), Sharjah Chambers
- **Education & Certs:** MMU BSc CS 2021-2026, Modcom, AWS CLF-C02, IBM Cloud, Oracle OCI, AI Prompt Engineering
- **Project Case Studies:** `/projects/kaya`, `/projects/flood-detection`, etc. — overview, problem, solution, tech, contribution (TODO: VERIFY), challenges, lessons

### Engineering
- **Stack:** Next.js 15 App Router + TypeScript + Tailwind v4 + Framer Motion + Three.js + React Drei + React Three Fiber + shadcn/ui
- **APIs:** `/api/github` (REST, cached), `/api/ai` (controlled knowledge base, rate limiting simple, 500 char max)
- **Security:** No secrets in browser, GitHub token server-only, content governance — no invented metrics, TODO: VERIFY placeholders
- **Performance:** Hybrid CSS fallback for 3D, dynamic import for R3F, DPR [1,1.5], lazy loading

---

## 📁 Structure

```
/src
  /app
    page.tsx (Futuristic - main, locked)
    professional/page.tsx (Professional V2 - Isometric Islands)
    projects/[id]/page.tsx (Case studies)
    api/github/route.ts (Live GitHub)
    api/ai/route.ts (AI assistant - grounded)
  /components
    ComputationalCore.tsx (Hybrid CSS+WebGL core)
    ProfessionalCore.tsx (Stack - old)
    ProfessionalIslandsCore.tsx (Isometric islands, flip, 10% overlap - new)
    SkillsGraph.tsx (Interactive skills → evidence)
    AIPortfolioAssistant.tsx (Clean, no disclosure)
  /data
    portfolio.ts (Single source of truth - edit this!)
```

---

## 🛠️ Setup

```bash
npm install
npm run dev -- --port 3000 --hostname 0.0.0.0
# → http://localhost:3000
# → http://localhost:3000/professional
```

Build:
```bash
npm run build
```

---

## 🌐 Deployment — Vercel

### Option 1 — 1-Click (Recommended)
1. Go to https://vercel.com/new
2. Import `k1tav1/portfolio`
3. Framework: Next.js (auto)
4. No env vars needed for V1
5. Deploy → `https://derick-kitavi-portfolio.vercel.app`

### Option 2 — Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### Env for V2 (AI with OpenAI)
Add in Vercel Dashboard → Settings → Environment Variables:
```
OPENAI_API_KEY=sk-...
GITHUB_TOKEN=ghp_... (optional, for higher rate limit)
```

### Future DevOps Lab (as per your plan)
- V1: Vercel (easy)
- V2: GitHub → Actions → Tests → Docker → AWS deployment → monitoring → portfolio itself becomes DevOps evidence

---

## 📝 Content Governance

**Critical rule:** Do not invent info about Derick.

- Use `TODO: VERIFY` for uncertain info (e.g., Kaya exact contribution, live demo URL, Sharjah dates)
- Allowed vocab for cloud/DevOps: "Foundational knowledge, certified", "Currently developing practical skills in...", "Project experience, not production"
- Forbidden: senior, expert, production-grade DevOps engineer, architected scalable infra handling X users (unless verified)

---

## 📜 Phases

- **Phase 1 — Foundation:** Next.js, TS, Tailwind, nav, responsive ✓
- **Phase 2 — Visual Identity:** 3D core, animations, hero ✓
- **Phase 3 — Content:** Projects, experience, certs, education ✓
- **Phase 4 — Interactive:** Skills graph, filtering, dashboard ✓
- **Phase 5 — AI:** Knowledge base, assistant, guardrails ✓ (V1 local, V2 Agents SDK)
- **Phase 6 — Integrations:** GitHub API, live links ✓
- **Phase 7 — Engineering:** Tests, a11y, SEO, performance, CI/CD, deployment → NOW

---

## 👤 Author

**DERICK KITAVI**
- GitHub: [@k1tav1](https://github.com/k1tav1)
- LinkedIn: [derick-musyoka-kitavi](https://www.linkedin.com/in/derick-musyoka-kitavi)
- Email: derekdek57@gmail.com
- Location: Nairobi, Kenya → Remote

Open to: Internships, Entry-Level, Remote, Contract, Hybrid

---

Built with `Problem → Research → Design → Build → Test → Automate → Improve`
