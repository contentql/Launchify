import { CollectionBeforeChangeHook } from 'payload'

import {
  createCustomDomain,
  deleteCustomDomain,
  getDomains,
  redeployService,
} from '@/railway'

export const updateCustomDomain: CollectionBeforeChangeHook = async ({
  collection,
  context,
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (operation === 'update') {
    const { projectId, serviceId, environmentId } = data
    const { customDomain: originalCustomDomain } = originalDoc
    const { customDomain: updatedCustomDomain } = data
    if (originalCustomDomain !== updatedCustomDomain) {
      try {
        if (!originalCustomDomain && updatedCustomDomain) {
          await createCustomDomain({
            domain: data?.customDomain,
            environmentId,
            projectId,
            serviceId,
          })
        }
        if (originalCustomDomain && !updatedCustomDomain) {
          const railwayDomain = await getDomains({
            projectId,
            serviceId,
            environmentId,
          })
          console.log('custom domains', railwayDomain)
          const deletedDomain = await deleteCustomDomain({
            domainId: railwayDomain?.customDomains?.at(0)?.id,
          })
        }
        await redeployService({
          serviceId,
          environmentId,
        })
      } catch (error) {
        console.log('Error while getting domains', error)
        throw error
      }
    }
  }
}
