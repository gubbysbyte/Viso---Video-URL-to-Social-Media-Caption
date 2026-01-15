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

