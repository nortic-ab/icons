import type { IconifyJSON } from '@iconify/types'
import { execSync } from 'node:child_process'
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
    // current date as unix timestamp
    lastModified: new Date().getTime(),
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

execSync('pnpm clear')

const svgMeta = getSVGMeta()

createJsonFile(svgMeta)
createSvgFiles(svgMeta)
