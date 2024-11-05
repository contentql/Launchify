'use client'

import { User } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/Dropdown'
import { signOut } from '@/utils/signOut'

const ProfileDropdown = ({ user }: { user?: User }) => {
  //   const { data: userData } = trpc.user.getUser.useQuery(undefined, {
  //     initialData: user,
  //   })

  const userImageURL =
    user?.imageUrl && typeof user?.imageUrl !== 'string'
      ? user.imageUrl.url!
      : user?.avatar!

  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const response = await signOut()
      if (response?.message === 'Logout successful.') {
        router.push('/')

        if (typeof window !== 'undefined') {
          window.location.reload()
        }
      }
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={userImageURL}
          height={34}
          width={34}
          className='bg-cq-input h-9 w-9 cursor-pointer rounded-full object-cover'
          alt='user profile'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href='/profile' className='block h-full w-full'>
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem>
          <span
            className='h-full w-full cursor-pointer focus:bg-error'
            onClick={handleSignOut}>
            Log out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown
