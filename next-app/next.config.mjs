/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // You can switch to local /public images later if you prefer.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fernandomateos.github.io',
        pathname: '/images/**'
      }
    ]
  }
};

export default nextConfig;
