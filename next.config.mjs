/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding", "punycode");
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
