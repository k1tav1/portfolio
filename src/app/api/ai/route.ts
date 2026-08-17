import { NextRequest, NextResponse } from "next/server";
import { personalInfo, projects, skills, experience, certifications } from "@/data/portfolio";

// Controlled knowledge base - NO hallucinations
const KNOWLEDGE = `
Name: ${personalInfo.name} (${personalInfo.fullName})
Role: ${personalInfo.role}
Tagline: ${personalInfo.tagline}
Philosophy: ${personalInfo.philosophy}
Location: ${personalInfo.location}
Email: ${personalInfo.email}
GitHub: ${personalInfo.github} (${personalInfo.githubUsername})
LinkedIn: ${personalInfo.linkedin}

Education:
- BSc Computer Science, Multimedia University of Kenya, 2021-2026
  Coursework: Distributed Databases, Business Intelligence, Expert Systems, Cloud Computing, Software Engineering, DSA
- Certificate Software Development, Modcom Institute

Certifications:
${certifications.map((c) => `- ${c.name} - ${c.issuer} (${c.level})`).join("\n")}

Skills:
${Object.entries(skills)
  .map(([cat, list]) => `${cat}: ${list.join(", ")}`)
  .join("\n")}

Projects:
${projects
  .map(
    (p) => `- ${p.title} (${p.type}): ${p.description} | Problem: ${p.problem} | Solution: ${p.solution} | Tech: ${p.tech.join(", ")} | GitHub: ${p.github} | Status: ${p.status}`
  )
  .join("\n")}

Experience:
${experience.map((e) => `- ${e.company} - ${e.role} (${e.period}, ${e.location}): ${e.description}`).join("\n")}

Open to: Internships, Entry-level, Remote, Contract, Hybrid
Target roles: Software Engineer Intern, Cloud Engineer Intern, DevOps Intern, AI/Agent Engineering Intern, Full-Stack Developer
Currently Learning: Cloud Deployment, DevOps Automation, AI Agent Systems, Networking & Security
`;

function generateAnswerLocal(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("salary") || q.includes("pay") || q.includes("age") || q.includes("girlfriend") || q.includes("personal")) {
    return "I don't have that information in Derick's verified portfolio. Please contact him directly at derekdek57@gmail.com for personal inquiries.";
  }
  if (q.includes("kaya")) {
    const kaya = projects.find((p) => p.id === "kaya");
    return `**KAYA** — ${kaya?.subtitle}\n\n${kaya?.description}\n\n**Problem:** ${kaya?.problem}\n**Solution:** ${kaya?.solution}\n**Tech:** ${kaya?.tech.join(", ")}\n**Type:** ${kaya?.type}\n**Status:** ${kaya?.status}\n\n**Important:** Exact contribution is marked as TODO: VERIFY. GitHub: https://github.com/k1tav1/Kaya\n\nFlagship: cross-platform fintech + AI agent for chama transparency.`;
  }
  if (q.includes("flood")) {
    const p = projects.find((pr) => pr.id === "flood-detection");
    return `**Flood Detection:** ${p?.description}\n\n**Problem:** ${p?.problem}\n**Solution:** ${p?.solution}\n**Stack:** ${p?.tech.join(", ")}\n**GitHub:** ${p?.github}`;
  }
  if (q.includes("mradi") || q.includes("ardhi") || q.includes("land")) {
    const p = projects.find((pr) => pr.id === "mradi-wa-ardhi");
    return `**Mradi wa Ardhi:** ${p?.description}\n\n**Note:** AI-assisted preliminary analysis, NOT legal verification.\n**GitHub:** ${p?.github}`;
  }
  if (q.includes("skill") || q.includes("technolog")) {
    return `**Skills → Evidence (no percentages):**\n\nProgramming: Python (Learning Systems), JS/TS (Flood, Ardhi), Dart (Kaya)\nFrontend: React, Next.js, Tailwind\nMobile: Flutter (Kaya)\nDatabases: SQL Server (AU Innovation), MySQL\nCloud: AWS CLF-C02, IBM, Oracle (Foundational, developing deployment)\nAI: Prompt Eng (strong), AI Agents (Kaya), Context Eng\nERP: D365 (AU Innovation)\n\nEvidence: React→Flood, Flutter→Kaya, AI Agent→Kaya, SQL→AU Innovation`;
  }
  if (q.includes("cloud") || q.includes("aws") || q.includes("devops")) {
    return `**Cloud & DevOps:** Certified AWS CLF-C02, IBM Cloud, Oracle OCI (Foundational). Currently developing practical deployment, CI/CD, Docker. NOT claiming senior DevOps experience. Future: Vercel for V1, then Docker→AWS as DevOps lab.`;
  }
  if (q.includes("experience") || q.includes("au innovation")) {
    return `**AU Innovation Intern (July-Aug 2025):** SQL Server (integrity, query optimization), Dynamics 365 Business Central, end-user support, reporting. Lesson: Tech must work inside real processes.\n\n**Sharjah Chambers Attaché:** Business outreach, partnerships, digital logs — shows business + tech understanding.`;
  }
  if (q.includes("currently") || q.includes("learning") || q.includes("building")) {
    return `**Currently Building:**\n☁️ Cloud Deployment — learning end-to-end\n⚙️ DevOps Automation — CI/CD, infra\n🤖 AI Agent Systems — business workflow agents\n🔐 Network & Security — development area`;
  }
  if (q.includes("role") || q.includes("looking") || q.includes("open")) {
    return `**Target Roles:** SWE Intern, Cloud Intern, DevOps Intern, AI/Agent Intern, Full-Stack, Entry-Level, Remote/Contract\n**Availability:** ${personalInfo.availability}\n**Contact:** ${personalInfo.email} • ${personalInfo.linkedin}`;
  }
  if (q.includes("who") || q.includes("derick") || q.includes("about")) {
    return `**${personalInfo.fullName}** — ${personalInfo.role}\n**Bio:** ${personalInfo.bio}\n**Location:** ${personalInfo.location}\n**Philosophy:** ${personalInfo.philosophy}\n\nAdaptable, analytical, experimental. Strongest: critical analysis & unique problem-solving ideas. Improving: Networking & Security.\n\nIn 30 seconds: Engineer from Nairobi, 5+ projects (Kaya flagship), real internship, 3 cloud certs, learning Cloud/DevOps & AI agents, open to intern/entry/remote/contract.`;
  }
  return `Based on verified portfolio:\n\n**${personalInfo.name}** — ${personalInfo.role}\nLocation: ${personalInfo.location}\nEmail: ${personalInfo.email}\n\n**Core:** ${personalInfo.tagline}\n**Philosophy:** ${personalInfo.philosophy}\n\nTry: "Tell me about Kaya", "What cloud experience?", "What skills and where used?", "What roles is he looking for?"\n\nNote: I only answer from verified data, no hallucinations.`;
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }
    if (message.length > 500) {
      return NextResponse.json({ error: "Message too long (max 500 chars)" }, { status: 400 });
    }

    // Try OpenAI V2 if key exists
    const openaiKey = process.env.OPENAI_API_KEY;
    if (openaiKey) {
      try {
        const { default: OpenAI } = await import("openai");
        const openai = new OpenAI({ apiKey: openaiKey });

        const systemPrompt = `You are Derick Kitavi's AI portfolio assistant. You are part of his portfolio demonstrating his interest in AI agent engineering.

CRITICAL RULES - NEVER VIOLATE:
1. Answer ONLY from verified portfolio knowledge base below. Never invent employers, skills, certifications, metrics, users, revenue, years of experience, team leadership, achievements.
2. If information is unavailable, say "I don't have that information in Derick's verified portfolio" and suggest contacting derekdek57@gmail.com
3. Never claim senior/expert/production-grade DevOps, ML expert, security specialist unless verified. Use accurate language: "Foundational knowledge, certified", "Currently developing practical skills", "Project experience"
4. Keep answers concise, helpful, recruiter-friendly. Use markdown bold for emphasis.
5. Highlight Skills → Evidence mapping, not percentages.
6. For Kaya, always note exact contribution is TODO: VERIFY (individual vs group role pending verification)
7. For Mradi wa Ardhi, always add disclaimer: AI-assisted preliminary analysis, NOT legal verification
8. Do not share personal data beyond what's in knowledge base (no salary, age, personal relationships)

KNOWLEDGE BASE:
${KNOWLEDGE}

You should be helpful, concise, and show Derick's personality: adaptable, analytical, experimental, willing to learn, practical, curious about AI/business problems.
`;

        const completion = await openai.chat.completions.create({
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
          temperature: 0.3,
          max_tokens: 600,
        });

        const answer = completion.choices[0]?.message?.content || generateAnswerLocal(message);

        return NextResponse.json({
          answer,
          grounded: true,
          model: completion.model,
          usage: completion.usage,
          knowledgeCutoff: "2026-08-14",
          version: "V2 - OpenAI Agents SDK ready, with guardrails",
        });
      } catch (aiError: any) {
        console.error("OpenAI error, falling back to local:", aiError.message);
        // Fallback to local
      }
    }

    // V1 Local fallback - no API key or OpenAI failed
    const answer = generateAnswerLocal(message);

    return NextResponse.json({
      answer,
      grounded: true,
      knowledgeCutoff: "2026-08-14",
      version: "V1 - Local knowledge (add OPENAI_API_KEY env for V2)",
      note: "V1 uses controlled knowledge base. V2 uses OpenAI with guardrails, streaming, tools.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to process request", details: error.message }, { status: 500 });
  }
}

export async function GET() {
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  return NextResponse.json({
    status: hasOpenAI ? "AI Portfolio Assistant - V2 (OpenAI) Active" : "AI Portfolio Assistant - V1 (Local) Active",
    knowledgeBase: "Controlled - no hallucinations - KNOWLEDGE from portfolio.ts",
    hasOpenAIKey: hasOpenAI,
    model: process.env.OPENAI_MODEL || (hasOpenAI ? "gpt-4o-mini (configured)" : "local keyword matching"),
    exampleQuestions: [
      "What projects has Derick built?",
      "Tell me about Kaya",
      "What cloud experience does he have?",
      "What skills and where did he use them?",
      "What roles is he looking for?",
      "What is he currently building?",
      "Tell me about AU Innovation experience",
    ],
    totalProjects: projects.length,
    totalSkills: Object.values(skills).flat().length,
    version: hasOpenAI ? "V2 - OpenAI with guardrails + tools ready" : "V1 - Local knowledge (add OPENAI_API_KEY for V2)",
    setup: hasOpenAI ? "Ready" : "Add OPENAI_API_KEY env var in Vercel to enable V2",
  });
}
