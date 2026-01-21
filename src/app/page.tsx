"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Loader2, Twitter, Linkedin, Instagram } from "lucide-react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"; // Removed UserButton and useUser

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  // Inside src/app/page.tsx -> handleSubmit function

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  
  // Reset state before starting
  setIsLoading(true);
  setError("");
  setResult(null);

  // We start polling immediately. The first check will trigger the logic.
  const pollInterval = setInterval(async () => {
    try {
      const response = await fetch(`/api/check-status?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
        // Handle unauthorized or server crashes
        clearInterval(pollInterval);
        setIsLoading(false);
        setError("Session expired or server error.");
        return;
      }

      const statusData = await response.json();

      if (statusData.status === "completed") {
        // 🟢 DOTS CONNECTED: Stop the loop and show the data
        clearInterval(pollInterval);
        setResult(statusData.data);
        setIsLoading(false);
        console.log("✅ Generation successful.");
      } else if (statusData.status === "error") {
        // 🔴 FAILSAFE: Stop the loop if Gemini or RapidAPI fails
        clearInterval(pollInterval);
        setError(statusData.error || "An error occurred.");
        setIsLoading(false);
      } else {
        // Still processing... just wait for the next 5-second tick
        console.log("⏳ AI is working...");
      }
    } catch (err) {
      clearInterval(pollInterval);
      setIsLoading(false);
      setError("Network error. Please check your connection.");
    }
  }, 5000); // 5 seconds is optimal for Gemini free-tier rate limits
}

  return (
    <main className="flex-grow text-neutral-200 p-8 flex flex-col items-center relative">
      {/* Hero Section */}
      <div className="max-w-2xl w-full text-center mt-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
          <Sparkles className="w-4 h-4" />
          <span>Viso | AI Content Engine</span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Turn Video into <span className="text-blue-500">Viral Content</span>
        </h1>
        <p className="text-neutral-400 text-lg">
          Paste a YouTube link below. We'll extract the insights and generate
          ready-to-post content for Twitter, LinkedIn, and Instagram.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-xl mt-12 space-y-4">
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-neutral-600"
          />

          {/* 🔴 CONDITIONAL BUTTON RENDERING */}
          <SignedIn>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  Generate <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button
                type="button"
                className="bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
              >
                Sign in to Generate
              </button>
            </SignInButton>
          </SignedOut>
        </div>
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            ❌ {error}
          </div>
        )}
      </form>

      {/* Results Display (Same as before) */}
      {result && (
        <div className="w-full max-w-4xl mt-16 grid gap-8 md:grid-cols-3">
          {/* ... (Keep your Twitter/LinkedIn/Insta cards here) ... */}
          {/* If you need the card code again, let me know! */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4 text-blue-400">
              <Twitter className="w-5 h-5" />
              <h3 className="font-semibold text-white">Twitter Thread</h3>
            </div>
            <div className="space-y-4 text-sm text-neutral-300">
              {result.content.twitter.map((tweet: string, i: number) => (
                <div
                  key={i}
                  className="p-3 bg-neutral-950 rounded border border-neutral-800"
                >
                  {tweet}
                </div>
              ))}
            </div>
          </div>
          {/* LinkedIn & Insta cards... */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4 text-blue-600">
              <Linkedin className="w-5 h-5" />
              <h3 className="font-semibold text-white">LinkedIn Post</h3>
            </div>
            <div className="p-3 bg-neutral-950 rounded border border-neutral-800 text-sm text-neutral-300 whitespace-pre-wrap">
              {result.content.linkedin}
            </div>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4 text-pink-500">
              <Instagram className="w-5 h-5" />
              <h3 className="font-semibold text-white">Instagram Caption</h3>
            </div>
            <div className="p-3 bg-neutral-950 rounded border border-neutral-800 text-sm text-neutral-300 whitespace-pre-wrap">
              {result.content.instagram}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
