import { defineConfig } from '@hypernym/bundler'

export default defineConfig({
  entries: [
    { input: './src/index.ts' },
    { input: './src/index.ts', output: './dist/index.min.js', minify: true },
    { dts: './src/types.ts', output: './dist/index.d.ts' },
    {
      input: './src/index.ts',
      output: './dist/index.iife.js',
      name: 'Emitter',
      format: 'iife',
      minify: true,
    },
    {
      input: './src/index.ts',
      output: './dist/index.umd.js',
      name: 'Emitter',
      format: 'umd',
      minify: true,
    },
  ],
})
