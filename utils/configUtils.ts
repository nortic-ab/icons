import { defu } from 'defu'
import config from '../icons.config'

export function getFaviconsConfig(name: string) {
  const configs = (config.favicon?.configs || [])
    .filter(favicon => (favicon.icons as string[]).includes(name))
    .map(({ config }) => config)
    .filter(config => config !== undefined)

  if (configs.length > 0) {
    const [firstConfig, ...rest] = configs

    return defu(firstConfig, ...rest)
  }

  return undefined
}
