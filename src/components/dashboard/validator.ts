import { z } from 'zod'

export const ProjectSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Project name must be at least 3 characters long' })
    .max(30, { message: 'Project name cannot exceed 30 characters' }),
  description: z
    .string()
    .min(6, { message: 'Project Description must be at least 6 characters' }),
})

export type ProjectSchemaType = z.infer<typeof ProjectSchema>
