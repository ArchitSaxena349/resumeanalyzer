/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    UPLOADTHING_APP_ID: process.env.UPLOADTHING_APP_ID,
  },
  serverExternalPackages: ['uploadthing'],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Suppress UploadThing warnings on client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;