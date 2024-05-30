import createNextIntlPlugin from "next-intl/plugin";
import createRemoveImports from "next-remove-imports";

const withNextIntl = createNextIntlPlugin();
const removeImports = createRemoveImports();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.STORAGE_PROTOCOL,
        hostname: process.env.STORAGE_HOST,
        port: process.env.STORAGE_PORT,
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};

export default removeImports(withNextIntl(nextConfig));
