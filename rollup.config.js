import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/main.es.js',
      format: 'es',
    },
    {
      file: 'dist/main.iife.js',
      format: 'iife',
      name: 'Zelda'
    },
  ],
  plugins: [
    resolve({
      extensions: ['.ts'],
    }),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      extensions: ['.ts', '.tsx'],
    }),
  ],
};
