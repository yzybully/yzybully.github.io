import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Waves } from 'lucide-react';

export default function Layout({ children }) {
  const location = useLocation();

  const navLinks = [
    { name: 'HOME', path: createPageUrl('Home') },
    { name: 'PLANS', path: createPageUrl('Plans') },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="relative z-10 px-8 py-6">
        <div className="relative flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg backdrop-blur-sm border border-blue-500/20">
              <Waves className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-slate-900 bg-clip-text text-transparent">
              wave
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 transition-colors font-medium ${
                  location.pathname === link.path ? 'text-blue-400' : 'text-white hover:text-blue-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a href="https://discord.gg/Qba4JBkRjR" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-white hover:text-blue-400 transition-colors font-medium">
              COMMUNITY
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button className="p-2 text-white">
              <div className="w-6 h-0.5 bg-white mb-1"></div>
              <div className="w-6 h-0.5 bg-white mb-1"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </button>
          </div>
        </div>
      </header>
      
      <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-8 py-12">
        {children}
      </main>

      <style jsx global>{`
        @keyframes glow-pulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.6);
          }
        }
      `}</style>
    </div>
  );
}
