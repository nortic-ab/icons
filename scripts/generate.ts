import type { IconSet } from '@iconify/tools'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { importDirectorySync } from '@iconify/tools'
import { getCleanedFaviconSet, getCleanedIconSet, getCleanedIconVariationSet } from '../utils/iconSetUtils'
import { FAVICONS_DIR, GENERATED_DIR, ICONS_DIR } from './paths'

function getIconSet(dir: string, name: string) {
  const iconSet = importDirectorySync(dir, {
    prefix: name,
  })

  return iconSet
}

function generateIconifyJson(iconSet: IconSet, outputDir: string, fileName: string) {
  const iconifyJson = iconSet.export()

  mkdirSync(outputDir, { recursive: true })

  const content = `
const iconifyJson = ${JSON.stringify(iconifyJson, null, 2)} as const

export type IconName = keyof typeof iconifyJson.icons

export default iconifyJson
  `

  writeFileSync(join(outputDir, fileName), content)
}

const iconSet = getIconSet(ICONS_DIR, 'nortic-icons-pre-cleaned')
const faviconSet = getIconSet(FAVICONS_DIR, 'nortic-favicons-pre-cleaned')
const cleanedIconSet = await getCleanedIconSet(iconSet)
const cleanedFaviconSet = await getCleanedFaviconSet(faviconSet)
const cleanedIconVariantSet = await getCleanedIconVariationSet(iconSet)

generateIconifyJson(iconSet, GENERATED_DIR, 'nortic-icons-pre-cleaned.ts')
generateIconifyJson(faviconSet, GENERATED_DIR, 'nortic-favicons-pre-cleaned.ts')
generateIconifyJson(cleanedIconSet, GENERATED_DIR, 'nortic-icons.ts')
generateIconifyJson(cleanedIconVariantSet, GENERATED_DIR, 'nortic-icon-variants.ts')
generateIconifyJson(cleanedFaviconSet, GENERATED_DIR, 'nortic-favicons.ts')
