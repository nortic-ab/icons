# UnoCSS Integration

A description on how to use icons with UnoCSS

## Setup

```bash
pnpm add -D @nortic/icons unocss
```

```ts
// uno.config.ts

import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        nortic: () => import('@nortic/icons').then(json => json.default)
      }
    })
  ]
})
```

## Usage

```html
<div class="i-nortic-logo" />
```
