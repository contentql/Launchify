import { z } from 'zod'

export const CheckDomainAvailabilitySchema = z.object({
  domain: z.string(),
})
export type CheckDomainAvailabilityType = z.infer<
  typeof CheckDomainAvailabilitySchema
>
