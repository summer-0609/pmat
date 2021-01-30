module.exports = {
  extends: [require.resolve('@rokku/fabric/dist/eslint')],
  ignorePatterns: ['/.*'],
  rules: {
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    'class-methods-use-this': 0,
    'import/no-extraneous-dependencies': 0
  },
};
