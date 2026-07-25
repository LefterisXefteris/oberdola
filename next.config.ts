import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGitHubPagesBuild ? "export" : undefined,
  trailingSlash: isGitHubPagesBuild,
  images: {
    unoptimized: isGitHubPagesBuild,
  },
  typescript: isGitHubPagesBuild
    ? {
        tsconfigPath: "tsconfig.pages.json",
      }
    : undefined,
};

export default nextConfig;
