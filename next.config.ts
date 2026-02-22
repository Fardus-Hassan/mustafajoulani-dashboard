import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.shahriarbd.com", pathname: "/**" },
      { protocol: "http", hostname: "api.shahriarbd.com", pathname: "/**" },
      { protocol: "https", hostname: "example.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
