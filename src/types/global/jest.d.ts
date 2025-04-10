import '@testing-library/jest-dom';
import 'jest-extended';

declare global {
  // Override Chai assertions from Cypress with Jest assertions
  namespace Chai {
    interface Assertion {
      toBe(expected: any): Assertion;
      toBeUndefined(): Assertion;
      toBeDefined(): Assertion;
      toContain(item: any): Assertion;
      toHaveProperty(property: string): Assertion;
      toBeLessThanOrEqual(expected: number): Assertion;
      toBeGreaterThan(expected: number): Assertion;
      toThrow(expected?: any): Assertion;
    }
  }

  namespace jest {
    interface Matchers<R> {
      toHaveProperty(property: string): R;
      toBe(expected: any): R;
      toBeUndefined(): R;
      toBeDefined(): R;
      toContain(item: any): R;
      toBeLessThanOrEqual(expected: number): R;
      toBeGreaterThan(expected: number): R;
      toThrow(expected?: any): R;
    }
  }
}

// This is needed to make the file a module
export {}; 