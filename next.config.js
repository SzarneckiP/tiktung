/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['s3.viva.pl', 'images.pexels.com', 'www.google.com', 'lh3.googleusercontent.com', 'th.bing.com']
  }
}

module.exports = nextConfig
