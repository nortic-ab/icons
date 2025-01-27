import { svgMeta } from '../../.generated'
import config from '../../icons.config'

export function getIcons() {
  return svgMeta.filter(({ name }) => !config.exclude.includes(name))
}
