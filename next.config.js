/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["artic-web.imgix.net", "eagle-sensors.com"],
  },
};

module.exports = nextConfig;
