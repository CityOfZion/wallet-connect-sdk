import { readFileSync } from 'fs'

import commonjs from '@rollup/plugin-commonjs'
import autoExternal from 'rollup-plugin-auto-external'
import typescript from 'rollup-plugin-ts'
import esbuild from 'rollup-plugin-esbuild'
import nodePolyfills from 'rollup-plugin-polyfill-node'

const pkg = JSON.parse(readFileSync('./package.json'))

const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
  'svelte/compiler',
  'svelte/store',
]

export default [
  {
    input: 'src/index.ts',
    output: [{ file: pkg.main, format: 'es' }],
    external,
    plugins: [nodePolyfills(), commonjs(), autoExternal(), esbuild()],
  },
  {
    input: 'src/index.ts',
    output: [{ file: pkg.types, format: 'es' }],
    plugins: [nodePolyfills(), typescript()],
  },
]
