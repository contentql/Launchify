import { router } from '@/trpc'
import { authRouter } from '@/trpc/routers/auth'
import { userRouter } from '@/trpc/routers/user'

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
