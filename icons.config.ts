import { defineConfig } from './utils/defineConfig'

export default defineConfig({
  exclude: ['marketing'],
  variants: [{
    icons: ['insight', 'logo-slogan'],
    mode: 'fill',
    name: 'white',
    color: '#fff',
  }],
  favicon: {
    exclude: [],
    configs: [{
      icons: ['insight'],
      config: {
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          favicons: true,
          windows: false,
          yandex: false,
        },
      },
    }],
  },
})
