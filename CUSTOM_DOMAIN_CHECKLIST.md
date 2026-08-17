# Custom Domain Checklist — derickkitavi.dev

## Goal: portfolio-k1tav1.vercel.app → derickkitavi.dev (or .com)

### Step 1 — Buy Domain (If not owned)
- **Provider:** Namecheap, GoDaddy, Google Domains, or Cloudflare Registrar (cheapest, no markup)
- **Recommended:** `derickkitavi.dev` (~$12/yr) or `derickkitavi.com` (~$10/yr) or `derickkitavi.ke` (local)
- Buy at https://www.namecheap.com or https://domains.google.com

### Step 2 — Add Domain in Vercel (2 min)
1. Go to **vercel.com/dashboard** → Your Project `portfolio` → **Settings → Domains**
2. Click **Add Domain** → Type `derickkitavi.dev`
3. Vercel will show:
   - **Type A** - `@` → `76.76.21.21`
   - **Type CNAME** - `www` → `cname.vercel-dns.com`
   - Or **Nameservers** if using Vercel DNS (ns1.vercel-dns.com etc.)
4. Click **Add** — Vercel will say "Invalid Configuration" until you update DNS (normal)

### Step 3 — Update DNS

#### Option A — Cloudflare (Recommended: CDN + WAF + Free SSL + Analytics)
1. Create Cloudflare account → Add Site → `derickkitavi.dev` → Cloudflare scans DNS
2. Change nameservers in Namecheap to Cloudflare's (e.g., `cody.ns.cloudflare.com`, `maria.ns.cloudflare.com`) — Cloudflare shows them
3. Wait 5 min — Cloudflare Active
4. In Cloudflare Dashboard → DNS → Add Records:
   - `A` - `@` → `76.76.21.21` → Proxy ON (orange cloud)
   - `CNAME` - `www` → `cname.vercel-dns.com` → Proxy ON
   - `CNAME` - `_vercel` → Vercel verification value (if Vercel shows)
5. Cloudflare → **SSL/TLS → Full (Strict)**
6. Cloudflare → **Speed → Optimization → Auto Minify: JS, CSS, HTML ON**

#### Option B — Namecheap Default DNS (Simpler, no CDN)
1. Namecheap → Domain List → Manage `derickkitavi.dev` → Advanced DNS
2. Delete any existing A/CNAME for `@` and `www`
3. Add:
   - `A Record` - `@` → `76.76.21.21` → TTL Automatic
   - `CNAME Record` - `www` → `cname.vercel-dns.com` → TTL Automatic
4. Save

#### Option C — Vercel Nameservers (Easiest, Vercel manages DNS)
1. In Vercel Domains → Add Domain → Vercel shows 2 nameservers: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`
2. In Namecheap → Domain → Nameservers → Custom DNS → Paste Vercel nameservers
3. Save → Vercel auto-manages all DNS

### Step 4 — Wait for Propagation (5-60 min)
- Vercel → Domains → will show **"Valid Configuration"** + **SSL Certificate** auto-issued (Let's Encrypt)
- Test: https://derickkitavi.dev should load your portfolio with 🔒
- https://www.derickkitavi.dev should redirect to non-www (or vice versa, set in Vercel)

### Step 5 — Update Code BaseUrl (Important for SEO)
After custom domain works, update:

**src/app/layout.tsx**
```ts
metadataBase: new URL("https://derickkitavi.dev"),
openGraph: { url: "https://derickkitavi.dev", ... }
```

**src/app/sitemap.ts**
```ts
const baseUrl = "https://derickkitavi.dev";
```

**src/app/robots.ts**
```ts
const baseUrl = "https://derickkitavi.dev";
```

Then:
```bash
git add src/app/layout.tsx src/app/sitemap.ts src/app/robots.ts
git commit -m "chore: update baseUrl to custom domain derickkitavi.dev"
git push origin main
```
Vercel auto-redeploys with correct canonical URLs → Google SEO loves it.

### Step 6 — Redirects & Extras
- In Vercel → Domains → Set `derickkitavi.dev` as primary, `www.derickkitavi.dev` redirects to it (or reverse)
- Add **www redirect** in `vercel.json` if needed (already handled by Vercel)

### Step 7 — Google Search Console & Analytics
1. **Google Search Console:** https://search.google.com/search-console → Add property → `derickkitavi.dev` → Verify via DNS TXT record (Cloudflare) or HTML file
2. **Submit sitemap:** In Search Console → Sitemaps → Add `https://derickkitavi.dev/sitemap.xml`
3. **Vercel Analytics:** Vercel Dashboard → Analytics → Enable (already added `<Analytics />` in layout, will start collecting)
4. **Speed Insights:** Vercel → Speed Insights → Enable

### Step 8 — Email (Optional but Pro)
- If you want `hello@derickkitavi.dev`:
  - Cloudflare → Email Routing → Custom address → Forward to `derekdek57@gmail.com`
  - Or Google Workspace / Zoho Mail

### Checklist
- [ ] Buy domain
- [ ] Add domain in Vercel → Domains
- [ ] Update DNS (Cloudflare or Namecheap or Vercel NS)
- [ ] Wait for Valid Configuration + SSL (🔒)
- [ ] Update baseUrl in 3 files → push
- [ ] Test https://derickkitavi.dev + https://www.derickkitavi.dev
- [ ] Enable Vercel Analytics + Speed Insights
- [ ] Submit sitemap to Google Search Console
- [ ] Update LinkedIn, GitHub, Resume with new custom domain
- [ ] Revoke old Vercel preview URLs from sharing (optional)

### Troubleshooting
- **Domain still shows "Invalid" after 1hr:** Check DNS with https://dnschecker.org — should show Vercel IPs
- **SSL not issuing:** Ensure no conflicting A records, wait, or set Cloudflare SSL to Full (Strict)
- **www not redirecting:** Vercel → Domains → Edit → set redirect
- **Too many redirects:** If Cloudflare + Vercel both redirect, set Cloudflare SSL to Full (not Flexible) and disable Cloudflare's "Always Use HTTPS" if Vercel already does

Done? You now own your professional identity on the web.
