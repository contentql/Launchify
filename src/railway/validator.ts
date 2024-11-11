import { z } from 'zod'

export const CreateEmptyProjectSchema = z.object({
  projectName: z.string(),
  projectDescription: z.string(),
})
export type CreateEmptyProjectType = z.infer<typeof CreateEmptyProjectSchema>

export const TemplateDeploySchema = z.object({
  name: z.string(),
  projectId: z.string(),
  environmentId: z.string(),
})
export type TemplateDeployType = z.infer<typeof TemplateDeploySchema>

export const CreateServiceDomainSchema = z.object({
  environmentId: z.string(),
  serviceId: z.string(),
})
export type CreateServiceDomainType = z.infer<typeof CreateServiceDomainSchema>

export const getServiceDomainsSchema = z.object({
  environmentId: z.string(),
  serviceId: z.string(),
  projectId: z.string(),
})
export type getServiceDomainsSchemaType = z.infer<
  typeof getServiceDomainsSchema
>

export const CreateWebhookSchema = z.object({
  projectId: z.string(),
  url: z.string().url(),
})
export type CreateWebhookType = z.infer<typeof CreateWebhookSchema>

export const getVariablesSchema = z.object({
  environmentId: z.string(),
  projectId: z.string(),
  serviceId: z.string(),
})
export type getVariablesSchemaType = z.infer<typeof getServiceDomainsSchema>
