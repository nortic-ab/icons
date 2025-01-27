import config from '../../icons.config'
import { getIcons } from './icons'

export function generateIconVariant(original: string, color: string) {
  return original.replace(/fill="[^"]*"/g, `fill="${color}"`)
}

export function generateIconVariants() {
  const svgIconData = getIcons()

  return config.variants.flatMap(({ icons, name, color }) => {
    return svgIconData.filter(({ name }) => icons.includes(name)).map(({ name: iconName, raw }) => {
      const fileName = `${iconName}-v-${name}`
      const updatedSvg = generateIconVariant(raw, color)

      return {
        fileName,
        updatedSvg,
      }
    })
  })
}
