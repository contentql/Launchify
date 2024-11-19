import { z } from 'zod'

export const ProjectCreationSchema = z.object({
  name: z.string(),
  description: z.string(),
  template: z.enum(['GHOST', 'STRAPI']),
})

export const getProjectsSchema = z.object({
  cursor: z.number().optional(),
  limit: z.number().default(9), // Limit for pagination
})
export const getLatestSchema = z.object({
  id: z.string(),
})

export const updateProjectSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  deleted: z.boolean().optional(),
})
