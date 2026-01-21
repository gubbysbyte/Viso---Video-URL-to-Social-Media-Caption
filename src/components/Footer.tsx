import Link from 'next/link';
import { Github, Linkedin, Twitter, FileCode, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-neutral-800 text-neutral-400 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand & Mission */}
        <div className="space-y-4">
          <h2 className="text-white font-bold text-xl tracking-tight flex items-center gap-2">
            <Cpu className="w-6 h-6 text-blue-500" /> VISO
          </h2>
          <p className="text-sm leading-relaxed">
            Architecting viral content from video insights. Built with a focus on stable background jobs and optimized AI token usage.
          </p>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/api-docs" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                <FileCode className="w-4 h-4" /> API Documentation
              </Link>
            </li>
            <li>
              <Link href="/docs/system-architecture" className="hover:text-blue-400 transition-colors">
                System Architecture
              </Link>
            </li>
          </ul>
        </div>

        {/* Tech Stack Icons */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Built With</h3>
          <div className="flex flex-wrap gap-4 grayscale opacity-60 hover:grayscale-0 transition-all">
            <span title="Next.js" className="text-xs bg-neutral-900 px-2 py-1 rounded border border-neutral-800">Next.js 15</span>
            <span title="Drizzle" className="text-xs bg-neutral-900 px-2 py-1 rounded border border-neutral-800">Drizzle ORM</span>
            <span title="Gemini" className="text-xs bg-neutral-900 px-2 py-1 rounded border border-neutral-800">Gemini 2.5 Flash</span>
          </div>
        </div>

        {/* Social & Connect */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h3>
          <div className="flex gap-4">
            <a href="https://github.com/yourusername" target="_blank" className="hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" className="hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://twitter.com/yourusername" target="_blank" className="hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© {new Date().getFullYear()} Viso AI Engine. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}