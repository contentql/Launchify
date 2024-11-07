import { CollectionAfterChangeHook } from 'payload'

import { getServiceDomains } from '@/railway'

export const updateServiceDomain: CollectionAfterChangeHook = async ({
  collection,
  doc,
  operation,
}) => {
  if (operation === 'update') {
    try {
      const serviceDomains = await getServiceDomains({
        environmentId: doc?.environmentId,
        projectId: doc?.projectId,
        serviceId: doc?.serviceId,
      })

      console.log('domains after create', serviceDomains)
    } catch (error) {
      console.log('Error while getting domains', error)
    }
  }
}
