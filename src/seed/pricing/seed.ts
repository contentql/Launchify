import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'

import { PricingPageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (spinner: Ora): Promise<any> => {
  try {
    spinner.start(`Started created pricing-page...`)

    const result = await payload.create({
      collection: 'pages',
      data: PricingPageData,
    })
    spinner.succeed(`Successfully created support-page`)
    return result
  } catch (error) {
    spinner.succeed(`Failed to create support-page`)
    throw error
  }
}

export default seed
