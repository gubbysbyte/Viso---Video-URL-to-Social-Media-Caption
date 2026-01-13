"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Loader2, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 p-8 flex flex-col items-center">
      {/* 1. Hero Section */}
      <div className="max-w-2xl w-full text-center mt-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
          <Sparkles className="w-4 h-4" />
          <span>AI Content Engine</span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Turn Video into <span className="text-blue-500">Viral Content</span>
        </h1>
        <p className="text-neutral-400 text-lg">
          Paste a YouTube link below. We'll extract the insights and generate
          ready-to-post content for Twitter, LinkedIn, and Instagram.
        </p>
      </div>

      {/* 2. Input Form */}
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
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Generate <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            ❌ {error}
          </div>
        )}
      </form>

      {/* 3. Results Display */}
      {result && (
        <div className="w-full max-w-4xl mt-16 grid gap-8 md:grid-cols-3">
          
          {/* Twitter Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-4 text-blue-400">
              <Twitter className="w-5 h-5" />
              <h3 className="font-semibold text-white">Twitter Thread</h3>
            </div>
            <div className="space-y-4 text-sm text-neutral-300">
              {result.content.twitter.map((tweet: string, i: number) => (
                <div key={i} className="p-3 bg-neutral-950 rounded border border-neutral-800">
                  {tweet}
                </div>
              ))}
            </div>
          </div>

          {/* LinkedIn Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-4 text-blue-600">
              <Linkedin className="w-5 h-5" />
              <h3 className="font-semibold text-white">LinkedIn Post</h3>
            </div>
            <div className="p-3 bg-neutral-950 rounded border border-neutral-800 text-sm text-neutral-300 whitespace-pre-wrap">
              {result.content.linkedin}
            </div>
          </div>

          {/* Instagram Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 hover:border-pink-500/50 transition-colors">
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