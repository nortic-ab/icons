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

function createLogos(data: ReturnType<typeof getSVGMeta>, filenames: string[]) {
  mkdirSync(SVG_DIR, { recursive: true })

  const svgMap = new Map(data.map(({ name, raw }) => [name, raw]))

  filenames.forEach((filename) => {
    const rawSvg = svgMap.get(filename)

    if (rawSvg) {
      const variants = [
        { color: '#3344A9', variantName: `${filename}-blue` },
        { color: '#FFFFFF', variantName: `${filename}-white` },
      ]

      variants.forEach(({ color, variantName }) => {
        const updatedSvg = rawSvg.replace(/fill="[^"]*"/g, `fill="${color}"`)
        writeFileSync(`${SVG_DIR}/${variantName}.svg`, updatedSvg)
      })
    }
    else {
      console.warn(`No SVG found with the name "${filename}".`)
    }
  })
}

const svgMeta = getSVGMeta()

createJsonFile(svgMeta)
createSvgFiles(svgMeta)
createLogos(svgMeta, ['logo', 'logo-alt', 'logo-mini', 'slogan'])
