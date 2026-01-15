import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"; // Import Auth
// Use relative paths to be safe
import { getVideoTranscript } from "../../../lib/youtube";
import { generateSocialContent } from "../../../lib/gemini";
import { db } from "../../../db";
import { generatedContent } from "../../../db/schema";

export async function POST(req: NextRequest) {
  try {
    // 1. Check Authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

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
      userId: userId, // 👈 Linking the data to the user
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