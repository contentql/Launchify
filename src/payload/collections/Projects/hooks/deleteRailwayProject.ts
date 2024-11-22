import { CollectionBeforeChangeHook } from 'payload'

import { deleteProject } from '@/railway'

export const deleteRailwayProject: CollectionBeforeChangeHook = async ({
  req,
  operation,
  collection,
  originalDoc,
  data,
  context,
}) => {
  const { payload } = req
  if (
    operation === 'update' &&
    !originalDoc?.deleted &&
    data?.deleted &&
    originalDoc?.projectId
  ) {
    try {
      await deleteProject({ projectId: originalDoc?.projectId })
      await payload.update({
        collection: 'services',
        data: {
          deleted: true,
        },
        where: {
          projectId: {
            equals: originalDoc?.projectId,
          },
        },
      })
    } catch (error) {
      payload.logger.error(`Unable to delete ${originalDoc?.name} project.`)
      throw error
    }
  }
}
