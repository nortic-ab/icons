import { cp } from 'node:fs'
import { defineConfig } from 'tsup'
import { DIST_DIR, GENERATED_DIR } from './scripts/paths'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: true,
  sourcemap: false,
  clean: true,

  onSuccess: async () => {
    await cp(GENERATED_DIR, DIST_DIR, { recursive: true }, (err) => {
      if (err) {
        throw err
      }
    })
  },
})
