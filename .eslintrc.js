module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'next/core-web-vitals',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import', 'jsx-a11y'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    // React rules
    'react/prop-types': 'off', // Not needed with TypeScript
    'react/react-in-jsx-scope': 'off', // Not needed in Next.js
    'react/display-name': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/no-unescaped-entities': 'warn', // Downgrade to warning for now

    // TypeScript rules
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Downgrade to warning
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn', // Downgrade to warning
    '@typescript-eslint/no-empty-function': 'warn', // Downgrade to warning

    // Import rules
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': ['warn', { alphabetize: { order: 'asc', caseInsensitive: true } }], // Simplify order rule
    'import/no-unresolved': 'warn', // Downgrade to warning

    // General rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'max-len': ['warn', { code: 120, ignoreComments: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
    
    // Whitespace and formatting rules
    'no-trailing-spaces': 'error', // Disallow trailing whitespace at the end of lines
    'eol-last': ['error', 'always'], // Require newline at the end of files
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }], // Limit consecutive empty lines
    'no-irregular-whitespace': 'error', // Disallow irregular whitespace

    // Accessibility rules
    'jsx-a11y/anchor-is-valid': 'warn', // Accessibility
    'jsx-a11y/label-has-associated-control': 'warn', // Downgrade to warning
    'jsx-a11y/click-events-have-key-events': 'warn', // Downgrade to warning
    'jsx-a11y/no-static-element-interactions': 'warn', // Downgrade to warning
  },
};
