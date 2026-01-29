module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'prefer-const': 'error',
    'no-var': 'error',
  },
};
