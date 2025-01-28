import type { ParseColorsOptions } from '@iconify/tools/lib/colors/parse.js'
import { blankIconSet, cleanupSVG, IconSet, isEmptyColor, parseColors, runSVGO } from '@iconify/tools'
import config from '../icons.config'

export function cleanupIconSet(iconSet: IconSet, parseColorOptions?: ParseColorsOptions) {
  iconSet.forEach(async (name, type) => {
    if (type !== 'icon') {
      return
    }

    const svg = iconSet.toSVG(name)
    if (!svg) {
      // Invalid icon
      iconSet.remove(name)
      return
    }

    // Clean up and optimise icons
    try {
      // Clean up icon code
      cleanupSVG(svg)

      // Assume icon is monotone: replace color with currentColor, add if missing
      // If icon is not monotone, remove this code
      if (parseColorOptions) {
        parseColors(svg, parseColorOptions)
      }

      // Optimise
      runSVGO(svg)
    }
    catch (err) {
      // Invalid icon
      console.error(`Error parsing ${name}:`, err)
      iconSet.remove(name)
      return
    }

    // Update icon
    iconSet.fromSVG(name, svg)
  })
}

export async function getCleanedIconVariationSet(baseIconSet: IconSet) {
  const cleanedIconSet = blankIconSet('nortic-icon-variants')

  config.variants.forEach((variant) => {
    const variantColor = variant.color
    const mode = variant.mode || 'fill'

    variant.icons.forEach((name) => {
      const svg = baseIconSet.toSVG(name)
      const variantName = `${name}-v-${variant.name}`

      if (svg) {
        parseColors(svg, {
          defaultColor: 'currentColor',
          callback: (attr, colorStr, color) => {
            const useAttrs = [mode ?? 'fill'].flat()

            if (useAttrs.includes(attr)) {
              return variantColor
            }

            return !color || isEmptyColor(color)
              ? colorStr
              : color
          },
        })

        cleanedIconSet.fromSVG(variantName, svg)
      }
    })
  })

  cleanupIconSet(cleanedIconSet)

  return cleanedIconSet
}

export async function getCleanedIconSet(iconSet: IconSet) {
  const cleanedIconSet = new IconSet(iconSet.export())

  cleanedIconSet.prefix = 'nortic-icons'

  config.exclude.forEach((name) => {
    cleanedIconSet.remove(name, false)
  })

  cleanupIconSet(cleanedIconSet, {
    defaultColor: 'currentColor',
    callback: () => 'currentColor',
  })

  return cleanedIconSet
}

export async function getCleanedFaviconSet(iconSet: IconSet) {
  const cleanedfaviconsSet = new IconSet(iconSet.export())

  cleanedfaviconsSet.prefix = 'nortic-favicons'

  config.favicon?.exclude?.forEach((name) => {
    cleanedfaviconsSet.remove(name, false)
  })

  await cleanupIconSet(cleanedfaviconsSet)

  return cleanedfaviconsSet
}
