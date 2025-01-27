import type { IconifyJSON } from '@iconify/types'
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { cleanupSVG, SVG } from '@iconify/tools'
import { GENERATED_DIR, ICONS_DIR } from './paths'

export function getSVGMeta(dir: string) {
  const files = readdirSync(dir).filter(file => file.endsWith('.svg'))

  return files.map((file) => {
    const fileContent = readFileSync(`${dir}/${file}`, 'utf-8')
    const svg = new SVG(fileContent)

    cleanupSVG(svg)

    const {
      body,
      height,
      width,
      left,
      top,
      hFlip,
      rotate,
      vFlip,
    } = svg.getIcon()

    const resolvedIconData = {
      left: left || undefined,
      top: top || undefined,
      width: width === height ? undefined : width,
      height: height === width ? undefined : height,
      body,
      hFlip: hFlip || undefined,
      vFlip: vFlip || undefined,
      rotate: rotate || undefined,
    }

    return {
      name: file.replace('.svg', ''),
      fileName: file,
      raw: svg.toString(),
      icon: resolvedIconData,
    }
  }).filter(file => file !== undefined)
}

function generateIconifyJson(data: ReturnType<typeof getSVGMeta>, outPath = GENERATED_DIR) {
  mkdirSync(outPath, { recursive: true })

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

  const iconifyJsonContent = `
/**
 * This file is auto-generated. Do not modify this file manually.
 * Run 'yarn generate' to update this file.
 */
export const iconifyJson = ${JSON.stringify(jsonData, null, 2)} as const
`

  writeFileSync(`${outPath}/iconifyJson.ts`, iconifyJsonContent)
}

function generateSvgMeta(data: ReturnType<typeof getSVGMeta>, outPath = GENERATED_DIR) {
  mkdirSync(outPath, { recursive: true })

  const svgMetaContent = `
/**
 * This file is auto-generated. Do not modify this file manually.
 * Run 'yarn generate' to update this file.
 */
export const svgMeta = ${JSON.stringify(data, null, 2)} as const

export type SvgMeta = typeof svgMeta[number]
export type IconName = SvgMeta['name']
`

  writeFileSync(`${outPath}/svgMeta.ts`, svgMetaContent)
}

function generateIndex(outPath = GENERATED_DIR) {
  const indexContent = `
/**
 * This file is auto-generated. Do not modify this file manually.
 * Run 'yarn generate' to update this file.
 */
export * from './iconifyJson'
export * from './svgMeta'
`

  writeFileSync(`${outPath}/index.ts`, indexContent)
}

const svgMeta = getSVGMeta(ICONS_DIR)

generateIconifyJson(svgMeta)
generateSvgMeta(svgMeta)
generateIndex()
