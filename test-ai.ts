import { generateSocialContent } from './src/lib/gemini';
import dotenv from 'dotenv';

// Load environment variables (just in case tsx misses them)
dotenv.config({ path: '.env.local' });

const TEST_TEXT = `
TypeScript is a superset of JavaScript that adds static typing. 
It helps developers catch errors early and improves code maintainability.
`;

// ⚠️ IMPORTANT: We must wrap 'await' inside this function
async function main() {
  console.log("🧠 Testing Gemini API...");
  try {
    const result = await generateSocialContent(TEST_TEXT);
    
    console.log("\n✅ Success! AI Output:");
    console.log(JSON.stringify(result, null, 2));

  } catch (err) {
    console.error("❌ AI Failed:", err);
  }
}

// execute the function
main();

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// // Protect everything EXCEPT the landing page ('/') and the API (for now)
// // We will protect the API inside the route handler itself for better control
// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

// export default clerkMiddleware(async (auth, req) => {
//   if (isProtectedRoute(req)) await auth.protect();
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };