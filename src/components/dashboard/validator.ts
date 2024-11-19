import { z } from 'zod'

export const ProjectSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Project name must be at least 3 characters long' })
    .max(30, { message: 'Project name cannot exceed 30 characters' }),
  template: z.enum(['GHOST', 'STRAPI', 'WORDPRESS']),
  description: z
    .string()
    .min(6, { message: 'Project Description must be at least 6 characters' }),
})

export type ProjectSchemaType = z.infer<typeof ProjectSchema>

// export const EditProjectScheme = z.object({
//   id: z.string()?.optional(),
//   name: z.string(),
// })
// export type EditProjectSchemaType = z.infer<typeof EditProjectScheme>

// export const DeleteProjectSchema = z.object({
//   id: z.string(),
//   name: z.string(),
// })
// export type DeleteProjectSchemaType = z.infer<typeof DeleteProjectSchema>

export const updateProjectSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  deleted: z.boolean()?.optional(),
})
export type updateProjectSchemaType = z.infer<typeof updateProjectSchema>
