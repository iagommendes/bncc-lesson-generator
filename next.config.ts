import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "bncc-lesson-generator";

const nextConfig: NextConfig = {
  // Next.js 16 usa Turbopack por padrão; mantemos a chave para builds locais.
  turbopack: isGithubPages
    ? {
        // Troca o bridge de geração pela versão 100% client/mock.
        resolveAlias: {
          "@/lib/request-lesson-plan":
            "./src/lib/request-lesson-plan.demo.ts",
        },
      }
    : {},

  // GitHub Pages só serve arquivos estáticos — sem Server Actions / API routes.
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
