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
export type getVariablesSchemaType = z.infer<typeof getVariablesSchema>
export const UpsertVariablesSchema = z.object({
  projectId: z.string(),
  serviceId: z.string(),
  environmentId: z.string(),
  variables: z.record(z.string()),
})
export type UpsertVariablesType = z.infer<typeof UpsertVariablesSchema>

export const DeleteVariable = z.object({
  projectId: z.string(),
  serviceId: z.string(),
  environmentId: z.string(),
  name: z.string(),
})
export type DeleteVariableType = z.infer<typeof DeleteVariable>

export const CreateCustomDomainSchema = z.object({
  projectId: z.string(),
  serviceId: z.string(),
  environmentId: z.string(),
  domain: z.string(),
})
export type CreateCustomDomainType = z.infer<typeof CreateCustomDomainSchema>
export const RedeployServiceSchema = z.object({
  serviceId: z.string(),
  environmentId: z.string(),
})
export type RedeployServiceType = z.infer<typeof RedeployServiceSchema>

export const DeleteCustomDomainSchema = z.object({
  domainId: z.string(),
})
export type DeleteCustomDomainType = z.infer<typeof DeleteCustomDomainSchema>
