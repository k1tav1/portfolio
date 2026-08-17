# Deployment Guide — Derick Kitavi Portfolio

## Current Status: V1 Final Deployed to Vercel (Auto-deploy from GitHub)

Repo: `k1tav1/portfolio` main branch
Vercel auto-deploys on every push to main.

### Live URLs (after Vercel import)
- **Primary (Futuristic):** https://portfolio-k1tav1.vercel.app (or your custom Vercel URL)
- **API GitHub:** /api/github (live, cached 1hr, no token exposed)
- **API AI:** /api/ai (V1 local, V2 with OPENAI_API_KEY)
- **Projects:** /projects/kaya, /projects/flood-detection, etc.
- **Sitemap:** /sitemap.xml
- **Robots:** /robots.txt

---

## Option A — Final Polish Done

### Analytics
- Installed `@vercel/analytics` and added `<Analytics />` in `layout.tsx`
- After Vercel deploy, go to Vercel Dashboard → Analytics → Enable (1-click)
- Also enable Speed Insights for Core Web Vitals

### SEO
- `metadataBase` set to `https://portfolio-k1tav1.vercel.app` — update after you get actual URL or custom domain
- Title template, OG tags, Twitter cards, keywords, robots meta all added
- `sitemap.ts` and `robots.ts` generate dynamic sitemap
- After custom domain, update baseUrl in both files and push

### Images
- Added `remotePatterns` for unsplash and avatars in `next.config.ts`
- TODO: Migrate `<img>` to `next/image` for optimization (currently using <img> for simplicity, but unsplash allowed)

---

## Custom Domain Setup (derickkitavi.dev)

### If you own domain from Namecheap/GoDaddy:

1. **Buy domain:** e.g., `derickkitavi.dev` or `derickkitavi.com` from Namecheap (~$12/yr)

2. **In Vercel Dashboard:**
   - Project → Settings → Domains → Add Domain → type `derickkitavi.dev`
   - Vercel will show DNS records to add

3. **In Namecheap (or Cloudflare):**
   - If using Cloudflare: Add CNAME `www` → `cname.vercel-dns.com`, A record `@` → `76.76.21.21` (or as Vercel instructs)
   - If using Namecheap default DNS: Add same records Vercel shows

4. **Wait 5-60 min** for DNS propagation → Vercel auto issues SSL

5. **Update code:**
   ```ts
   // src/app/layout.tsx
   metadataBase: new URL("https://derickkitavi.dev")
   // src/app/sitemap.ts and robots.ts
   const baseUrl = "https://derickkitavi.dev"
   ```
   Push → Vercel redeploys with correct canonical URLs

### Recommended: Cloudflare in front
- Put Cloudflare CDN + WAF in front of Vercel for extra security
- Cloudflare → DNS → Add CNAME to Vercel, enable orange cloud

---

## Option B — DevOps Lab (Your Plan)

You wrote: "Don't make portfolio itself your first DevOps project. Make V1 on Vercel, then V2 as DevOps lab."

**Already prepared:**

### Dockerfile (multi-stage)
```bash
# Build
docker build -t derick-portfolio .
# Run
docker run -p 3000:3000 -e PORT=3000 derick-portfolio
# Open http://localhost:3000
```

### GitHub Actions CI (.github/workflows/ci.yml)
- Runs on push to main and PRs
- Steps: checkout → Node 20 → npm ci → lint → tsc --noEmit → build
- Future steps commented: Playwright, Docker build/push to GHCR, AWS deploy

### Next Steps for AWS Lab:
1. **Create ECR repo:** `aws ecr create-repository --repository-name derick-portfolio`
2. **Push Docker image to ECR:**
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com
   docker tag derick-portfolio:latest <account>.dkr.ecr.us-east-1.amazonaws.com/derick-portfolio:latest
   docker push <account>.dkr.ecr.us-east-1.amazonaws.com/derick-portfolio:latest
   ```
3. **Deploy to ECS or EC2:** Create ECS service or EC2 instance that pulls from ECR
4. **Add monitoring:** CloudWatch, Prometheus, or UptimeRobot
5. **Document:** Write blog post "How I turned my portfolio into DevOps lab" — perfect evidence

### Playwright E2E (TODO)
```bash
npm install -D @playwright/test
npx playwright install
# Add tests for 3D, scroll, AI assistant, GitHub API
npx playwright test
```

---

## Option C — AI V2 (OpenAI)

### Current: V1 Local
- No API key needed
- Keyword matching from `portfolio.ts`
- Grounded, no hallucinations, TODO: VERIFY notes

### Upgrade to V2: Real OpenAI

1. **Get API key:** https://platform.openai.com/api-keys → Create new key

2. **Add to Vercel:**
   Vercel Dashboard → Your Project → Settings → Environment Variables → Add:
   ```
   OPENAI_API_KEY=sk-proj-...
   OPENAI_MODEL=gpt-4o-mini (optional, defaults to gpt-4o-mini)
   GITHUB_TOKEN=ghp_... (optional, higher GitHub rate limit)
   ```
   Save → Redeploy (Vercel auto-redeploys)

3. **Test:**
   ```bash
   curl https://your-url.vercel.app/api/ai
   # Should show hasOpenAIKey: true, model: gpt-4o-mini

   curl -X POST https://your-url.vercel.app/api/ai \
     -H "Content-Type: application/json" \
     -d '{"message":"Tell me about Kaya"}'
   ```

4. **Architecture for V2:**
   - System prompt includes full KNOWLEDGE from portfolio.ts
   - Guardrails: never invent employers, metrics, skills; say "I don't have that info" if unavailable; accurate cloud/DevOps language
   - Tools ready to add: get_project, search_projects, get_skill_evidence, get_experience, get_certifications, etc. (OpenAI function calling)
   - Future: Streaming, sessions, tracing via OpenAI Agents SDK

5. **Cost:** gpt-4o-mini is ~$0.15 per 1M input tokens — portfolio Q&A is tiny, <$1/month for typical traffic

---

## Option D — Done & Celebration

### Final Checklist

- [x] Futuristic locked as main theme (Professional removed as requested)
- [x] 3D core high-quality complex scroll morph (rings expand, particles x2, lights x1.4, color shift)
- [x] Cuboids with icons+labels inside (◧ CODE, ☁ CLOUD, ✦ AI, ◫ DATA)
- [x] Clean AI module (removed grounded subtitle + disclosure)
- [x] Removed Quick Message form + Copyright footer
- [x] Skills graph interactive, live GitHub API, AI assistant grounded, project case studies
- [x] SEO: metadataBase, title template, OG, Twitter, sitemap, robots
- [x] Analytics ready (@vercel/analytics)
- [x] Docker + CI ready for DevOps lab
- [x] AI V2 ready (just add OPENAI_API_KEY)
- [x] Pushed to GitHub k1tav1/portfolio (8+ commits)
- [x] Vercel auto-deploy linked (GitHub pushes → Vercel)
- [ ] Custom domain (derickkitavi.dev) — do after first Vercel deploy
- [ ] Revoke GitHub PAT ghp_J0EV... after final push (SECURITY)
- [ ] LinkedIn launch post (see LINKEDIN_POST.md)

### Security TODO

**REVOKE that PAT you pasted!**
GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → Find ghp_J0EV... → Delete

It was used 6+ times for pushes, now removed from remote, but still valid until you delete. Delete and generate new one only when needed.

---

## Support

If Vercel build fails:
- Check logs in Vercel Dashboard → Deployments → View Logs
- Common: missing env var, build error — check `npm run build` locally first
- This portfolio builds clean: tested with `npm run build` → 12 static pages

Need help? Email derekdek57@gmail.com or open issue in GitHub repo.

Built with `Problem → Research → Design → Build → Test → Automate → Improve`
