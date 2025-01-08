import { z } from 'zod'

export const InsuranceFilterSchema = z.object({
  citizenship: z.string(),
  destination: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  age: z.number(),
})

export type InsuranceFilterType = z.infer<typeof InsuranceFilterSchema>
