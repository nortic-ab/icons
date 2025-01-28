import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = dirname(__filename) // get the name of the directory

export const PROJECT_ROOT = resolve(__dirname, '../')
export const ICONS_DIR = resolve(PROJECT_ROOT, 'icons')
export const FAVICONS_DIR = resolve(PROJECT_ROOT, 'favicons')
export const GENERATED_DIR = resolve(PROJECT_ROOT, '.generated')

export const DIST_DIR = resolve(PROJECT_ROOT, 'dist')
export const DIST_JSON_DIR = resolve(DIST_DIR, 'json')
export const DIST_SVG_DIR = resolve(DIST_DIR, 'svg')
export const DIST_FAVICONS_DIR = resolve(DIST_DIR, 'favicons')
