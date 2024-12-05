# Nortic JSON Icons

Nortic Icons defined as a [IconifyJSON](https://iconify.design/docs/types/iconify-json.html).

This package is mainly used to define Nortic Icons in [UnoCSS Icons Preset](https://unocss.dev/presets/icons) and as a CDN distribution of our logos and icons.

## Install

```
npm install @nortic-ab/icons
# pnpm add @nortic-ab/icons
# yarn add @nortic-ab/icons
```

## Usage

```js
import { IconSet } from '@iconify/tools'
import icons from '@nortic-ab/icons'

const iconSet = new IconSet(icons)
```

## Contribution

### Install dependencies

```
pnpm install
```

### Add new icons

1. Make sure your icon follows the same standard as the ones already present

2. Place the SVG file of the new icon in the [icons directory](./icons/)

3. Generate the icon set: `pnpm generate`

### Build

To build the package, simply run `pnpm build`. This will also execute the `generate` script. If you want to build without executing the `generate` script, run `pnpm build-only`.
