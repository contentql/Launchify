import { z } from 'zod'

export const InsuranceFilterSchema = z.object({
  citizenship: z.string(),
  destination: z.number(),
  traveldates: z.string(),
  age: z.number(),
})
