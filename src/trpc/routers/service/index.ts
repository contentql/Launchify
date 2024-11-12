import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { router, userProcedure } from '@/trpc'

const payload = await getPayloadHMR({ config: configPromise })

export const serviceRouter = router({
  getServicesByProjectId: userProcedure
    ?.input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input
      try {
        const { docs, totalDocs } = await payload.find({
          collection: 'services',
          where: {
            project: {
              equals: id,
            },
          },
        })
        return { services: docs, totalServices: totalDocs }
      } catch (error) {
        console.log('Error while fetching services', error)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Error while fetching services',
        })
      }
    }),

  getServiceById: userProcedure
    .input(z.object({ id: z.string() }))
    ?.query(async ({ input }) => {
      const { id } = input
      try {
        const service = await payload.findByID({
          collection: 'services',
          id: id,
        })
        return service
      } catch (error) {
        console.log('Error while fetching service', error)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Error while fetching service',
        })
      }
    }),
})
