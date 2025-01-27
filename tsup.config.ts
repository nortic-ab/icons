import { defineConfig } from 'tsup'
import { postBuild } from './scripts/postBuild'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: false,
  clean: true,

  onSuccess: async () => {
    await postBuild()
  },
})
