'use client';

interface TerminalPillProps {
  command: string;
  onClick?: () => void;
}

const TerminalPill = ({ command, onClick }: TerminalPillProps) => (
  <div className="inline-flex items-center gap-1 rounded-full bg-text-primary p-1 pl-5 shadow-card">
    <code className="font-mono text-sm md:text-base text-white/90 mr-3 select-all">
      <span className="text-white/40 mr-2">$</span>
      {command}
    </code>
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-white text-text-primary text-sm font-medium px-5 py-2 transition-colors hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/40"
      aria-label={`Run ${command} demo`}
    >
      Run
    </button>
  </div>
);

export default TerminalPill;
