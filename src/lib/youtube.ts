import { z } from "zod";

const urlSchema = z.string().url().refine((url) => {
  return url.includes("youtube.com") || url.includes("youtu.be");
}, "Invalid YouTube URL provided");

export async function fetchYoutubeTranscript(rawUrl: string) {
  try {
    const url = urlSchema.parse(rawUrl);
    
    // Using the RapidAPI Gateway to bypass YouTube security
    const response = await fetch(`https://youtube-transcripts.p.rapidapi.com/youtube/transcript?url=${url}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY!,
        'X-RapidAPI-Host': 'youtube-transcripts.p.rapidapi.com'
      }
    });

    if (!response.ok) throw new Error("RapidAPI Gateway Error");

    const data = await response.json();
    
    // Join transcript segments into a single string
    const transcriptText = data.content 
      ? data.content.map((i: any) => i.text).join(" ") 
      : data.map((i: any) => i.text).join(" ");

    return { success: true, text: transcriptText };
  } catch (error) {
    console.error("Youtube Lib Error:", error);
    return { success: false, error: "Failed to fetch transcript" };
  }
}