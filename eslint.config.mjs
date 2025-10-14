// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  // Ignore build artifacts and third-party libraries
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      // Third-party minified libraries
      'src/qrcode.min.js',
      // Third-party footballWidget libraries
      'src/widgets/footballWidget/js/**',
      'src/widgets/runnerWidget/scripts/**',
    ],
  },

  // Base recommended JS rules
  js.configs.recommended,

  // Test files - Jest environment
  {
    files: ['**/*.test.js', '**/*.spec.js', 'src/tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.jest, ...globals.node },
    },
  },

  // Configuration files (webpack, jest, etc.) - Node.js environment
  {
    files: ['*.config.js', '*.config.mjs', 'webpack.*.js', 'jest.*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },

  // Main application files - Browser environment
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // === Your previous preferences (kept) ===
      camelcase: 'off',
      'no-tabs': 'off',
      'no-new': 'off',
      'no-plusplus': 'off',
      'no-bitwise': 'off',
      'no-mixed-operators': 'off',
      'prefer-const': 'off',
      'no-param-reassign': 'off',
      'no-async-promise-executor': 'off',
      'brace-style': 'off',
      'no-console': 'off',

      // You had both of these toggled; keep the effective state:
      'no-unused-vars': 'off',

      // === Safer defaults / useful signals ===
      eqeqeq: 'error',
      'no-undef': 'warn',
      'no-useless-escape': 'warn',
      'no-empty': 'warn',
      'no-prototype-builtins': 'warn',
      'no-unreachable': 'warn',
      'no-dupe-keys': 'warn',
      'no-dupe-args': 'warn',
      'no-sparse-arrays': 'warn',
      'no-cond-assign': 'warn',
      'no-redeclare': 'warn',
      'no-const-assign': 'error',
      'no-irregular-whitespace': 'warn',
      'no-constant-condition': 'warn',
      'no-self-assign': 'warn',
      'getter-return': 'warn',
      'no-constant-binary-expression': 'warn',
      'no-control-regex': 'warn',
      'no-unexpected-multiline': 'warn',
      'no-global-assign': 'warn',

      // === Unused imports/vars (modern approach) ===
      // remove unused imports entirely
      'unused-imports/no-unused-imports': 'error',
      // warn on unused vars, but allow _prefix to ignore
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
