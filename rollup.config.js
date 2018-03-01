// rollup.config.js
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: {
    file:'dist/bundle.js',
    format:'cjs'
  },
  plugins: [
    nodeResolve({ jsnext: true }),
    commonjs(),
    babel()
  ]
}
