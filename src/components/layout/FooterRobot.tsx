'use client';

const FooterRobot = () => (
  <a
    href="https://llmsgist.org"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Is your product readable by AI LLMs? Visit llmsgist.org"
    className="group relative block h-10 w-full border-t border-border-primary"
  >
    <span
      className="robot-walk pointer-events-none absolute top-0 -translate-y-1/2 inline-flex items-center justify-center w-6 h-6 group-hover:[animation-play-state:paused]"
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logos/llmsgist-icon.svg"
        alt=""
        width={20}
        height={20}
        className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity"
      />
    </span>

    <span
      role="tooltip"
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-text-primary text-white text-xs font-medium px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-card"
    >
      Is your product readable by AI? Click to find out →
    </span>
  </a>
);

export default FooterRobot;
