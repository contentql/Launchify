import { CollectionBeforeChangeHook } from 'payload'

import { getProjectDetails, templateDeploy } from '@/railway'
import { ENVIRONMENT_ID } from '@/utils/railwayConstants'

export const createGhostTemplate: CollectionBeforeChangeHook = async ({
  req,
  operation,
  collection,
  data,
  originalDoc,
  context,
}) => {
  const { payload } = req
  if (operation === 'create') {
    try {
      // Deploy the template and get its initial details
      const ghostTemplate = await templateDeploy({
        name: data?.name,
      })

      // Store projectId in the data object
      data.projectId = ghostTemplate.projectId

      // Function to poll for services with a delay
      const waitForService = async (
        projectId: string,
        serviceName: string,
        retries = 5,
        delay = 2000,
      ): Promise<any | null> => {
        for (let i = 0; i < retries; i++) {
          const projectDetails = await getProjectDetails({ projectId })
          const service = projectDetails?.services?.edges?.find(
            (service: any) =>
              service?.node?.name?.trim().toLowerCase() ===
              serviceName?.trim().toLowerCase(),
          )

          if (service) {
            return service.node
          }

          console.log(`Retry ${i + 1}: Service not found, waiting...`)
          await new Promise(resolve => setTimeout(resolve, delay)) // Wait before retrying
        }

        console.log('Service not found after retries')
        return null // Return null if the service wasn't found after retries
      }

      // Call the waitForService function
      const service = await waitForService(ghostTemplate.projectId, data?.name)

      if (service) {
        data.serviceId = service.id
        data.environmentId = ENVIRONMENT_ID
        console.log('service id', data.serviceId, data.environmentId)
      } else {
        throw new Error('Service not found after multiple attempts')
      }

      // const waitServiceDomain = async (
      //   retries = 10,
      //   delay = 2000,
      // ): Promise<any | null> => {
      //   for (let i = 0; i < retries; i++) {
      //     const serviceDomains = await getServiceDomains({
      //       environmentId: data.environmentId,
      //       serviceId: data.serviceId,
      //       projectId: data.projectId,
      //     })
      //     if (serviceDomains?.length > 0) {
      //       console.log('serviceDomains', serviceDomains)
      //       return serviceDomains // Return the service if found
      //     }

      //     console.log(`Retry ${i + 1}: Service domains not found, waiting...`)
      //     await new Promise(resolve => setTimeout(resolve, delay)) // Wait before retrying
      //   }

      //   console.log('Service domains not found after retries')
      //   return null // Return null if the service wasn't found after retries
      // }
      // const serviceDomains = await waitServiceDomain()

      // console.log('service outer', serviceDomains)
    } catch (error: any) {
      console.log('Error while creating project', error)
      throw error
    }
  }
}
