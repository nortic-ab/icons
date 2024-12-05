import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = dirname(__filename) // get the name of the directory

export const PROJECT_ROOT = resolve(__dirname, '../')
export const ICONS_DIR = resolve(PROJECT_ROOT, 'icons')
export const SRC_DIR = resolve(PROJECT_ROOT, 'src')
export const GENERATED_DIR = resolve(PROJECT_ROOT, '.generated')

export const JSON_DIR = resolve(GENERATED_DIR, 'json')
export const SVG_DIR = resolve(GENERATED_DIR, 'svg')

export const DIST_DIR = resolve(PROJECT_ROOT, 'dist')
