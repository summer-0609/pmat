module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/env',
      {
        targets: {
          browsers: ['defaults', 'not ie <= 8'],
        },
      },
    ],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
