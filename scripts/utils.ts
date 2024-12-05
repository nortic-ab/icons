import { readdirSync, readFileSync } from 'node:fs'
import { cleanupSVG, SVG } from '@iconify/tools'
import { ICONS_DIR } from './paths'

export function getSVGMeta() {
  const files = readdirSync(ICONS_DIR).filter(file => file.endsWith('.svg'))

  return files.map((file) => {
    const fileContent = readFileSync(`${ICONS_DIR}/${file}`, 'utf-8')
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
      original_path: `${ICONS_DIR}/${file}`,
      raw: svg.toString(),
      icon: resolvedIconData,
    }
  }).filter(file => file !== undefined)
}
