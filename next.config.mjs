/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "example.com",
      "flagsapi.com",
      "res.cloudinary.com",
      "http://localhost:3000/",
    ],
  },
};

export default nextConfig;
