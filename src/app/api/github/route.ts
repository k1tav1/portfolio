import { NextRequest, NextResponse } from "next/server";

const GITHUB_USERNAME = "k1tav1";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

let cache: { data: any; timestamp: number } | null = null;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const repo = searchParams.get("repo");

  // Return cached if fresh
  if (cache && Date.now() - cache.timestamp < CACHE_TTL && !repo) {
    return NextResponse.json(cache.data, {
      headers: { "X-Cache": "HIT", "Cache-Control": "public, s-maxage=3600" },
    });
  }

  try {
    // If specific repo requested
    if (repo) {
      const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
        },
        next: { revalidate: 3600 },
      });
      if (!res.ok) {
        return NextResponse.json({ error: "Repo not found", status: res.status }, { status: res.status });
      }
      const data = await res.json();
      return NextResponse.json(
        {
          name: data.name,
          description: data.description,
          language: data.language,
          stars: data.stargazers_count,
          forks: data.forks_count,
          updated: data.updated_at,
          url: data.html_url,
          topics: data.topics,
        },
        { headers: { "Cache-Control": "public, s-maxage=3600" } }
      );
    }

    // List all repos
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      // Fallback to static data if API fails / rate limited
      throw new Error(`GitHub API failed: ${res.status}`);
    }

    const repos = await res.json();
    const cleaned = repos.map((r: any) => ({
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      updated: r.updated_at,
      url: r.html_url,
      topics: r.topics?.slice(0, 3) || [],
    }));

    cache = { data: cleaned, timestamp: Date.now() };

    return NextResponse.json(cleaned, {
      headers: { "X-Cache": "MISS", "Cache-Control": "public, s-maxage=3600" },
    });
  } catch (error: any) {
    // Safe fallback - uses verified repo list from portfolio.ts
    const fallback = [
      { name: "Kaya", description: "Cross-platform fintech for group savings & investment with AI agent", language: "Dart", stars: 0, forks: 0, updated: "2026-05-04", url: "https://github.com/k1tav1/Kaya", topics: ["flutter", "fintech", "ai-agent"] },
      { name: "flood-detection-project", description: "React + Tailwind + ML to detect floods by scraping X", language: "JavaScript", stars: 0, forks: 0, updated: "2025-05-29", url: "https://github.com/k1tav1/flood-detection-project", topics: ["react", "flood-detection", "mapping"] },
      { name: "Mradi-wa-Ardhi", description: "Title deed and official document verifier", language: "TypeScript", stars: 0, forks: 0, updated: "2026-05-16", url: "https://github.com/k1tav1/Mradi-wa-Ardhi", topics: ["typescript", "ai", "document-verification"] },
      { name: "learningAndAdaptiveSystem", description: "Learning and adaptive system projects", language: "Python", stars: 0, forks: 0, updated: "2026-05-08", url: "https://github.com/k1tav1/learningAndAdaptiveSystem", topics: ["python", "algorithms"] },
      { name: "GALOREHUB", description: "Web platform - HTML foundation", language: "HTML", stars: 0, forks: 0, updated: "2024-09-30", url: "https://github.com/k1tav1/GALOREHUB", topics: ["html"] },
    ];
    return NextResponse.json(fallback, { headers: { "X-Cache": "FALLBACK" } });
  }
}
