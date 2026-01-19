import { NextRequest, NextResponse } from "next/server";
import { fetchYoutubeTranscript } from "../../../lib/youtube";
import { generateSocialContent } from "../../../lib/gemini";
import { db } from "../../../db";
import { generatedContent } from "../../../db/schema";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url"); // We use the URL as the identifier

  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

  try {
    const { userId } = await auth();

    // 1. Fetch from YouTube via RapidAPI
    console.log("🚀 Step 1: Getting Transcript...");
    const youtubeData = await fetchYoutubeTranscript(url);
    
    if (!youtubeData.success || !youtubeData.text) {
      return NextResponse.json({ status: "processing" }); // Keep polling if it fails once
    }

    // 2. Pass immediately to Gemini
    console.log("✅ Step 2: Transcript ready. Calling Gemini...");
    const aiContent = await generateSocialContent(youtubeData.text);

    // 3. Save to DB
    console.log("💾 Step 3: Saving to DB...");
    const [record] = await db.insert(generatedContent).values({
      originalUrl: url,
      videoTitle: "AI Generated Content",
      content: aiContent,
      userId: userId || "guest",
    }).returning();

    // 4. Send the FINAL result back! This stops the polling.
    return NextResponse.json({ 
      status: "completed", 
      data: record 
    });

  } catch (error) {
    console.error("Funnel Error:", error);
    return NextResponse.json({ status: "error", error: "Generation failed" });
  }
}