import React from 'react';

/**
 * ProgressBar component for showing scroll progress at the top of the page.
 * @param {object} props
 * @param {number} props.progress - Progress percentage (0-100)
 */
export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="fixed top-0 left-0 w-full z-50 h-1 bg-transparent">
    <div
      className="h-full transition-all duration-200 ease-out bg-gradient-to-r from-slate-500 via-slate-500 to-slate-500 shadow-md"
      style={{ width: `${progress}%` }}
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      role="progressbar"
    />
  </div>
);

export default ProgressBar;
