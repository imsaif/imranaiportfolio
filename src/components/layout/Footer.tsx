'use client';

import FooterRobot from './FooterRobot';

const Footer = () => (
  <footer>
    <FooterRobot />
    <div className="container mx-auto max-w-6xl py-5 px-4 xs:px-5 sm:px-6 md:px-8 flex flex-row flex-wrap items-baseline justify-center gap-x-6 gap-y-2 text-sm text-text-secondary">
      <p>© {new Date().getFullYear()} Imran Mohammed</p>
      <div className="flex gap-6">
        <a
          href="mailto:imranrizom@gmail.com"
          className="hover:text-text-primary transition-colors"
        >
          Email
        </a>
        <a
          href="https://github.com/imsaif"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-primary transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/imsaif/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-primary transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://medium.com/@imsaif"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-text-primary transition-colors"
        >
          Medium
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
