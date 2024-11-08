import { CollectionAfterChangeHook } from 'payload'

import { getServiceDomains } from '@/railway'

export const updateServiceDomain: CollectionAfterChangeHook = async ({
  collection,
  doc,
  operation,
  previousDoc,
}) => {
  if (operation === 'update') {
    if (
      previousDoc?.deploymentStatus != doc?.deploymentStatus &&
      (doc?.deploymentStatus === 'SUCCESS' || doc?.deploymentStatus === 'Error')
    ) {
      try {
        const serviceDomains = await getServiceDomains({
          environmentId: doc?.environmentId,
          projectId: doc?.projectId,
          serviceId: doc?.serviceId,
        })
        console.log('domains after create', serviceDomains)

        if (!Array.isArray(doc.serviceDomains)) {
          doc.serviceDomains = []
        }

        doc.serviceDomains.push({ domainUrl: serviceDomains.at(0).domain })
      } catch (error) {
        console.log('Error while getting domains', error)
      }
    }
  }
}
