import React from 'react';

export const LightBulbIcon = ({
  className = 'w-6 h-6',
  ariaLabel = 'Light Bulb',
}: {
  className?: string;
  ariaLabel?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
    aria-label={ariaLabel}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3a7 7 0 00-4 12.9V18a2 2 0 002 2h4a2 2 0 002-2v-2.1A7 7 0 0012 3z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 21h6" />
  </svg>
);

export const BeakerIcon = ({
  className = 'w-6 h-6',
  ariaLabel = 'Beaker',
}: {
  className?: string;
  ariaLabel?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
    aria-label={ariaLabel}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 3v6.75M15 3v6.75M4.5 21h15M5.25 21a2.25 2.25 0 01-2.25-2.25V17.5a2.25 2.25 0 012.25-2.25h13.5a2.25 2.25 0 012.25 2.25v1.25A2.25 2.25 0 0118.75 21"
    />
  </svg>
);

export const SparklesIcon = ({
  className = 'w-6 h-6',
  ariaLabel = 'Sparkles',
}: {
  className?: string;
  ariaLabel?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
    aria-label={ariaLabel}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636"
    />
  </svg>
);

export const ShieldCheckIcon = ({
  className = 'w-6 h-6',
  ariaLabel = 'Shield Check',
}: {
  className?: string;
  ariaLabel?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
    aria-label={ariaLabel}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3l7.5 4.5v5.25c0 5.25-3.75 9.75-7.5 11.25C8.25 22.5 4.5 18 4.5 12.75V7.5L12 3z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12.75l1.5 1.5 3-3" />
  </svg>
);

export const RefreshCwIcon = ({
  className = 'w-6 h-6',
  ariaLabel = 'Refresh',
}: {
  className?: string;
  ariaLabel?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
    aria-label={ariaLabel}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.93 4.93a10 10 0 0114.14 0M19.07 19.07a10 10 0 01-14.14 0M12 6v6l4 2"
    />
  </svg>
);
