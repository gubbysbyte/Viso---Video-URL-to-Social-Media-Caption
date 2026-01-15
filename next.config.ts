import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Keep your existing compiler setting */
  reactCompiler: true,

  /* 👇 THE FIX: Force environment variables into the build */
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  },

  /* Optional: Prevent build fails from tiny code style issues */
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;