# Nortic JSON Icons

Nortic Icons defined as a [IconifyJSON](https://iconify.design/docs/types/iconify-json.html).

This package is mainly used to define Nortic Icons in [UnoCSS Icons Preset](https://unocss.dev/presets/icons) and as a CDN distribution of our logos and icons.

## Install

```
npm install @nortic/icons
# pnpm add @nortic/icons
# yarn add @nortic/icons
```

## Usage

```js
import { IconSet } from '@iconify/tools'
import { norticFavicons, norticIcons } from '@nortic/icons'

const norticIconsSet = new IconSet(norticIcons)
const norticFaviconsSet = new IconSet(norticFavicons)
```

## CDN Usage

Using an NPM CDN such as [JSDelivr](https://www.jsdelivr.com/), it's possible to use icons or iconify json definitions directly:
- https://cdn.jsdelivr.net/npm/@nortic/icons@0.0.1/dist/svg/logo.svg
- https://cdn.jsdelivr.net/npm/@nortic/icons@0.0.1/dist/json/nortic-icons.svg

## Contribution

### Install dependencies

```
pnpm install
```

Running this command will automatically generate necessary icon meta data.

### Add new icons

1. Make sure your icon follows the same standard as the ones already present

2. Place the SVG file of the new icon in the [icons directory](./icons/) (or [favicons directory](./favicons/) if it should be generated as a favicon)

3. Generate the icon sets: `pnpm generate` / `pnpm postinstall`

### Configure release

To configure the build output, modify `icons.config.ts`.

For example, if you added an icon which should be built as a favicon, add it to the `favicons` list:

```ts
import { defineConfig } from './utils/defineConfig'

export default defineConfig({
  variants: [
    {
      icons: ['insight'],
      name: 'white',
      color: '#fff',
    },
    /* Other colored variants of an icon go here */
  ],
  favicon: {
    exclude: ['insight'],
    configs: [{
      icons: ['event-system', 'lobby']
      config: {
        /* favicon config */
      }
    }]
  }
})
```

### Build

To build the package, simply run `pnpm build`. This will also execute the `generate` script. If you want to build without executing the `generate` script, run `pnpm build-only`.
