import { NextRequest, NextResponse } from "next/server";
import { fetchYoutubeTranscript } from "../../../lib/youtube";
import { generateSocialContent } from "../../../lib/gemini";
import { db } from "../../../db";
import { generatedContent } from "../../../db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // 🟢 STEP 0: THE GUARD - Check if this user already processed this video
    const existing = await db
      .select()
      .from(generatedContent)
      .where(
        and(
          eq(generatedContent.originalUrl, url),
          eq(generatedContent.userId, userId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      console.log("✨ Content found in DB. Returning existing record.");
      return NextResponse.json({ status: "completed", data: existing[0] });
    }

    // 🟢 STEP 1: If not in DB, fetch from YouTube
    const youtubeData = await fetchYoutubeTranscript(url);
    if (!youtubeData.success || !youtubeData.text) {
      return NextResponse.json({ status: "processing" });
    }

    // 🟢 STEP 2: Generate with Gemini
    const aiContent = await generateSocialContent(youtubeData.text);

    // 🟢 STEP 3: Save to DB
    const [record] = await db.insert(generatedContent).values({
      originalUrl: url,
      videoTitle: "AI Generated Content",
      content: aiContent,
      userId: userId,
    }).returning();

    return NextResponse.json({ status: "completed", data: record });

  } catch (error: any) {
    console.error("Funnel Error:", error);
    // If we hit a rate limit, tell the frontend to wait
    if (error.message?.includes("quota")) {
      return NextResponse.json({ status: "error", error: "AI Limit reached. Please wait 60s." });
    }
    return NextResponse.json({ status: "error", error: "Generation failed" });
  }
}