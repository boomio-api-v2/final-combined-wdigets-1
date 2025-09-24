// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  // Ignore build artifacts
  { ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**'] },

  // Base recommended JS rules
  js.configs.recommended,

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
      eqeqeq: 'off',
      'no-undef': 'warn',
      'no-useless-escape': 'off',
      'no-empty': 'off',
      'no-prototype-builtins': 'off',
      'no-unreachable': 'warn',
      'no-dupe-keys': 'warn',
      'no-dupe-args': 'warn',
      'no-sparse-arrays': 'warn',
      'no-cond-assign': 'warn',
      'no-redeclare': 'warn',
      'no-const-assign': 'warn',
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
      'unused-imports/no-unused-imports': 'warn',
      // warn on unused vars, but allow _prefix to ignore
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
];
