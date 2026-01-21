import Link from 'next/link';
import { Cpu, Sparkles } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <header className="bg-neutral-950 border-b border-neutral-800 py-4 px-6 flex justify-between items-center">
      {/* Branding */}
      <Link href="/" className="flex items-center gap-2 text-white text-xl font-bold tracking-tight">
        <Cpu className="w-6 h-6 text-blue-500" /> VISO
      </Link>

      {/* Navigation (Placeholder for now) */}
      <nav>
        {/* <ul className="flex gap-6">
          <li><Link href="/features" className="text-neutral-400 hover:text-blue-400 transition-colors">Features</Link></li>
          <li><Link href="/pricing" className="text-neutral-400 hover:text-blue-400 transition-colors">Pricing</Link></li>
          <li><Link href="/about" className="text-neutral-400 hover:text-blue-400 transition-colors">About</Link></li>
        </ul> */}
      </nav>

      {/* User Authentication */}
      <div className="flex items-center gap-4">
        <SignedIn>
          <UserButton showName />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-sm font-medium text-blue-400 hover:text-blue-300">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}