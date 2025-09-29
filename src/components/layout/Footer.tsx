'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-20 lg:pb-24 border-t border-border mt-8 md:mt-12 lg:mt-16">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16 rounded-xl bg-white border border-gray-200 min-h-[380px] shadow-[0_0_35px_rgba(112,117,224,0.15),0_0_70px_rgba(224,99,124,0.1)]">
            {/* Terminal Content */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-baseline">
                  <span className="text-gray-900 font-mono text-sm mr-2 animate-blink">{'>'}</span>
                  <p className="text-sm font-mono text-gray-900 uppercase tracking-wider whitespace-nowrap">
                    Currently Building
                  </p>
                </div>
                <a
                  href="https://github.com/imsaif"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-300 hover:border-accent/50 px-4 py-1 rounded-lg text-xs font-mono text-gray-600 hover:text-gray-900 transition-all duration-200 flex items-center gap-1 flex-shrink-0 whitespace-nowrap"
                >
                  GitHub →
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a
                  href="https://github.com/imsaif/aiex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-10 px-8 rounded-lg border border-gray-200 hover:border-accent/50 bg-gray-50 hover:bg-gray-100 transition-all duration-200 min-h-[160px]"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:gradient-text transition-all duration-200">
                    AI UX Design Guide
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                    Comprehensive resource for human-centered AI experiences
                  </p>
                </a>
                <a
                  href="https://github.com/imsaif/design-with-claude"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-10 px-8 rounded-lg border border-gray-200 hover:border-tertiary/50 bg-gray-50 hover:bg-gray-100 transition-all duration-200 min-h-[160px]"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:gradient-text transition-all duration-200">
                    DesignwithClaude
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                    Specialized AI agents + CLI tool for design challenges, powered by Claude
                  </p>
                </a>
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 gradient-text block pb-2">
            Looking to enhance your AI experience?
          </h2>

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
              href="https://github.com/imsaif"
                    target="_blank"
                    rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-accent transition-colors text-base"
            >
              GitHub
            </a>
            <a
                    href="https://www.linkedin.com/in/imsaif/"
                    target="_blank"
                    rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-accent transition-colors text-base"
            >
              LinkedIn
            </a>
            <a
              href="https://medium.com/@imsaif"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Medium"
              className="hover:text-accent transition-colors text-base"
            >
              Medium
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
