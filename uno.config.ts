import { defineConfig, presetIcons, presetUno } from 'unocss'
import json from './.generated/json/nortic.json'

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
