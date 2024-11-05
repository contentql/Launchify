'use client'

import { Media, User } from '@payload-types'
import Image from 'next/image'
import { useState } from 'react'
import { HiOutlinePencilAlt, HiUpload, HiX } from 'react-icons/hi'
import { toast } from 'sonner'

import { trpc } from '@/trpc/client'
import uploadMedia from '@/utils/uploadMedia'

const Profile = ({ initialUser }: { initialUser: User | undefined }) => {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [userImage, setUserImage] = useState(null)
  // this is state to track uploading image, updating user profile
  const [uploadingImage, setUploadingImage] = useState(false)
  const [open, setOpen] = useState(false)

  function capitalizeWords(words: string) {
    return words
      ?.split(' ')
      ?.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      ?.join(' ')
  }

  const {
    data: user,
    isLoading: isUserPending,
    refetch: reFetchUser,
  } = trpc.user.getUser.useQuery()

  const { mutate: uploadUserImage } = trpc.user.updateUserImage.useMutation({
    onSuccess: async data => {
      setOpen(false)
      reFetchUser()
      toast.success(`Image updated successfully`)
      setUserImage(null)
      setUploadedImage(null)
    },
    onError: () => {
      toast.error(`Failed to upload, please try again`)
    },
    onSettled: () => {
      setUploadingImage(false)
    },
  })

  const handleUpdateUserProfile = async () => {
    try {
      // setting true on uploading to media collection
      setUploadingImage(true)
      const doc = await uploadMedia(userImage)

      if (doc && doc.id) {
        uploadUserImage({ id: doc.id })
      } else {
        console.error(
          'Error: Unable to get document or document id is missing.',
        )
      }
    } catch (error) {
      setUploadingImage(false)
      console.error('Error uploading media:', error)
    }
  }

  const handleUpload = (event: any) => {
    setUserImage(event.target.files)
    const file = event.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        setUploadedImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const userImageURL = user?.imageUrl
    ? (user?.imageUrl as Media)?.url!
    : (user?.imageUrl! as string)
  const latestProfilePic = uploadedImage ? uploadedImage : userImageURL

  return (
    <>
      <div className='max-w-sm rounded p-5 text-center text-base-content/70'>
        <div className='group relative z-0 mx-auto h-[141px] w-[141px]'>
          <div
            style={{
              backgroundImage: `url(${(user?.imageUrl as Media)?.url})`,
            }}
            className='z-0 h-full w-full rounded-full bg-base-200 bg-cover bg-center bg-no-repeat'></div>
          <button
            onClick={() => setOpen(true)}
            className={`absolute bottom-2 right-2`}>
            <HiOutlinePencilAlt
              size={24}
              className='font-bold text-base-content'
            />
          </button>
        </div>
        {/* <div className='mt-5 text-sm'>
          <a
            href='#'
            className='text-xl font-medium leading-none text-base-content transition duration-500 ease-in-out hover:text-primary'>
            {capitalizeWords(user?.username!)}
          </a>
          {user?.role.some(role => role === 'author') && (
            <p className='mt-2 text-base-content'>Author</p>
          )}
        </div> */}
      </div>
      {open && (
        <div
          className='relative z-[100]'
          aria-labelledby='modal-title'
          role='dialog'
          aria-modal={false}>
          <div className='fixed inset-0 bg-base-100 bg-opacity-75 transition-opacity'></div>

          <div className='fixed inset-0 z-[100] w-screen overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <div className='rounded-rounded-box relative transform overflow-hidden bg-base-300 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='p-4 text-center'>
                  <div className='group relative mx-auto mb-4 h-40 w-40'>
                    <Image
                      src={latestProfilePic}
                      fill
                      className='h-full w-full rounded-full bg-base-200 object-cover'
                      alt='user profile'
                    />
                  </div>

                  {open ? (
                    <div className='flex items-center justify-center gap-x-5'>
                      <label
                        htmlFor='dropzone-file'
                        className=' border-cq-input flex h-16 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed'>
                        <div className='flex flex-col items-center justify-center pb-6 pt-5'>
                          <svg
                            className=' text-cq-text-secondary mb-1 mt-1 h-6 w-6'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 20 16'>
                            <path
                              stroke='currentColor'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              stroke-width='2'
                              d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                            />
                          </svg>
                          <p className='text-sm text-gray-500 dark:text-gray-400'>
                            <span className='text-cq-text-secondary font-semibold'>
                              Click to Upload
                            </span>
                          </p>
                        </div>
                        <input
                          id='dropzone-file'
                          type='file'
                          className='hidden'
                          onChange={handleUpload}
                        />
                      </label>
                    </div>
                  ) : null}

                  {uploadedImage && (
                    <button
                      className='mt-4 inline-flex w-full items-center justify-center gap-x-2 rounded-md bg-primary py-2.5'
                      onClick={handleUpdateUserProfile}
                      disabled={uploadingImage}>
                      <HiUpload size={20} />
                      {uploadingImage ? <p>Uploading...</p> : <p>Upload</p>}
                    </button>
                  )}
                </div>
                <div
                  className='absolute right-2 top-2 cursor-pointer'
                  onClick={() => {
                    setOpen(false)
                    setUserImage(null)
                    setUploadedImage(null)
                  }}>
                  <HiX size={24} />
                  <p className='sr-only'>Close</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile
