import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/products/:slug*",
        destination: "/shop",
        permanent: true,
      },
      {
        source: "/materials-information",
        destination: "/material-engineering",
        permanent: true,
      },
      {
        source: "/Zubair",
        destination: "/zubair",
        permanent: false,
      },
      {
        source: "/Zubair/:path*",
        destination: "/zubair/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
