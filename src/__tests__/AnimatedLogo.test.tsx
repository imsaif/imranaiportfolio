import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect } from '@jest/globals';
import { axe, toHaveNoViolations } from 'jest-axe';

import AnimatedLogo from '../components/AnimatedLogo';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Add jest-axe custom matcher
expect.extend(toHaveNoViolations);

describe('AnimatedLogo Component', () => {
  it('renders correctly', () => {
    const { container } = render(<AnimatedLogo />);
    
    // Check basic structure
    const logoContainer = container.firstChild;
    expect(logoContainer).toHaveClass('relative');
    
    // Check if vertical line exists
    const verticalLine = container.querySelector('.bg-gradient-to-b');
    expect(verticalLine).toBeInTheDocument();
    
    // Check if 3 diagonal slashes are rendered
    const diagonalSlashes = container.querySelectorAll('.bg-gradient-to-tr');
    expect(diagonalSlashes.length).toBe(3);
  });

  it('applies additional classes when className prop is provided', () => {
    const { container } = render(<AnimatedLogo className="test-class" />);
    
    // Check if the custom class is applied
    const logoContainer = container.firstChild;
    expect(logoContainer).toHaveClass('relative');
    expect(logoContainer).toHaveClass('test-class');
  });

  it('has proper color gradients', () => {
    const { container } = render(<AnimatedLogo />);
    
    // Check vertical line gradients
    const verticalLine = container.querySelector('.bg-gradient-to-b');
    expect(verticalLine).toHaveClass('from-accent');
    expect(verticalLine).toHaveClass('to-tertiary');
    
    // Check diagonal slashes gradients
    const diagonalSlash = container.querySelector('.bg-gradient-to-tr');
    expect(diagonalSlash).toHaveClass('from-accent');
    expect(diagonalSlash).toHaveClass('to-tertiary');
  });

  // Accessibility test
  it('has no accessibility violations', async () => {
    const { container } = render(<AnimatedLogo />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 