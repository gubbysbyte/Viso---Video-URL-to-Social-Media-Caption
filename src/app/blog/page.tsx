import Link from 'next/link';
import { Sparkles, CalendarDays, User } from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    title: 'Optimizing AI Prompts for Viral Content Generation',
    slug: 'optimizing-ai-prompts',
    date: '2023-10-26',
    author: 'AI Enthusiast',
    excerpt: 'Discover advanced techniques to craft prompts that yield highly engaging and shareable social media content from your video URLs.',
  },
  {
    title: 'The Future of Video Repurposing with Gemini 2.5 Flash',
    slug: 'future-of-video-repurposing',
    date: '2023-11-15',
    author: 'Tech Innovator',
    excerpt: 'Explore how the latest Gemini model is revolutionizing the way we transform long-form video into bite-sized, platform-specific content.',
  },
  {
    id: '3',
    title: 'Building Scalable AI Microservices with Next.js and Drizzle',
    slug: 'scalable-ai-microservices',
    date: '2023-12-01',
    author: 'DevOps Guru',
    excerpt: 'A deep dive into our backend architecture, focusing on how Next.js API routes and Drizzle ORM enable efficient AI operations.',
  },
  {
    id: '4',
    title: 'From YouTube to LinkedIn: Crafting Professional Video Summaries',
    slug: 'youtube-to-linkedin',
    date: '2024-01-05',
    author: 'Content Strategist',
    excerpt: 'Learn the art of transforming video content into compelling LinkedIn posts that capture attention and drive professional engagement.',
  },
];

export default function BlogPage() {
  return (
    <main className="flex-grow text-neutral-200 p-8 flex flex-col items-center">
      {/* Hero Section */}
      <div className="max-w-2xl w-full text-center mt-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
          <Sparkles className="w-4 h-4" />
          <span>Viso Tech Blog</span>
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-white">
          Insights from the <span className="text-blue-500">Cutting Edge</span>
        </h1>
        <p className="text-neutral-400 text-lg">
          Stay updated with our latest developments, AI research, and engineering deep dives.
        </p>
      </div>

      {/* Blog Post Grid */}
      <section className="w-full max-w-6xl mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white hover:text-blue-400 transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {post.excerpt}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-neutral-500 text-xs">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            </div>
            <Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors self-start">
              Read More 
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}
