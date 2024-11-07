import { z } from 'zod'

export const ProjectCreationSchema = z.object({
  name: z.string(),
  description: z.string(),
})
