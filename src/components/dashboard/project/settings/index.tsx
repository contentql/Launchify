import Button from '@/components/common/Button'

const Settings = () => {
  return (
    <div className='mt-20 w-full space-y-4'>
      <h2 className='text-2xl font-bold'>Blog Settings</h2>
      <div className='z-10 flex w-full items-start justify-between rounded-md bg-base-200 p-6'>
        <div className='space-y-2'>
          <h3 className='text-lg font-semibold'>Reset blog</h3>
          <p className='text-md text-base-content/80'>
            Resetting your blog removes all your data and resets blog to a fresh
            state as if it was just created.
          </p>
          <p>
            This action is irreversible. All data will be lost and cannot be
            restored.
          </p>
        </div>
        <Button variant={'outline'}> Rest blog</Button>
      </div>
      <div className='z-20 flex w-full items-start justify-between rounded-md bg-base-200 p-6'>
        <div className='space-y-2'>
          <h3 className='text-lg font-semibold'>Delete blog</h3>
          <p className='text-md text-base-content/80'>
            Deleting your blog deletes your data, the blog and cancels your
            subscription. The blog will no longer be available on its address.
          </p>
          <p>
            This action is irreversible. All data will be lost and cannot be
            restored.
          </p>
        </div>
        <Button variant={'destructive'}> Delete blog</Button>
      </div>
    </div>
  )
}

export default Settings
