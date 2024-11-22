import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'
import { RequiredDataFromCollectionSlug } from 'payload'

import {
  homePageAboutImageData,
  homePageData,
  homePageFeatureImageData,
  homePageHeroImageData,
} from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (spinner: Ora): Promise<any> => {
  try {
    spinner.start(`Started created home-page...`)
    const homeHeroImageSeedResult = await payload.create({
      collection: 'media',
      data: { alt: homePageHeroImageData?.alt },
      filePath: homePageHeroImageData?.filePath,
    })

    const aboutImageSeedResult = await payload.create({
      collection: 'media',
      data: { alt: homePageAboutImageData?.alt },
      filePath: homePageAboutImageData?.filePath,
    })

    const featuresImagesSeedResult = await Promise.allSettled(
      homePageFeatureImageData.map(FeaturesImages =>
        payload.create({
          collection: 'media',
          data: {
            alt: FeaturesImages.alt,
          },
          filePath: FeaturesImages.filePath,
        }),
      ),
    )

    const formattedFeaturesImagesResult = featuresImagesSeedResult
      .map(result =>
        result.status === 'fulfilled'
          ? result.value
          : `Failed to seed: ${result.reason}`,
      )
      .filter(result => typeof result !== 'string')

    const homeResult: RequiredDataFromCollectionSlug<'pages'> = {
      ...homePageData,
      layout: homePageData?.layout?.map((block, index) => {
        if (block?.blockType === 'HeroBlock') {
          return {
            ...block,
            image: homeHeroImageSeedResult?.id,
          }
        } else if (block?.blockType === 'FeatureBlock') {
          return {
            ...block,
            image1: formattedFeaturesImagesResult?.at(0)?.id!,
            image2: formattedFeaturesImagesResult?.at(1)?.id!,
          }
        } else if (block?.blockType === 'AboutBlock') {
          return {
            ...block,
            image: aboutImageSeedResult?.id,
          }
        }

        return block
      }),
    }
    const result = await payload.create({
      collection: 'pages',
      data: homeResult,
    })
    spinner.succeed(`Successfully created home-page`)
    return result
  } catch (error) {
    spinner.succeed(`Failed to create home-page`)
    throw error
  }
}

export default seed
