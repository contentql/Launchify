'use client'

import { trpc } from '@/trpc/client'

import Button from './common/Button'

const Welcome = () => {
  const { mutate: runSeedMutation, isPending: isSeedLoading } =
    trpc.seed.runSeed.useMutation({
      onSuccess: () => {
        window.location.reload()
      },
    })

  const handleSeedData = () => {
    runSeedMutation()
  }
  return (
    <div className='flex w-full items-center justify-center'>
      <div className='empty-project-card relative flex max-w-lg flex-col gap-y-4 rounded-md  bg-base-200 p-4 text-center'>
        <h2 className='font-semibold text-base-content sm:text-5xl md:text-3xl'>
          Welcome to Launchify: Deploy with Ease.
        </h2>
        <p className='text-sm text-base-content/80'>
          Effortlessly deploy platforms like Ghost, WordPress, Strapi, and more
          with streamlined simplicity and powerful tools.
        </p>
        <Button onClick={() => handleSeedData()} disabled={isSeedLoading}>
          {isSeedLoading ? 'Loading demo data...' : 'Load demo data'}
        </Button>
      </div>
    </div>
  )
}

export default Welcome
