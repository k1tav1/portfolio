import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.e2b.app",
    "*.e2b.dev",
    "3000-idh251uq6f9k0nm57psaa.e2b.app",
    "*.amazonaws.com",
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
        ],
      },
    ];
  },
};

export default nextConfig;
