import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Nortic Icons Preview',
  description: 'A VitePress Site',
  vite: {
    plugins: [UnoCSS()],
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Icons', link: '/icons' },
    ],

    aside: false,

    sidebar: [
      {
        text: 'Icons',
        link: '/icons',
      },
      {
        text: 'UnoCSS Config',
        link: '/unocss',
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
