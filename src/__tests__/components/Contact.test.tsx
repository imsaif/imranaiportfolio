import { expect } from '@jest/globals';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import Contact from '../../components/features/Contact';

// Add jest-axe custom matcher
expect.extend(toHaveNoViolations);

describe('Contact Component', () => {
  it('renders correctly with form and contact info', () => {
    render(<Contact />);

    // Check heading elements
    expect(screen.getByText('Get in touch')).toBeInTheDocument();
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByText('Send a Message')).toBeInTheDocument();

    // Check form elements
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();

    // Check contact info
    expect(screen.getByText('imran@example.com')).toBeInTheDocument();
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA, USA')).toBeInTheDocument();

    // Check social links
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
  });

  it('handles form input changes', () => {
    render(<Contact />);

    // Get form fields
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Message');

    // Simulate user typing
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'This is a test message' } });

    // Check if input values are updated
    expect(nameInput).toHaveValue('Test User');
    expect(emailInput).toHaveValue('test@example.com');
    expect(messageInput).toHaveValue('This is a test message');
  });

  it('has form submit button with proper attributes', () => {
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
    expect(submitButton).not.toBeDisabled();

    // Check button styling
    expect(submitButton).toHaveClass('bg-accent');
    expect(submitButton).toHaveClass('text-white');
  });

  it('has accessible form fields with labels', () => {
    render(<Contact />);

    // Check if form fields are properly associated with labels
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Message');

    expect(nameInput).toHaveAttribute('id', 'name');
    expect(emailInput).toHaveAttribute('id', 'email');
    expect(messageInput).toHaveAttribute('id', 'message');

    // Check required attribute for validation
    expect(nameInput).toHaveAttribute('required');
    expect(emailInput).toHaveAttribute('required');
    expect(messageInput).toHaveAttribute('required');
  });
});

describe('Contact Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Contact />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
