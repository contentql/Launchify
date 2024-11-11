import { env } from '@env'
import { CollectionBeforeChangeHook } from 'payload'

import {
  createEmptyProject,
  createWebhook,
  getProjectDetails,
  templateDeploy,
} from '@/railway'

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

      const emptyProject = await createEmptyProject({
        projectName: data?.name,
        projectDescription: data?.projectDescription,
      })

      data.projectId = emptyProject.id
      data.environmentId = emptyProject.environments.edges.at(0).node.id

      await createWebhook({
        projectId: data.projectId,
        url: `${env.PAYLOAD_URL}/api/webhook/railway`,
      })

      const ghostTemplate = await templateDeploy({
        name: data?.name,
        projectId: data.projectId,
        environmentId: data.environmentId,
      })

      console.log('ghost Template', ghostTemplate)

      const projectDetails = await getProjectDetails({
        projectId: data.projectId,
      })

      console.log('project details', projectDetails)
      // Function to poll for services with a delay
      // const waitForService = async (
      //   projectId: string,
      //   serviceName: string,
      //   retries = 5,
      //   delay = 2000,
      // ): Promise<any | null> => {
      //   for (let i = 0; i < retries; i++) {
      //     const projectDetails = await getProjectDetails({ projectId })
      //     const service = projectDetails?.services?.edges?.filter(
      //       (service: any) =>
      //         service?.node?.name?.trim().toLowerCase() ===
      //           serviceName?.trim().toLowerCase() ||
      //         service?.node?.name?.trim().toLowerCase() ===
      //           `${serviceName}-MySQL`?.trim().toLowerCase(),
      //     )
      //     if (service) {
      //       return service
      //     }

      //     console.log(`Retry ${i + 1}: Service not found, waiting...`)
      //     await new Promise(resolve => setTimeout(resolve, delay)) // Wait before retrying
      //   }

      //   console.log('Service not found after retries')
      //   return null // Return null if the service wasn't found after retries
      // }

      // // Call the waitForService function
      // const service = await waitForService(ghostTemplate.projectId, data?.name)
      // if (service) {
      //   data.serviceId = service.id
      //   data.environmentId = ENVIRONMENT_ID
      //   console.log('service id', data.serviceId, data.environmentId)
      // } else {
      //   throw new Error('Service not found after multiple attempts')
      // }
    } catch (error: any) {
      console.log('Error while creating project', error)
      throw error
    }
  }
}
