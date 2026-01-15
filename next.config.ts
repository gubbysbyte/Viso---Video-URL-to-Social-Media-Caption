import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 👇 THIS IS THE MAGIC LINE */
  output: "standalone",
  
  reactCompiler: true,
  
  /* Keep baking these in, it's safer */
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  },
  
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;