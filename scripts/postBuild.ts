import type { IconifyJSON } from '@iconify/types'
import { Buffer } from 'node:buffer'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { exportToDirectory, IconSet } from '@iconify/tools'
import favicons from 'favicons'
import iconifyJsonFavicons from '../.generated/nortic-favicons'
import iconifyJsonIconVariants from '../.generated/nortic-icon-variants'
import iconifyJsonIcons from '../.generated/nortic-icons'
import { getFaviconsConfig } from '../utils/configUtils'
import { DIST_FAVICONS_DIR, DIST_JSON_DIR, DIST_SVG_DIR } from './paths'

async function createIconSvg(json: IconifyJSON) {
  await exportToDirectory(new IconSet(json), {
    target: join(DIST_SVG_DIR),
    autoHeight: false,
    cleanup: false,
    includeAliases: true,
  })
}

async function createFavicons() {
  const faviconsSet = new IconSet(iconifyJsonFavicons)

  faviconsSet.forEach(async (name, type) => {
    if (type !== 'icon') {
      return
    }

    const svg = faviconsSet.toSVG(name)

    if (svg) {
      mkdirSync(join(DIST_FAVICONS_DIR, name), { recursive: true })

      const faviconConfig = getFaviconsConfig(name)
      const svgContent = svg.toString()
      const buffer = Buffer.from(svgContent)

      const favicon = await favicons(buffer, faviconConfig)

      favicon.images.forEach((image) => {
        writeFileSync(join(DIST_FAVICONS_DIR, name, image.name), image.contents)
      })

      writeFileSync(join(DIST_FAVICONS_DIR, name, 'favicon.svg'), svgContent)
    }
  })
}

function createIconifyJson(data: IconifyJSON, outputDir: string, fileName: string) {
  mkdirSync(outputDir, { recursive: true })
  const content = JSON.stringify(data, null, 2)

  writeFileSync(join(outputDir, fileName), content)
}

async function createIconFiles() {
  createIconifyJson(iconifyJsonIcons, DIST_JSON_DIR, 'nortic-icons.json')
  await createIconSvg(iconifyJsonIcons)
}

async function createIconVariantFiles() {
  createIconifyJson(iconifyJsonIconVariants, DIST_JSON_DIR, 'nortic-icon-variants.json')
  await createIconSvg(iconifyJsonIconVariants)
}

async function createFaviconFiles() {
  createIconifyJson(iconifyJsonFavicons, DIST_JSON_DIR, 'nortic-favicons.json')
  await createFavicons()
}

export async function postBuild() {
  await createIconFiles()
  await createIconVariantFiles()
  await createFaviconFiles()
}
