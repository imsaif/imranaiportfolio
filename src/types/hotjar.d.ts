/**
 * Hotjar TypeScript Declarations
 */
declare global {
  interface Window {
    hj: {
      (...args: any[]): void;
      q: any[];
    };
    _hjSettings: {
      hjid: number;
      hjsv: number;
    };
  }
}

export {};
