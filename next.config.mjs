/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Vercel build safety
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
