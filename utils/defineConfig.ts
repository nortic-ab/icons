import type { FaviconOptions } from 'favicons'
import type { IconName } from '../.generated'
import { defu } from 'defu'

interface Config {
  /**
   * The names of the icons to exclude from the build.
   */
  exclude: IconName[] // TODO: Should also be possible to use regex

  /**
   * Define colored variants of icons.
   * This will use the `fill` attribute to color the icons.
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
  }>

  /**
   * Define configurations for generating favicons.
   */
  favicons: Array<{

    /**
     * The names of the icons to generate favicons for.
     */
    icons: IconName[]

    /**
     * Override the default options of `favicons`.
     *
     * @see https://github.com/itgalaxy/favicons
     */
    config?: FaviconOptions
  }>
}

const DEFAULT_CONFIG: Config = {
  exclude: [],
  variants: [],
  favicons: [],
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
