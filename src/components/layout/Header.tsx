'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'py-4 bg-background/95 border-b border-border shadow-sm' : 'py-6 bg-background/80'
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 hover:text-accent transition-colors group">
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">IMRAN</span>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none focus:ring-2 focus:ring-accent/20 rounded"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          ></span>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 items-center">
            <li>
              <Link
                href="#work"
                className="link-effect text-foreground hover:text-accent transition-colors relative py-2"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                href="/resume"
                className="link-effect text-foreground hover:text-accent transition-colors relative py-2"
              >
                Resume
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile navigation */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border py-4 shadow-md transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <nav className="container mx-auto px-6">
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="#work"
                  className="block py-3 text-foreground hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/resume"
                  className="block py-3 text-foreground hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resume
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
