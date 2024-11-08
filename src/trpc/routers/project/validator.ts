import { z } from 'zod'

export const ProjectCreationSchema = z.object({
  name: z.string(),
  description: z.string(),
})

export const getProjectsSchema = z.object({
  cursor: z.number().optional(),
  limit: z.number().default(9), // Limit for pagination
})
export const getLatestSchema = z.object({
  id: z.string(),
})
