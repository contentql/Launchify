import { router } from '@/trpc'
import { authRouter } from '@/trpc/routers/auth'
import { projectRouter } from '@/trpc/routers/project'
import { userRouter } from '@/trpc/routers/user'

import { cloudflareRouter } from './cloudflare'
import { pageRouter } from './page'
import { railwayRouter } from './railway'
import { seedRouter } from './seed'
import { serviceRouter } from './service'
import { siteSettingsRouter } from './site-settings'

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  project: projectRouter,
  service: serviceRouter,
  railway: railwayRouter,
  cloudflare: cloudflareRouter,
  page: pageRouter,
  siteSettings: siteSettingsRouter,
  seed: seedRouter,
})

export type AppRouter = typeof appRouter
