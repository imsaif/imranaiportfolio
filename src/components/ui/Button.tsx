'use client';

import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  preventScroll?: boolean;
  disabled?: boolean;
  'aria-disabled'?: boolean;
  target?: string;
  rel?: string;
}

const Button = ({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  preventScroll = false,
  disabled = false,
  'aria-disabled': ariaDisabled = false,
  target,
  rel,
}: ButtonProps) => {
  // Actually disabled if either disabled or aria-disabled is true
  const isDisabled = disabled || ariaDisabled;

  // Define base styles for the inner button
  let innerBase =
    'flex items-center justify-center w-full h-full px-6 py-2.5 bg-white rounded-xl text-black font-bold text-base tracking-wide transition-all duration-300';

  // Adjust for variant
  if (variant === 'primary') {
    innerBase += ' group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-tertiary group-hover:text-white';
  } else if (variant === 'outline') {
    innerBase += ' bg-white text-black';
  } else if (variant === 'secondary') {
    innerBase = innerBase + ' bg-accent/10 text-accent';
  } else if (variant === 'ghost') {
    innerBase = innerBase + ' bg-transparent text-foreground';
  }

  // Outer wrapper for the gradient border
  const outerBase =
    'inline-flex rounded-xl bg-gradient-to-r from-accent to-tertiary p-[1.5px] transition-all duration-300 group focus:outline-none';

  // Add disabled styles if needed
  const disabledStyle = isDisabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : '';

  // Wrapper for click handler that can prevent scroll jump
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    if (preventScroll) {
      e.preventDefault();
      e.stopPropagation();
      if (onClick) {
        onClick(e as React.MouseEvent<HTMLButtonElement>);
      }
    } else if (onClick && !href) {
      onClick(e as React.MouseEvent<HTMLButtonElement>);
    }
  };

  // Button content
  const content = <span className={`${innerBase} ${className} ${disabledStyle}`}>{children}</span>;

  // Return a Link or button based on whether href is provided
  if (href && !isDisabled) {
    return (
      <span className={outerBase}>
        <Link
          href={href}
          className="w-full h-full"
          onClick={preventScroll ? handleClick : onClick}
          target={target}
          rel={rel}
        >
          {content}
        </Link>
      </span>
    );
  }

  // If disabled or no href, return a button
  return (
    <span className={outerBase}>
      <button
        type="button"
        className="w-full h-full"
        onClick={handleClick}
        disabled={isDisabled}
        aria-disabled={isDisabled}
      >
        {content}
      </button>
    </span>
  );
};

export default Button;
