import type { NextConfig } from "next";

const BACKEND_URL =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.singaporemaxicabs.com.sg";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${BACKEND_URL.replace(/\/$/, "")}/api/v1/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.singaporemaxicabs.com.sg",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "singaporemaxicabs.com.sg",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
