import type { ColorAttributes } from '@iconify/tools/lib/colors/attribs.js'
import type { FaviconOptions } from 'favicons'
import type { IconName as FaviconName } from '../.generated/nortic-favicons-pre-cleaned'
import type { IconName } from '../.generated/nortic-icons-pre-cleaned'
import { defu } from 'defu'

// TODO: Review this configuration to see if anything can be improved
interface Config {
  /**
   * The names of the icons to exclude from the build.
   */
  exclude: IconName[] // TODO: Should also be possible to use regex

  /**
   * Define colored variants of icons.
   */
  variants: Array<{

    /**
     * The name of the variant.
     */
    name: string

    /**
     * The names of the icons to generate variants for.
     */
    icons: IconName[]

    /**
     * The color of the variant.
     */
    color: string

    /**
     * The coloring mode of the variant. Can be either `fill`, `stroke` or an array of both.
     *
     * @default 'fill'
     */
    mode?: ColorAttributes | ColorAttributes[]
  }>

  /**
   * Define configurations for generating favicons.
   */
  favicon?: {

    /**
     * The names of the icons to exclude from the build.
     */
    exclude?: FaviconName[]
    configs?: Array<{
      icons: FaviconName[]
      config: FaviconOptions
    }>
  }
}

const DEFAULT_CONFIG: Config = {
  exclude: [],
  variants: [],
}

/**
 * Define the configuration for build output of icons.
 *
 * @param config
 * @returns The resolved configuration object.
 */
export function defineConfig(config: Partial<Config> = {}) {
  return defu(DEFAULT_CONFIG, config)
}
