import { env } from '@env'
import { CollectionBeforeChangeHook } from 'payload'

import { createEmptyProject, createWebhook, templateDeploy } from '@/railway'

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
      const emptyProject = await createEmptyProject({
        projectName: data?.name,
        projectDescription: data?.projectDescription,
      })

      data.projectId = emptyProject.id
      data.environmentId = emptyProject.environments.edges.at(0).node.id

      console.log('project id', emptyProject.id)

      await createWebhook({
        projectId: data.projectId,
        url: `${env.PAYLOAD_URL}/api/webhook/railway`,
      })

      //deploy ghost Template
      const ghostTemplate = await templateDeploy({
        name: data?.name,
        template: data?.templates,
        projectId: data.projectId,
        environmentId: data.environmentId,
      })

      console.log('ghost Template', ghostTemplate)
    } catch (error: any) {
      console.log('Error while creating project', error)
      throw error
    }
  }
}
