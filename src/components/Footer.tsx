'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="section-padding border-t border-border">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text inline-block">
            Looking to enhance your AI experience?
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
            <Link
              href="mailto:imranrizom@gmail.com"
              className="px-8 py-3 bg-gradient-to-r from-accent to-tertiary text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-accent/60 focus:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email Me
            </Link>
            <Link href="#contact" className="btn btn-outline flex items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                  clipRule="evenodd"
                />
              </svg>
              Schedule a Consultation
            </Link>
          </div>

          <div className="flex justify-center gap-12 text-muted mb-12">
            <a
              href="https://github.com/imranmohammed"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-accent transition-colors text-base"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/imranmohammed"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-accent transition-colors text-base"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/imranmohammed"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-accent transition-colors text-base"
            >
              Twitter
            </a>
          </div>

          <div className="pt-12 border-t border-border/50">
            <p className="text-sm text-muted">© {new Date().getFullYear()} Imran Mohammed • AI Experience Designer</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
