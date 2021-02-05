module.exports = {
  extends: [require.resolve('@rokku/fabric/dist/eslint')],
  ignorePatterns: ['/.*'],
  rules: {
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    'class-methods-use-this': 0,
    'import/no-extraneous-dependencies': 0,
    'no-await-in-loop': 0,
    'no-return-await': 0,
    'no-restricted-syntax': 0,
    'no-underscore-dangle': 0.
  },
};
