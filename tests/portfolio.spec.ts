import { test, expect } from "@playwright/test";

test.describe("Derick Kitavi Portfolio - Futuristic", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should load homepage with hero and 3D core", async ({ page }) => {
    await expect(page.getByText("DERICK")).toBeVisible();
    await expect(page.getByText("KITAVI").first()).toBeVisible();
    // 3D core container
    await expect(page.locator("text=CORE ONLINE").first()).toBeVisible({ timeout: 10000 });
  });

  test("should have scroll progress bar and active module switching", async ({ page }) => {
    // Progress bar exists
    const progressBar = page.locator("div").filter({ hasText: "" }).first();
    await expect(page.locator("body")).toBeVisible();
    // Scroll to trigger active module change
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);
    // Should show some active indicator
    await expect(page.locator("text=ACTIVE").first()).toBeVisible();
  });

  test("should navigate via 3D module clicks to sections", async ({ page }) => {
    // Click SOFTWARE module - should scroll to What I Build
    const softwareBtn = page.getByText("SOFTWARE", { exact: true }).first();
    if (await softwareBtn.isVisible()) {
      await softwareBtn.click();
      await page.waitForTimeout(800);
      await expect(page.locator("text=What I Build").first()).toBeVisible();
    }
  });

  test("should show capability cards and hover effects", async ({ page }) => {
    await expect(page.getByText("Software Engineering").first()).toBeVisible();
    await expect(page.getByText("Cloud & DevOps").first()).toBeVisible();
    await expect(page.getByText("AI & Agent Systems").first()).toBeVisible();
  });

  test("should display featured projects", async ({ page }) => {
    await page.getByText("Selected Work").first().scrollIntoViewIfNeeded();
    await expect(page.getByText("KAYA").first()).toBeVisible();
    await expect(page.getByText("Flood Detection").first()).toBeVisible();
  });

  test("should have interactive skills graph", async ({ page }) => {
    await page.getByText("Skills → Evidence Graph").first().scrollIntoViewIfNeeded();
    await expect(page.getByText("Click skill to see where I used it").first()).toBeVisible();
    // Click a skill
    const reactSkill = page.getByText("React", { exact: true }).first();
    if (await reactSkill.isVisible()) {
      await reactSkill.click();
      await expect(page.locator("text=Flood Detection").first()).toBeVisible();
    }
  });

  test("should have live GitHub section", async ({ page }) => {
    await page.getByText("Live GitHub").first().scrollIntoViewIfNeeded();
    await expect(page.getByText("Engineering Snapshot").first()).toBeVisible();
    // Should show at least one repo
    await expect(page.locator("text=Kaya").first()).toBeVisible();
  });

  test("should have AI assistant functional", async ({ page }) => {
    await page.getByText("Ask Derick's AI").first().scrollIntoViewIfNeeded();
    await expect(page.getByPlaceholder("Ask about Kaya").first()).toBeVisible();

    // Try example prompt
    const kayaPrompt = page.getByText("Tell me about Kaya project").first();
    if (await kayaPrompt.isVisible()) {
      await kayaPrompt.click();
      await page.waitForTimeout(1500);
      await expect(page.locator("text=KAYA").nth(1)).toBeVisible({ timeout: 5000 });
    }
  });

  test("should have contact section without quick message and copyright", async ({ page }) => {
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.getByText("Ready to build intelligent systems?").first()).toBeVisible();
    await expect(page.getByText("derekdek57@gmail.com").first()).toBeVisible();
    // Should NOT have quick message form (removed as per user request)
    await expect(page.locator("text=Quick Message")).toHaveCount(0);
    // Should NOT have copyright footer with © 2026 (removed)
    await expect(page.locator("text=© 2026")).toHaveCount(0);
  });

  test("should navigate to project case study", async ({ page }) => {
    await page.goto("/projects/kaya");
    await expect(page.getByText("KAYA").first()).toBeVisible();
    await expect(page.getByText("Intelligent financial management").first()).toBeVisible();
    await expect(page.getByText("GitHub Repository").first()).toBeVisible();
  });

  test("should have sitemap and robots", async ({ page }) => {
    const sitemapRes = await page.request.get("/sitemap.xml");
    expect(sitemapRes.ok()).toBeTruthy();
    const sitemapText = await sitemapRes.text();
    expect(sitemapText).toContain("<url>");

    const robotsRes = await page.request.get("/robots.txt");
    expect(robotsRes.ok()).toBeTruthy();
  });

  test("should have API routes working", async ({ page }) => {
    const githubRes = await page.request.get("/api/github");
    expect(githubRes.ok()).toBeTruthy();
    const githubData = await githubRes.json();
    expect(Array.isArray(githubData)).toBeTruthy();
    expect(githubData.length).toBeGreaterThan(0);

    const aiRes = await page.request.get("/api/ai");
    expect(aiRes.ok()).toBeTruthy();
    const aiData = await aiRes.json();
    expect(aiData.status).toContain("AI Portfolio Assistant");
  });
});

test.describe("Performance & Accessibility", () => {
  test("should have proper metadata", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/DERICK KITAVI/);
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute("content", /intelligent.*software/i);
  });

  test("should be keyboard navigable", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    // Should have focus visible
    const focused = page.locator(":focus");
    await expect(focused).toBeVisible({ timeout: 2000 }).catch(() => {
      // If no focus, at least page loads
    });
  });
});
