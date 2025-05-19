'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

import { useChatToggle } from '../../context/ChatToggleProvider';
import { NavItem } from '../../types';

const navItems: NavItem[] = [
  { label: 'Work', href: '/#work' },
  { label: 'Resume', href: '/resume' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isChatOpen, toggleChat } = useChatToggle();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isChatOpen) {
      e.preventDefault();
      toggleChat();
      setTimeout(() => {
        window.location.href = '/';
      }, 300);
    }
  };

  const handleNavLinkClick = (e: React.MouseEvent, href: string) => {
    const currentPath = window.location.pathname;
    const isWorkLink = href === '/#work';
    const isOnHomePage = currentPath === '/';

    if (isChatOpen) {
      e.preventDefault();
      toggleChat();
      setTimeout(() => {
        if (isWorkLink && isOnHomePage) {
          document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = href;
        }
      }, 300);
    } else {
      if (isWorkLink && isOnHomePage) {
        e.preventDefault();
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
      className={`w-full transition-all duration-300 ${
        scrolled ? 'py-4 bg-white border-b border-border shadow-sm' : 'py-6 bg-white'
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight transition-all duration-300 flex items-center gap-3 items-center"
          onClick={handleLogoClick}
        >
          <span className="flex items-center leading-none uppercase font-bold tracking-tight text-black">IMRAN</span>
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
            {navItems.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="link-effect text-foreground transition-all duration-300 hover:bg-gradient-to-r hover:from-accent hover:via-tertiary hover:to-accent hover:bg-[length:200%_auto] hover:bg-clip-text hover:text-transparent relative py-2"
                  onClick={e => handleNavLinkClick(e, item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile navigation */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-border py-6 shadow-md transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <nav className="container mx-auto px-6">
            <ul className="flex flex-col gap-6">
              {navItems.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3 px-4 text-foreground hover:bg-subtle-bg rounded-md transition-all duration-300 hover:text-accent"
                    onClick={e => {
                      setMobileMenuOpen(false);
                      handleNavLinkClick(e, item.href);
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
