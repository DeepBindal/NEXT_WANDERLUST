/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      // appDir: true,
      serverComponentsExternalPackages: ["mongoose"],
    },
    images: {
      domains: ['lh3.googleusercontent.com','images.unsplash.com', 'res.cloudinary.com', 'avatars.githubusercontent.com', "fastly.picsum.photos"],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
  }
  
  module.exports = nextConfig