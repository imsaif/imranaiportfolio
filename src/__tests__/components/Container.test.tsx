import { expect } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Container } from '../../components/layout/Container';

// Add jest-axe custom matcher
expect.extend(toHaveNoViolations);

describe('Container Component', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <p data-testid="child-element">Test Content</p>
      </Container>
    );

    // Check if children are rendered
    const childElement = screen.getByTestId('child-element');
    expect(childElement).toBeInTheDocument();
    expect(childElement).toHaveTextContent('Test Content');
  });

  it('applies default class names', () => {
    const { container } = render(
      <Container>
        <p>Test Content</p>
      </Container>
    );

    // Get the main container div
    const containerElement = container.firstChild;

    // Check for default classes
    expect(containerElement).toHaveClass('container');
    expect(containerElement).toHaveClass('mx-auto');
    expect(containerElement).toHaveClass('px-4');
  });

  it('applies additional class names when provided', () => {
    const { container } = render(
      <Container className="test-class bg-gray-100">
        <p>Test Content</p>
      </Container>
    );

    // Get the main container div
    const containerElement = container.firstChild;

    // Check for both default and additional classes
    expect(containerElement).toHaveClass('container');
    expect(containerElement).toHaveClass('mx-auto');
    expect(containerElement).toHaveClass('px-4');
    expect(containerElement).toHaveClass('test-class');
    expect(containerElement).toHaveClass('bg-gray-100');
  });

  // Accessibility test
  it('has no accessibility violations', async () => {
    const { container } = render(
      <Container>
        <h1>Heading</h1>
        <p>Some paragraph text</p>
        <button>Click me</button>
      </Container>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
