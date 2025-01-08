import { publicProcedure, router } from '@/trpc'

import { InsuranceFilterSchema } from './validator'

export const publicRouter = router({
  getInsuranceDetails: publicProcedure
    .input(InsuranceFilterSchema)
    .mutation(async ({ input }) => {
      try {
        const { age, citizenship, traveldates, destination } = input
        const response = await fetch(
          'https://360healthbenefits.com/api/getplans',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              citizenship,
              destination,
              age,
              traveldates,
            }),
          },
        )

        if (!response.ok) {
          throw new Error('Failed to fetch insurance details')
        }

        const data = await response.json()

        return { status: data.result.success, list: data.result.data }
      } catch (error) {
        console.error('Error during getting insurance details:', error)
        throw new Error('Error during getting insurance details ')
      }
    }),
})
