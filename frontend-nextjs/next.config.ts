import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.teleshtorm.org'
      },
    ],
  },
};

export default nextConfig;
