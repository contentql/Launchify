import { z } from 'zod'

export const DomainIntegrationFormSchema = z.object({
  domain: z.string().min(1, { message: 'Domain is required' }),
})

export type DomainIntegrationFormDataType = z.infer<
  typeof DomainIntegrationFormSchema
>
