import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // For Docker DevOps Lab, set DOCKER_BUILD=1 to enable standalone output
  // Vercel does NOT need standalone - it breaks on Turbopack, so we disable by default
  ...(process.env.DOCKER_BUILD ? { output: "standalone" as const } : {}),
  allowedDevOrigins: [
    "*.e2b.app",
    "*.e2b.dev",
    "3000-idh251uq6f9k0nm57psaa.e2b.app",
    "*.amazonaws.com",
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
