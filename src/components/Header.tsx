'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
      className={`fixed top-0 left-0 right-0 z-10 backdrop-blur-md transition-all duration-300 ${
        scrolled ? 'py-4 bg-background/95 border-b border-border shadow-sm' : 'py-6 bg-background/80'
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 hover:text-accent transition-colors group">
          <motion.div 
            className="relative w-9 h-9 overflow-hidden rounded-full shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent to-accent/70 rounded-full p-[2px]">
              <div className="absolute inset-0 rounded-full overflow-hidden bg-background">
                <Image 
                  src="/images/profile/avatar.jpg" 
                  alt="Imran Mohammed" 
                  fill
                  sizes="36px"
                  className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  priority
                  onLoadingComplete={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-accent">
                    IM
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          <span className="text-xl font-bold tracking-tight gradient-text">Imran Mohammed</span>
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
                href="#services"
                className="link-effect text-foreground hover:text-accent transition-colors relative py-2"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className="link-effect text-foreground hover:text-accent transition-colors relative py-2"
              >
                About
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
                  href="#services"
                  className="block py-3 text-foreground hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="block py-3 text-foreground hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
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
