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
}: ButtonProps) => {
  // Actually disabled if either disabled or aria-disabled is true
  const isDisabled = disabled || ariaDisabled;

  // Define base styles that all buttons share
  const baseStyle =
    'group inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-300 text-sm font-medium cursor-pointer';

  // Define variant-specific styles
  let variantStyle = '';
  switch (variant) {
    case 'primary':
      // More distinctive gradient style using brand colors
      variantStyle = 'bg-gradient-to-r from-accent to-tertiary text-white shadow-md border-none hover:shadow-lg transform hover:-translate-y-0.5 transition-all';
      break;
    case 'outline':
      // Simpler, high-contrast implementation with neutral color
      variantStyle = 'bg-transparent border-2 border-gray-300 text-foreground hover:bg-gray-100';
      break;
    case 'secondary':
      variantStyle = 'bg-accent/10 hover:bg-accent/20 text-accent';
      break;
    case 'ghost':
      variantStyle = 'bg-transparent hover:bg-gray-100 text-foreground';
      break;
    default:
      variantStyle = 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md border-2 border-indigo-500';
  }

  // Add disabled styles if needed
  const disabledStyle = isDisabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : '';

  // Combine all styles
  const combinedStyles = `${baseStyle} ${variantStyle} ${disabledStyle} ${className}`;

  // Wrapper for click handler that can prevent scroll jump
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    
    if (preventScroll) {
      // Simple approach: just prevent default behavior for buttons with preventScroll
      e.preventDefault();
      e.stopPropagation();

      // Call the provided click handler
      if (onClick) {
        onClick(e as React.MouseEvent<HTMLButtonElement>);
      }
    } else if (onClick && !href) {
      // Default behavior for regular buttons
      onClick(e as React.MouseEvent<HTMLButtonElement>);
    }
  };

  // Return a Link or button based on whether href is provided
  if (href && !isDisabled) {
    return (
      <Link href={href} className={combinedStyles} onClick={preventScroll ? handleClick : onClick}>
        {children}
      </Link>
    );
  }

  // If disabled or no href, return a button
  return (
    <button 
      type="button" 
      className={combinedStyles} 
      onClick={handleClick} 
      disabled={isDisabled}
      aria-disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
