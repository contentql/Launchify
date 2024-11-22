import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'
import { RequiredDataFromCollectionSlug } from 'payload'

import { themesImageData, themesPageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (spinner: Ora): Promise<any> => {
  try {
    spinner.start(`Started created themes-page...`)

    const themesImagesSeedResult = await Promise.allSettled(
      themesImageData.map(themeImage =>
        payload.create({
          collection: 'media',
          data: {
            alt: themeImage.alt,
          },
          filePath: themeImage.filePath,
        }),
      ),
    )

    const formattedThemeImagesResult = themesImagesSeedResult
      .map(result =>
        result.status === 'fulfilled'
          ? result.value
          : `Failed to seed: ${result.reason}`,
      )
      .filter(result => typeof result !== 'string')

    const ThemesResult: RequiredDataFromCollectionSlug<'pages'> = {
      ...themesPageData,
      layout: themesPageData?.layout?.map((block, index) => {
        if (block?.blockType === 'ThemesBlock') {
          return {
            ...block,
            Themes: block?.Themes?.map((theme, index) => {
              return {
                ...theme,
                image: formattedThemeImagesResult?.at(index)?.id!,
              }
            }),
          }
        }
        return block
      }),
    }
    const result = await payload.create({
      collection: 'pages',
      data: ThemesResult,
    })
    spinner.succeed(`Successfully created themes-page`)
    return result
  } catch (error) {
    spinner.succeed(`Failed to create themes-page`)
    throw error
  }
}

export default seed
