import type { FaviconOptions } from 'favicons'
import type { IconName } from '../.generated'
import { defu } from 'defu'

interface Config {
  exclude: IconName[]
  variants: Array<{
    name: string
    icons: IconName[]
    color: string
  }>
  favicons: Array<{
    icons: IconName[]
    config?: FaviconOptions
  }>
}

const DEFAULT_CONFIG: Config = {
  exclude: [],
  variants: [],
  favicons: [],
}

export function defineConfig(config: Partial<Config> = {}) {
  return defu(DEFAULT_CONFIG, config)
}
