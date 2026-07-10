import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/lib", "@repo/services", "@repo/types"],
};

export default nextConfig;