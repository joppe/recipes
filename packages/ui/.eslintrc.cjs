module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['@recipes/eslint-config', 'plugin:storybook/recommended'],
  plugins: ['svelte3', '@typescript-eslint'],
  ignorePatterns: ['*.cjs'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
};
