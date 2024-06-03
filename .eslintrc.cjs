module.exports = {
  root: true,
  env: {
    es2023: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react-refresh', 'prettier'],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },

  rules: {
    /// Prettier
    'prettier/prettier': 'warn',

    /// Vanilla
    'object-shorthand': ['warn', 'always'],
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],

    // TypeScript
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    '@typescript-eslint/no-floating-promises': ['warn', { ignoreVoid: true, ignoreIIFE: true }],
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: { arguments: false, attributes: false } }],
    '@typescript-eslint/no-unnecessary-condition': ['warn', { allowConstantLoopConditions: true }],
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-mixed-enums': 'error',
    '@typescript-eslint/no-explicit-any': 'off',

    /// Import
    'import/default': 'off',
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/order': [
      'warn',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
        groups: ['unknown', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'import/no-named-as-default-member': 'off',

    /// React Refresh
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },

  ignorePatterns: ['dist', '.eslintrc.cjs'],
};
