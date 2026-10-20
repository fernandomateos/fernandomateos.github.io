/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // App de ejercicio de Pater (repositorio fernandomateos/pater), servida tal cual desde public/pater/.
  // Sus datos viven en el móvil atados a esta dirección: no cambiar la ruta.
  async redirects() {
    return [{ source: '/pater', destination: '/pater/index.html', permanent: false }];
  },
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
