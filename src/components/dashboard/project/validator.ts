import { z } from 'zod'

export const DomainIntegrationFormSchema = z.object({
  domain: z.string().min(1, { message: 'Domain is required' }),
})

export type DomainIntegrationFormDataType = z.infer<
  typeof DomainIntegrationFormSchema
>

export const addNewVariableScheme = z.object({
  key: z
    .string()
    .min(1, { message: 'Key is required' })
    .refine(value => !value.startsWith('RAILWAY'), {
      message: 'Key should not start with RAILWAY',
    })
    .refine(value => !/[\s-]/.test(value), {
      message: 'Key should not contain spaces or hyphens',
    }),
  value: z
    .string()
    .min(1, { message: 'Value is requited' })
    .refine(value => !/\s/.test(value), {
      message: 'Value should not contain spaces',
    }),
})

export type addVariableDataType = z.infer<typeof addNewVariableScheme>

export const EditServiceScheme = z.object({
  id: z.string()?.optional(),
  serviceName: z.string(),
})
export type EditServiceSchemaType = z.infer<typeof EditServiceScheme>
