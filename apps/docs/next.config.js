/** @type {import("next").NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@repo/docs-data",
    "@repo/ui",
  ],
};

export default nextConfig;