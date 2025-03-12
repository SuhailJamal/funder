/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
      },
    images: {
        remotePatterns: [
            {
                protocol : "https",
                hostname : "**"
            }
        ],
    },
    reactStrictMode: true,
};

export default nextConfig;
