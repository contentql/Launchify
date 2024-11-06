'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import Button from '@/components/common/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/common/Dialog'
import Input from '@/components/common/Input'
import { trpc } from '@/trpc/client'

export default function DeleteAccountSection() {
  const [open, setOpen] = useState(false)

  const [isAllowedToDelete, setIsAllowedToDelete] = useState(false)
  const [confirmation, setConfirmation] = useState('')
  const router = useRouter()

  const {
    mutate: deleteUserMutation,
    isPending: isDeleteAccountPending,
    isError: isDeleteAccountError,
    error: DeleteAccountError,
    isSuccess: DeleteAccountSuccess,
  } = trpc.user.deleteUser.useMutation({
    onSuccess: () => {
      toast.success('Account deleted successfully')
      router.push('/sign-up')
    },
    onError: () => {
      toast.error('Unable to delete the account, try again!')
    },
  })

  const handleDeleteUser = async (e: any) => {
    e.preventDefault()

    deleteUserMutation()
  }

  useEffect(() => {
    if (isDeleteAccountPending === false && open === true) {
      setOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteAccountPending])

  return (
    <div className='mt-16 flex flex-col rounded-md bg-error/10 p-8 text-base-content shadow-md'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-16 w-16 rounded-2xl  bg-error p-3'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
          </svg>
          <div className='ml-3 flex flex-col'>
            <div className='font-medium leading-none'>
              Delete Your Account ?
            </div>
            <p className='mt-1 text-sm leading-none text-base-content/70'>
              By deleting your account you will lose your all data
            </p>
          </div>
        </div>
        <Button variant={'destructive'} onClick={() => setOpen(true)}>
          Delete
        </Button>
      </div>

      {/* Delete Account Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete your account</DialogTitle>
            <DialogDescription>
              Permanently remove your Personal Account and all of its contents
              from the platform. This action is not reversible, so please
              continue with caution.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleDeleteUser}>
            <div>
              <label
                htmlFor='confirmDelete'
                className='block p-2 text-sm font-medium'>
                Type{' '}
                <span className='rounded-md bg-base-200 p-0.5  italic '>
                  delete
                </span>{' '}
                to confirm.
              </label>
              <Input
                type='text'
                id='confirmDelete'
                name='confirmDelete'
                placeholder='We are sad to see you go!'
                value={confirmation}
                onChange={e => {
                  setConfirmation(e.target.value)
                  if (e.target.value === 'delete') {
                    setIsAllowedToDelete(true)
                  } else {
                    setIsAllowedToDelete(false)
                  }
                }}
              />
            </div>
            <div className='mt-4 flex items-center justify-end'>
              <Button
                type='submit'
                variant={'destructive'}
                disabled={!isAllowedToDelete}
                className=''>
                {isDeleteAccountPending ? 'Deleting...' : 'Delete Account'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
