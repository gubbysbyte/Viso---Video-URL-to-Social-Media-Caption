import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!key) {
    console.error("❌ No API Key found in .env.local");
    return;
  }

  console.log("🔍 Fetching available models for your API Key...");
  
  // We use the raw REST API to check availability
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`
  );

  const data = await response.json();

  if (data.error) {
    console.error("❌ Error fetching models:", data.error.message);
    return;
  }

  console.log("\n✅ AVAILABLE MODELS (Copy one of these names):");
  console.log("------------------------------------------------");
  
  const validModels = data.models?.filter((m: any) => 
    // We only want models that can generate text/content
    m.supportedGenerationMethods?.includes("generateContent")
  );

  validModels?.forEach((m: any) => {
    // format: models/gemini-1.5-flash
    console.log(`- ${m.name.replace('models/', '')}`);
  });
  console.log("------------------------------------------------");
}

main();