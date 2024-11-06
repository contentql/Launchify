'use client'

import type { User } from '@payload-types'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { trpc } from '@/trpc/client'

import DeleteAccountSection from './DeleteAccountSection'
import Profile from './Profile'

const ProfileFormSchema = z.object({
  name: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  confirmPassword: z.string().optional().nullable(),
})
type ProfileFormDataType = z.infer<typeof ProfileFormSchema>

const ProfileForm = ({ user }: { user: User }) => {
  const [formData, setFormData] = useState<ProfileFormDataType>({
    name: user?.displayName,
    password: '',
    confirmPassword: '',
  })
  const trpcUtils = trpc.useUtils()

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { mutate: updateUserMutation, isPending: isUpdateUserPending } =
    trpc.user.updateUser.useMutation({
      onSuccess: () => {
        toast.success('Profile updated successfully')
        trpcUtils.user.getUser.invalidate()
      },
      onError() {
        return null
      },
    })

  const handleUserUpdateForm = (e: any) => {
    e.preventDefault()
    const sanitizedData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => Boolean(value)),
    )

    if (
      sanitizedData.password &&
      sanitizedData.password !== sanitizedData.confirmPassword
    ) {
      toast.error('Passwords do not match!')
      return
    }

    updateUserMutation({
      ...sanitizedData,
    })
  }

  return (
    <div className='p-2 md:p-4'>
      <div className='mt-8 w-full px-6 pb-8 sm:rounded-lg'>
        <h2 className='pl-6 text-2xl font-bold text-base-content sm:text-xl'>
          Personal Information
        </h2>

        <div className='mx-auto mt-8 grid'>
          <div className='flex flex-col items-center justify-center space-y-5 sm:flex-row sm:space-y-0'>
            <Profile initialUser={user} />
          </div>

          <form
            onSubmit={handleUserUpdateForm}
            className='mt-8 items-center sm:mt-14'>
            <div className='mb-4 flex w-full flex-col items-center space-x-0 space-y-2 sm:mb-6 sm:flex-row sm:space-x-4 sm:space-y-0'>
              <div className='w-full'>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-base-content/70'>
                  Display name
                </label>
                <Input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Your name '
                  value={formData?.name ?? ''}
                  onChange={handleOnChange}
                />
              </div>
              <div className='w-full'>
                <label
                  htmlFor='userId'
                  className='block text-sm font-medium text-base-content/70'>
                  UserId
                </label>
                <Input
                  type='text'
                  id='userId'
                  name='userId'
                  value={user?.id}
                  readOnly
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className='mb-4 flex w-full flex-col items-center space-x-0 space-y-2 sm:mb-6 sm:flex-row sm:space-x-4 sm:space-y-0'>
              <div className='w-full'>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium text-base-content/70'>
                  Username
                </label>
                <Input
                  type='text'
                  id='username'
                  name='username'
                  value={user?.username!}
                  readOnly
                />
              </div>
              <div className='w-full'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-base-content/70'>
                  E-Mail
                </label>
                <Input
                  type='text'
                  id='email'
                  name='email'
                  placeholder='john.doe@example.com'
                  value={user?.email}
                  readOnly
                />
              </div>
            </div>
            <div className='mb-4 flex w-full flex-col items-center space-x-0 space-y-2 sm:mb-6 sm:flex-row sm:space-x-4 sm:space-y-0'>
              <div className='w-full'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-base-content/70'>
                  New Password
                </label>
                <Input
                  type='password'
                  id='password'
                  name='password'
                  placeholder='● ● ● ● ● ● ● ● ●'
                  onChange={handleOnChange}
                />
              </div>
              <div className='w-full'>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium text-base-content/70'>
                  Confirm Password
                </label>
                <Input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  placeholder='● ● ● ● ● ● ● ● ●'
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div className='flex justify-end'>
              <Button type='submit'>
                {isUpdateUserPending ? 'Updating...' : 'Update Profile'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <DeleteAccountSection />
    </div>
  )
}

export default ProfileForm
