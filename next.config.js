/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s3.viva.pl', 'images.pexels.com', 'www.google.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
