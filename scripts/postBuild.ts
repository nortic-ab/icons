import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { DIST_FAVICONS_DIR, DIST_JSON_DIR, DIST_SVG_DIR } from './paths'
import { getIcons } from './utils'
import { getFavicons } from './utils/favicons'
import { generateIconVariants } from './utils/iconVariant'
import { getMetaAsJSON } from './utils/json'

function buildJsonFile() {
  mkdirSync(DIST_JSON_DIR, { recursive: true })

  const jsonMeta = getMetaAsJSON()

  writeFileSync(join(DIST_JSON_DIR, 'nortic.json'), jsonMeta)
}

function buildIcons() {
  const icons = getIcons()

  const svgFiles = icons.map(({ name, raw }) => {
    return {
      name,
      raw,
    }
  })

  mkdirSync(DIST_SVG_DIR, { recursive: true })

  svgFiles.forEach(({ name, raw }) => {
    writeFileSync(join(DIST_SVG_DIR, `${name}.svg`), raw)
  })
}

function buildIconVariants() {
  mkdirSync(DIST_SVG_DIR, { recursive: true })

  const iconVariants = generateIconVariants()

  iconVariants.forEach(({ fileName, updatedSvg }) => {
    writeFileSync(join(DIST_SVG_DIR, `${fileName}.svg`), updatedSvg)
  })
}

async function buildFavicons() {
  const faviconsData = await getFavicons()

  faviconsData.forEach(({ images, name: iconName }) => {
    images.forEach(({ name, contents }) => {
      mkdirSync(join(DIST_FAVICONS_DIR, iconName), { recursive: true })

      writeFileSync(join(DIST_FAVICONS_DIR, iconName, name), contents)
    })
  })
}

buildJsonFile()
buildIcons()
buildIconVariants()
await buildFavicons()
