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

function generateAnswer(question: string): string {
  const q = question.toLowerCase();

  // Content governance: never invent employers, metrics, achievements
  if (q.includes("salary") || q.includes("pay") || q.includes("age") || q.includes("girlfriend") || q.includes("personal")) {
    return "I don't have that information in Derick's verified portfolio. Please contact him directly at derekdek57@gmail.com for personal inquiries.";
  }

  if (q.includes("kaya")) {
    const kaya = projects.find((p) => p.id === "kaya");
    return `**KAYA** — ${kaya?.subtitle}\n\n${kaya?.description}\n\n**Problem:** ${kaya?.problem}\n**Solution:** ${kaya?.solution}\n**Tech:** ${kaya?.tech.join(", ")}\n**Type:** ${kaya?.type}\n**Status:** ${kaya?.status}\n\n**Important:** Exact contribution is marked as TODO: VERIFY. Derick is confirming whether it was individual or group and his specific role (Flutter UI? AI agent? APIs?) before publishing. GitHub: https://github.com/k1tav1/Kaya\n\nWhat makes it flagship: cross-platform fintech + AI agent for decision support, addressing real chama transparency problems in Kenya.`;
  }

  if (q.includes("flood")) {
    const p = projects.find((pr) => pr.id === "flood-detection");
    return `**Flood Detection Project:** ${p?.description}\n\n**Problem:** ${p?.problem}\n**Solution:** ${p?.solution}\n**Stack:** ${p?.tech.join(", ")}\n**GitHub:** ${p?.github}\n\nThis was an individual project using React, Vite, Tailwind, and APIs/mapping services. It scrapes online information/social signals (X/Twitter) to surface potential flood risk areas.`;
  }

  if (q.includes("mradi") || q.includes("ardhi") || q.includes("land") || q.includes("title deed")) {
    const p = projects.find((pr) => pr.id === "mradi-wa-ardhi");
    return `**Mradi wa Ardhi:** ${p?.description}\n\n**Note:** This is AI-assisted preliminary document analysis, NOT legal verification. It helps buyers examine title-deed info before purchase.\n\n**Approach:** Prompt engineering / AI-driven document analysis\n**Type:** ${p?.type}\n**GitHub:** ${p?.github}\n\nResponsible language: AI-assisted preliminary verification support, not government-level authentication.`;
  }

  if (q.includes("skill") || q.includes("technolog") || q.includes("what does he know")) {
    return `**Skills → Evidence (no percentages, only where used):**\n\n**Programming:** Python (Learning & Adaptive Systems), JavaScript/TypeScript (Flood, Mradi wa Ardhi), Dart (Kaya), Java/Kotlin Basic, SQL\n\n**Frontend:** React, Next.js, Vite, Tailwind, HTML/CSS/Bootstrap, Flask Basic\n\n**Mobile:** Flutter, Dart (Kaya), Kotlin/Android Basic\n\n**Databases:** SQL Server (AU Innovation internship - integrity, query optimization), MySQL, PostgreSQL Learning\n\n**Cloud:** AWS Foundational (CLF-C02 certified), IBM Cloud (Practitioner), Oracle Cloud (OCI Foundations) — foundational level, currently developing practical deployment\n\n**AI:** Prompt Engineering (strong), Context Engineering, AI APIs, AI Agents (Kaya), Chatbots, Automation, Data Extraction\n\n**ERP:** Dynamics 365 Business Central (AU Innovation)\n\n**DevOps:** Git & GitHub, Deployment Learning, CI/CD Learning, Docker Learning — NOT claiming professional DevOps experience\n\nEvidence examples: React → Flood Detection, Flutter → Kaya, AI Agent → Kaya, Prompt Eng → Kaya/Mradi wa Ardhi, SQL → AU Innovation, Python → Learning Systems`;
  }

  if (q.includes("cloud") || q.includes("aws") || q.includes("devops")) {
    return `**Cloud & DevOps:**\n\n**Certified:** AWS Cloud Practitioner CLF-C02, IBM Cloud Computing Practitioner, Oracle Cloud Infrastructure Foundations Associate\n\n**Level:** Foundational knowledge, certified. Currently developing practical skills in:\n- Cloud Deployment (learning to deploy real applications)\n- DevOps Automation (CI/CD, infrastructure, automation)\n- Containers/Docker (learning)\n\n**Accurate language:** He is NOT an experienced DevOps engineer. He is developing toward DevOps, learning deployment and automation. This is intentional for credibility.\n\n**Future plan:** Version 1 deploys on Vercel (easy for Next.js), Version 2 will deliberately be used as DevOps lab: GitHub → CI → Docker → AWS deployment → monitoring.`;
  }

  if (q.includes("experience") || q.includes("work") || q.includes("au innovation") || q.includes("sharjah")) {
    return `**Real-world Experience:**\n\n**AU Innovation — ICT & Systems Intern (July-Aug 2025, Kenya):**\n- Managed databases with SQL Server (data integrity, query optimization)\n- Administered Dynamics 365 Business Central (ERP workflows)\n- End-user support, operational ICT issues, report generation\n- Lesson: Technology has to work inside real organizational processes\n\n**Sharjah Chambers — Business & Trade Operations Attaché (TODO: Verify Dates):**\n- Company outreach, cross-border partnerships, site visits, digital company logs\n- Shows business + tech understanding, not just coding\n\nThis supports his story: Technology + business operations.`;
  }

  if (q.includes("currently") || q.includes("learning") || q.includes("building") || q.includes("next")) {
    return `**Currently Building My Next Level:**\n\n☁️ **Cloud Deployment:** Learning to deploy real applications end-to-end.\n⚙️ **DevOps Automation:** CI/CD, infrastructure, automation.\n🤖 **AI Agent Systems:** Building agents capable of improving business workflows.\n🔐 **Network & Security:** Identified development area.\n\nThis section is designed to evolve — portfolio is a living representation, not pretending he's finished.`;
  }

  if (q.includes("role") || q.includes("looking for") || q.includes("open") || q.includes("opportunity")) {
    return `**Target Roles (next 6 months):**\n- Software Engineer Intern\n- Cloud Engineer Intern\n- DevOps Intern\n- AI/Agent Engineering Intern / Prompt & Context Engineering Intern\n- Full-Stack Developer / Entry-Level SWE\n- Remote / Contract / Hybrid\n\n**Target companies:** Startups, banks/fintech, telecoms, consulting, government, international orgs, tech companies, research orgs, remote/global companies\n\n**Availability:** ${personalInfo.availability}\n**Contact:** ${personalInfo.email} • ${personalInfo.linkedin} • ${personalInfo.github}`;
  }

  if (q.includes("who") || q.includes("derick") || q.includes("about")) {
    return `**Who is DERICK KITAVI?**\n\n**Name:** ${personalInfo.fullName} (Display: ${personalInfo.name})\n**Title:** ${personalInfo.role}\n**Bio:** ${personalInfo.bio}\n**Location:** ${personalInfo.location}\n**Philosophy:** ${personalInfo.philosophy}\n\n**Personality:** Adaptable, willing to learn, flexible, analytical, experimental, curious, practical. Enjoys building, debugging, researching, automation, experimentation, collaboration, AI problems, business problems.\n\n**Strongest trait:** Critical analysis and generation of unique problem-solving ideas.\n\n**Area improving:** Networking & Security\n\n**In 30 seconds recruiter should know:** Software Engineer from Nairobi building intelligent systems → 5+ projects (Kaya flagship) + real internship + 3 cloud certs + learning toward Cloud/DevOps & AI agents → open to intern/entry/remote/contract.`;
  }

  // Default - grounded answer
  return `Based on verified portfolio data:\n\n**${personalInfo.name}** — ${personalInfo.role}\nLocation: ${personalInfo.location}\nEmail: ${personalInfo.email}\nGitHub: ${personalInfo.github}\n\n**Core positioning:** ${personalInfo.tagline}\n\n**Philosophy:** ${personalInfo.philosophy}\n\n**I have detailed info on:** projects (Kaya, Flood Detection, Mradi wa Ardhi, Learning Systems), skills with evidence, AU Innovation experience, certifications (AWS/IBM/Oracle), education (MMU CS 2021-2026), currently learning (Cloud Deployment, DevOps, AI Agents, Security), and open roles.\n\nWhat would you like to know? Try:\n- "Tell me about Kaya project"\n- "What cloud experience does he have?"\n- "What skills and where did he use them?"\n- "What roles is he looking for?"\n- "What is he currently building?"\n\nNote: I only answer from verified portfolio data and will say if info is unavailable (no hallucination).`;
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

    // Rate limiting simple in-memory (for demo)
    // In production use Upstash Redis or similar

    // Generate grounded answer (no external API call for V1)
    // V2 will use OpenAI API + Agents SDK with the KNOWLEDGE as context
    const answer = generateAnswer(message);

    return NextResponse.json({
      answer,
      grounded: true,
      knowledgeCutoff: "2026-08-14",
      note: "V1 uses controlled knowledge base. V2 will use OpenAI Agents SDK with guardrails, rate limiting, streaming.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to process request", details: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "AI Portfolio Assistant - V1 Active",
    knowledgeBase: "Controlled - no hallucinations",
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
    version: "V1 - Local knowledge, V2 will add OpenAI Agents SDK",
  });
}
