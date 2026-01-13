import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Explicitly load the .env.local file so Drizzle can find your DATABASE_URL
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  
  // 🔴 This was the missing line causing your error:
  dialect: "postgresql",
  
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});