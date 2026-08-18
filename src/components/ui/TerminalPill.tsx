'use client';

interface TerminalPillProps {
  command: string;
  onClick?: () => void;
}

/**
 * A single outlined control: the whole command is the button, so the part that
 * looks like a command is also the part you can click. One affordance (the
 * border plus its hover state) rather than a dark fill and a separate button.
 */
const TerminalPill = ({ command, onClick }: TerminalPillProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={`Run ${command} to see what I have built`}
    className="group inline-flex items-center gap-2 rounded-full border border-border-secondary px-5 py-2.5 font-mono text-sm md:text-base text-text-secondary transition-colors hover:border-text-primary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
  >
    <span className="text-text-tertiary transition-colors group-hover:text-text-secondary">$</span>
    <span>{command}</span>
  </button>
);

export default TerminalPill;
