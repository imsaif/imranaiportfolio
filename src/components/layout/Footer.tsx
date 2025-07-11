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

          <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
            Let's craft intuitive interfaces for your AI systems that empower users with the right balance of automation and control.
          </p>

          <div className="flex justify-center mb-20">
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
          </div>

          <h4 className="text-lg font-semibold mb-6 text-foreground">Connect</h4>
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
