import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
  console.log("🚀 Testing Full API Flow...");
  
  // We mock a request to your local server
  const response = await fetch("http://localhost:3000/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      url: "https://www.youtube.com/watch?v=eIho2S0ZahI" 
    })
  });
  
  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main();