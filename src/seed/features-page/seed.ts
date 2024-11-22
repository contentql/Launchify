import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'
import { RequiredDataFromCollectionSlug } from 'payload'

import { featurePageHeroImageData, featuresPageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (spinner: Ora): Promise<any> => {
  try {
    spinner.start(`Started creating features-page...`)
    const homeHeroImageSeedResult = await payload.create({
      collection: 'media',
      data: { alt: featurePageHeroImageData?.alt },
      filePath: featurePageHeroImageData?.filePath,
    })

    const homeResult: RequiredDataFromCollectionSlug<'pages'> = {
      ...featuresPageData,
      layout: featuresPageData?.layout?.map((block, index) => {
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
      data: homeResult,
    })
    spinner.succeed(`Successfully created features-page`)
    return result
  } catch (error) {
    spinner.succeed(`Failed to create features-page`)
    throw error
  }
}

export default seed
