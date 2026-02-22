import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.shahriarbd.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
