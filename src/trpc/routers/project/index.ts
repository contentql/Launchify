import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { TRPCError } from '@trpc/server'

import { router, userProcedure } from '@/trpc'

import { ProjectCreationSchema, getProjectsSchema } from './validator'

const payload = await getPayloadHMR({ config: configPromise })

export const projectRouter = router({
  getProjects: userProcedure
    .input(getProjectsSchema)
    .query(async ({ ctx, input }) => {
      const { user } = ctx
      const { cursor = 1, limit = 12 } = input

      try {
        const { docs, hasNextPage } = await payload.find({
          collection: 'projects',
          user,
          limit,
          page: cursor,
          sort: '-createdAt',
          where: {
            and: [
              {
                deleted: {
                  equals: false,
                },
              },
              {
                ...(!user.role?.includes('admin') && {
                  'user.value': {
                    equals: user.id,
                  },
                }),
              },
            ],
          },
          depth: 0,
        })

        return {
          projects: docs,
          meta: {
            hasNextPage,
            nextCursor: hasNextPage ? cursor + 1 : undefined,
          }, // Include nextCursor in response
        }
      } catch (error) {
        console.error('Error during getting projects:', error)
        throw new Error('Error during getting projects')
      }
    }),
  createProject: userProcedure
    ?.input(ProjectCreationSchema)
    ?.mutation(async ({ input }) => {
      const { description, name } = input
      try {
        const { totalDocs: totalProjects } = await payload.find({
          collection: 'projects',
          where: {
            and: [
              {
                name: {
                  equals: name,
                },
              },
              {
                deleted: { equals: false },
              },
            ],
          },
        })

        if (totalProjects > 0) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Project name already exists',
          })
        }
        await payload.create({
          collection: 'projects',
          data: {
            name: name,
            projectDescription: description,
          },
        })
      } catch (error: any) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Internal server error occurred.',
        })
      }
    }),
})
