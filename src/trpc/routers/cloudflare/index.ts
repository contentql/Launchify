import { TRPCError } from '@trpc/server'

import { isDomainAvailable } from '@/lib/isDomainAvailable'
import { router, userProcedure } from '@/trpc'

import { CheckDomainAvailabilitySchema } from './validator'

export const cloudflareRouter = router({
  checkDomainAvailability: userProcedure
    .input(CheckDomainAvailabilitySchema)
    .query(async ({ input }) => {
      const { domain } = input

      try {
        const response = await isDomainAvailable(domain)

        return response
      } catch (error: any) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Failed to check domain availability for ${domain}.`,
          cause: error,
        })
      }
    }),
})
