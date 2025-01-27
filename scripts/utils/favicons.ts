import { Buffer } from 'node:buffer'
import { favicons } from 'favicons'
import config from '../../icons.config'
import { getIcons } from './icons'

export async function getFavicons() {
  const iconData = getIcons()
  const promises = config.favicons.flatMap(({ icons, config }) => {
    const resolvedIcons = iconData.filter(({ name }) => icons.includes(name))

    return resolvedIcons.map(({ raw, name }) => {
      const buffer = Buffer.from(raw, 'utf-8')

      return favicons(buffer, config)
        .then(faviconsData => ({
          name,
          ...faviconsData,
        }))
    })
  })

  return await Promise.all(promises)
}
