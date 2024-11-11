import { CollectionAfterChangeHook } from 'payload'

import { getProjectDetails } from '@/railway'

export const createService: CollectionAfterChangeHook = async ({
  operation,
  doc,
  collection,
  context,
  previousDoc,
  req,
}) => {
  if (operation === 'create') {
    const { payload } = req
    try {
      console.log('after create', doc, previousDoc)

      const projectDetails = await getProjectDetails({
        projectId: doc.projectId,
      })

      console.log('project details', projectDetails)
      // Function to poll for services with a delay
      const waitForService = async (
        projectId: string,
        retries = 5,
        delay = 2000,
      ): Promise<any | null> => {
        for (let i = 0; i < retries; i++) {
          const projectDetails = await getProjectDetails({ projectId })
          const services = projectDetails?.services?.edges

          if (services?.length > 0) {
            return services
          }

          console.log(`Retry ${i + 1}: Services not found, waiting...`)
          await new Promise(resolve => setTimeout(resolve, delay)) // Wait before retrying
        }

        console.log('Services not found after retries')
        return null // Return null if the service wasn't found after retries
      }

      // Call the waitForService function

      const services = await waitForService(doc?.projectId)
      if (services) {
        for (const service of services) {
          await payload.create({
            collection: 'services',
            data: {
              serviceName: service?.node?.name,
              icon: service?.node?.icon,
              serviceId: service?.node?.id,
              projectId: service?.node?.projectId,
              environmentId: doc.environmentId,
              project: doc?.id,
            },
          })
        }
      } else {
        throw new Error('Service not found after multiple attempts')
      }
    } catch (error) {
      console.log('Error while creating services', error)
      throw new Error('Failed to create Services')
    }
  }
}
