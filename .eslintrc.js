const eslintPluginUnicorn = require('eslint-plugin-unicorn');

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-unicorn'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:unicorn/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-new-array': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-anonymous-default-export': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/no-useless-undefined': 'off',
  },
};
