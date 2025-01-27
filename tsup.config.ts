import { execSync } from 'node:child_process'
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
    execSync('pnpm build:post', { stdio: 'inherit' })
  },
})
