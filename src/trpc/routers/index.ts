import { router } from '@/trpc'
import { authRouter } from '@/trpc/routers/auth'
import { projectRouter } from '@/trpc/routers/project'
import { userRouter } from '@/trpc/routers/user'

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  project: projectRouter,
})

export type AppRouter = typeof appRouter
