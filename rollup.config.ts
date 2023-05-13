import ts from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import pkg from './package.json' assert { type: 'json' }
import { defineConfig } from 'rollup'

const exports = {
  main: pkg.exports['.']
}

export default defineConfig([
  {
    input: './src/emitter.ts',
    output: [
      { file: exports.main.import, format: 'esm' },
      { file: exports.main.require, format: 'cjs' }
    ],
    plugins: [ts({ tsconfig: './tsconfig.json' })]
  },
  {
    input: './src/types.ts',
    output: [{ file: exports.main.types, format: 'esm' }],
    plugins: [dts()]
  }
])
