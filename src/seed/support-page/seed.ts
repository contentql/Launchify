import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'
import { RequiredDataFromCollectionSlug } from 'payload'

import { SupportPageData, supportPageHeroImageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (spinner: Ora): Promise<any> => {
  try {
    spinner.start(`Started creating support-page...`)
    const homeHeroImageSeedResult = await payload.create({
      collection: 'media',
      data: { alt: supportPageHeroImageData?.alt },
      filePath: supportPageHeroImageData?.filePath,
    })

    const supportResult: RequiredDataFromCollectionSlug<'pages'> = {
      ...SupportPageData,
      layout: SupportPageData?.layout?.map((block, index) => {
        if (block?.blockType === 'HeroBlock') {
          return {
            ...block,
            image: homeHeroImageSeedResult?.id,
          }
        }

        return block
      }),
    }
    const result = await payload.create({
      collection: 'pages',
      data: supportResult,
    })
    spinner.succeed(`Successfully created support-page`)
    return result
  } catch (error) {
    spinner.succeed(`Failed to create support-page`)
    throw error
  }
}

export default seed
