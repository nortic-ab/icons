import json from '@nortic/icons'
import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        nortic: () => json,
      },
    }),
  ],

  safelist: Object.keys(json.icons).map(k => `i-nortic-${k}`),
})
