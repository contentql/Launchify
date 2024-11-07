import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import { router, userProcedure } from '@/trpc'

import { ProjectCreationSchema } from './validator'

const payload = await getPayloadHMR({ config: configPromise })

export const projectRouter = router({
  createProject: userProcedure
    ?.input(ProjectCreationSchema)
    ?.mutation(async ({ input }) => {
      const { description, name } = input
      try {
        const project = await payload.create({
          collection: 'projects',
          data: {
            name: name,
            projectDescription: description,
          },
        })
      } catch (error) {}
    }),
})
