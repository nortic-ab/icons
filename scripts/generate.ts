import type { IconifyJSON } from '@iconify/types'
import { mkdirSync, writeFileSync } from 'node:fs'
import { JSON_DIR, SVG_DIR } from './paths'
import { getSVGMeta } from './utils'

function createJsonFile(data: ReturnType<typeof getSVGMeta>) {
  const iconSet = data.reduce((acc, { name, icon }) => {
    return {
      ...acc,
      [name]: icon,
    }
  }, {})

  const jsonData: IconifyJSON = {
    prefix: 'nortic',
    lastModified: new Date().getTime(), // Current date as a Unix timestamp
    icons: iconSet,
  }

  const asJson = JSON.stringify(jsonData, null, 2)

  mkdirSync(JSON_DIR, { recursive: true })

  writeFileSync(`${JSON_DIR}/nortic.json`, asJson)
}

function createSvgFiles(data: ReturnType<typeof getSVGMeta>) {
  const svgFiles = data.map(({ name, raw }) => {
    return {
      name,
      raw,
    }
  })

  mkdirSync(SVG_DIR, { recursive: true })

  svgFiles.forEach(({ name, raw }) => {
    writeFileSync(`${SVG_DIR}/${name}.svg`, raw)
  })
}

function createSvgVariantFiles(
  data: ReturnType<typeof getSVGMeta>,
  { variants, icons }: { variants: Record<string, string>, icons: string[] },
) {
  mkdirSync(SVG_DIR, { recursive: true })

  // Convert data to a Map for faster lookups
  const svgMap = new Map(data.map(({ name, raw }) => [name, raw]))

  icons.forEach((icon) => {
    const rawSvg = svgMap.get(icon)

    if (rawSvg) {
      Object.entries(variants).forEach(([variantName, color]) => {
        const fileName = `${icon}-${variantName}`
        const updatedSvg = rawSvg.replace(/fill="[^"]*"/g, `fill="${color}"`)
        writeFileSync(`${SVG_DIR}/${fileName}.svg`, updatedSvg)
      })
    }
    else {
      console.warn(`No SVG found with the name "${icon}".`)
    }
  })
}

const svgMeta = getSVGMeta()

createJsonFile(svgMeta)
createSvgFiles(svgMeta)
createSvgVariantFiles(svgMeta, {
  variants: { blue: '#3344A9', white: '#FFFFFF' },
  icons: ['logo', 'logo-alt', 'logo-mini', 'slogan'],
})
