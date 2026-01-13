import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

// 1. Define the Shape of the Output (Schema)
// This guarantees the AI returns exactly what we need for the UI.
const contentSchema = z.object({
  twitter: z.array(z.string()).describe("A thread of 5-7 engaging tweets. Number them 1/X"),
  linkedin: z.string().describe("A professional, structured post with bullet points suitable for LinkedIn."),
  instagram: z.string().describe("A visual-focused caption with 10-15 relevant hashtags.")
});

// 2. The Main Generation Function
export async function generateSocialContent(transcript: string) {
  try {
    const result = await generateObject({
      model: google('gemini-2.5-flash'),
      schema: contentSchema,
      prompt: `
        You are an expert Social Media Manager for a tech brand.
        
        INPUT CONTEXT:
        The following text is a transcript from a YouTube video:
        "${transcript}"

        YOUR TASK:
        Repurpose this video content into three distinct social media formats.
        
        GUIDELINES:
        - **Twitter**: Create a thread. Hook the reader in the first tweet. Summarize key insights.
        - **LinkedIn**: Use a professional tone. Focus on "Value for the reader". Use short paragraphs.
        - **Instagram**: Casual, emoji-friendly, focus on the "Vibe" of the content.
        
        Brand Voice: Informative, concise, and slightly witty.
      `,
    });

    return result.object; // This is the pure JSON data
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}