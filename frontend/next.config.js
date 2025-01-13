module.exports = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
  },
  images: {
    domains: ["images.unsplash.com"], // Unsplashの画像を許可
  },
};
