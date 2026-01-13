import { z } from "zod";

/**
 * src/lib/youtube.ts
 * "The Native Innertube Scraper"
 * Bypasses 403s by impersonating a YouTube Android Client.
 */

// 1. Validation Schema
const urlSchema = z.string().url().refine((url) => {
  return url.includes('youtube.com') || url.includes('youtu.be');
}, "Invalid YouTube URL provided");

function extractVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2] && match[2].length === 11) ? match[2] : null;
}

// 2. Helper to fetch raw HTML (to get the API Key)
async function fetchHTML(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
  });
  return await res.text();
}

// 3. The Main Export
export async function getVideoTranscript(rawUrl: string) {
  try {
    const url = urlSchema.parse(rawUrl);
    const videoId = extractVideoId(url);
    if (!videoId) throw new Error("Invalid Video ID");

    console.log(`[Innertube] 1. Extracting Credentials for ${videoId}...`);

    // Step A: Get the Page to find the INNERTUBE_API_KEY
    // This key is public but changes occasionally, so we scrape it dynamicallly.
    const pageHtml = await fetchHTML(`https://www.youtube.com/watch?v=${videoId}`);

    const keyMatch = pageHtml.match(/"INNERTUBE_API_KEY":"([^"]+)"/);
    
    console.log(keyMatch);

    if (!keyMatch) {
       throw new Error("Could not extract Innertube API Key. YouTube might have changed layout.");
    }
    const apiKey = keyMatch[1];

    // Step B: Call the 'Player' Endpoint acting as an ANDROID client
    // Android clients (com.google.android.youtube) are rate-limited less often.
    console.log(`[Innertube] 2. Fetching Metadata (Android Client)...`);
    
    const playerResponse = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        context: {
          client: {
            clientName: "ANDROID",
            clientVersion: "19.09.37", // A recent stable version
            androidSdkVersion: 30,
            hl: "en",
            gl: "US",
            utcOffsetMinutes: 0
          }
        },
        videoId: videoId,
      }),
    });

    const playerData = await playerResponse.json();

    // Step C: Parse the Caption Tracks
    const captions = playerData?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    
    if (!captions || captions.length === 0) {
      throw new Error("No captions found for this video.");
    }

    // Prioritize English
    const track = captions.find((t: any) => t.languageCode === 'en') || captions[0];
    
    console.log(`[Innertube] 3. Downloading Transcript from: ${track.baseUrl.slice(0, 50)}...`);

    // Step D: Fetch the XML Transcript
    const transcriptRes = await fetch(track.baseUrl);
    const transcriptXml = await transcriptRes.text();

    // Step E: Parse XML to Text (Regex is faster than an XML parser here)
    // Format: <text start="0.0" dur="1.2">Hello world</text>
    const cleanText = transcriptXml
      .replace(/&amp;#39;/g, "'") // Decode apostrophes
      .replace(/&amp;quot;/g, '"') // Decode quotes
      .replace(/<[^>]+>/g, ' ')   // Strip tags
      .replace(/\s+/g, ' ')       // Normalize whitespace
      .trim();

    return { 
      success: true, 
      transcript: cleanText,
      title: playerData?.videoDetails?.title || "Unknown Title"
    };

  } catch (error) {
    console.error("Innertube Error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}