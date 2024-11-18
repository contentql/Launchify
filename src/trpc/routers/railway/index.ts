import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { z } from 'zod'

import { GET_DOMAINS } from '@/railway/queries/domain/getDomains'
import { router, userProcedure } from '@/trpc'
import { railwayAPI } from '@/utils/railwayAPI'

const payload = await getPayloadHMR({ config: configPromise })

export const railwayRouter = router({
  getDomainsAndValidDomain: userProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input
      try {
        const dbProject = await payload.findByID({
          collection: 'services',
          id,
        })

        const queryVariables = {
          projectId: dbProject.projectId,
          serviceId: dbProject.serviceId,
          environmentId: dbProject.environmentId,
        }

        const domainsResponse = await railwayAPI({
          query: GET_DOMAINS,
          variables: queryVariables,
        })

        const domains = domainsResponse?.data.domains

        const validCustomDomain = domains?.customDomains?.find(
          (customDomain: any) =>
            customDomain?.status?.dnsRecords?.every(
              (dnsRecord: any) =>
                dnsRecord.status === 'DNS_RECORD_STATUS_PROPAGATED',
            ),
        )

        const mainDomain =
          validCustomDomain?.domain || domains?.serviceDomains?.at(0)?.domain

        return { domains, validDomain: mainDomain }
      } catch (error: any) {
        throw new Error('Error during getting valid domain: ', error)
      }
    }),
})
