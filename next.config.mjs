import path from "path";
import { fileURLToPath } from "url";
import { withPayload } from "@payloadcms/next/withPayload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/api/media/file/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source:
          "/:slug(taminga-buds|tamminga-buds|taminga-budds|tammingabuds|tamingabuds|tamingabudds)",
        destination: "/",
        permanent: true,
      },
      {
        source:
          "/brand/:slug(taminga-buds|tamminga-buds|taminga-budds|tammingabuds|tamingabuds|tamingabudds)",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value:
              "^(?:tammingabudds\\.com|(?:www\\.)?(?:tamingabuds\\.com|tammingabuds\\.com|tamingabudds\\.com|taminga-buds\\.com|tamminga-buds\\.com|taminga-budds\\.com))$",
          },
        ],
        destination: "https://www.tammingabudds.com/:path*",
        permanent: true,
      },
    ];
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
