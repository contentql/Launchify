import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Ora } from 'ora'

import { InsurancePageData } from './data'

const payload = await getPayloadHMR({ config: configPromise })

const seed = async (spinner: Ora): Promise<any> => {
  try {
    spinner.start(`Started creating insurance-page...`)

    const result = await payload.create({
      collection: 'pages',
      data: InsurancePageData,
    })
    spinner.succeed(`Successfully created insurance-page`)
    return result
  } catch (error) {
    spinner.succeed(`Failed to create insurance-page`)
    throw error
  }
}

export default seed
