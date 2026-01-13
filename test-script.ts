import { getVideoTranscript } from './src/lib/youtube';

async function main() {
    // TED Talk: "How to speak so that people want to listen"
    // This video DEFINITELY has manual English captions.
    const testUrl = "https://www.youtube.com/watch?v=eIho2S0ZahI";

    console.log("Testing URL:", testUrl);
    const result = await getVideoTranscript(testUrl);

    if (result.success) {
        console.log("✅ Success!");
        console.log("Character Count:", result.transcript?.length);
        console.log("First 100 chars:", result.transcript?.substring(0, 100));
    } else {
        console.error("❌ Failed:", result.error);
        console.error("This means the library might be outdated/blocked.");
    }
}

main();


