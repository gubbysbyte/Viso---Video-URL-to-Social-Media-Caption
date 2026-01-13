import { NextRequest, NextResponse } from "next/server";
// Use relative paths to be safe
import { getVideoTranscript } from "../../../lib/youtube";
import { generateSocialContent } from "../../../lib/gemini";
import { db } from "../../../db";
import { generatedContent } from "../../../db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // 1. Get Transcript
    console.log("🔍 Extracting transcript...");
    const transcriptData = await getVideoTranscript(url);

    if (!transcriptData.success || !transcriptData.transcript) {
      return NextResponse.json(
        { error: transcriptData.error || "Failed to process video" }, 
        { status: 400 }
      );
    }

    // 2. Generate Content
    console.log("🧠 Generating AI content...");
    const aiContent = await generateSocialContent(transcriptData.transcript);

    // 3. Save to DB
    console.log("💾 Saving to DB...");
    const [record] = await db.insert(generatedContent).values({
      originalUrl: url,
      videoTitle: transcriptData.title || "Unknown Video",
      content: aiContent,
    }).returning();

    return NextResponse.json({ success: true, data: record });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}