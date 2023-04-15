/* eslint-env node */

module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  importOrder: [
    '^react/?(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@recipes/(.*)$',
    '^../(.*)$',
    '^./(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};
