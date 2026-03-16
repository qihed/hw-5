/**
 * Next.js: пути для SCSS (переменные из shared/styles) и разрешённые домены для next/image.
 */
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "src/shared")],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "front-school-strapi.ktsdev.ru",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "front-school.minio.ktsdev.ru",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
