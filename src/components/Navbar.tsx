'use client'

import { SiteSetting, User } from '@payload-types'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { cn } from '@/utils/cn'
import { generateMenuLinks } from '@/utils/generateMenuLinks'

import MobileMenu from './MobileMenu'
import ProfileDropdown from './ProfileDropdown'
import Button from './common/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './common/Dropdown'

const Navbar = ({ user, metadata }: { user: User; metadata: SiteSetting }) => {
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  const pathName = usePathname()
  let paths = pathName.split('/')
  let isExists = paths.includes('dashboard')

  const { navbar, footer } = metadata
  const { logo, menuLinks } = navbar

  let logoDetails = {
    url: '',
    alt: '',
    height: 0,
    width: 0,
  }

  const navLinks = menuLinks?.length ? generateMenuLinks(menuLinks) : []

  if (Object.keys(logo).length && logo?.imageUrl === 'string') {
    logoDetails = {
      url: logo?.imageUrl,
      alt: `${metadata.general?.title} logo`,
      height: logo?.height!,
      width: logo?.width!,
    }
  } else if (Object.keys(logo).length && typeof logo?.imageUrl !== 'string') {
    logoDetails = {
      url: logo.imageUrl?.url!,
      alt: logo.imageUrl?.alt || `${metadata.general?.title} logo`,
      height: logo?.height!,
      width: logo?.width!,
    }
  }

  // if in case image or nav-links are not specified hiding the navbar
  if (!logoDetails.url && navLinks?.length === 0) {
    return null
  }

  useMotionValueEvent(scrollY, 'change', latest => {
    const prev = scrollY?.getPrevious()
    if (prev && latest > prev && latest >= 150) setHidden(true)
    else setHidden(false)
  })
  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className=' fixed left-0 top-0 z-50 h-16 w-full border-b bg-base-200 py-3  backdrop-blur-lg [border-image:linear-gradient(to_right,theme(colors.slate.700/.3),theme(colors.slate.700),theme(colors.slate.700/.3))1]'>
      <div className='mx-auto flex max-w-7xl items-center justify-between  px-4 md:px-12 lg:px-20 '>
        <Link
          href={user ? '/dashboard' : '/'}
          className={cn('inline-flex w-32 items-center gap-x-2')}>
          {/* <Logo /> */}
          <Image
            className='h-6'
            width={1000}
            height={1000}
            src={logoDetails?.url}
            alt=''
          />
        </Link>
        {user ? (
          <ul className='flex items-center justify-end'>
            {!isExists && (
              <li>
                <Link
                  className='mx-4 text-sm font-medium text-base-content/80 transition duration-150 ease-in-out hover:text-base-content lg:mx-5'
                  href={'/dashboard'}>
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <ProfileDropdown user={user} />
            </li>
          </ul>
        ) : (
          <div className='flex items-center justify-end'>
            <nav className='hidden lg:flex'>
              {/* Desktop menu links */}
              <ul className='flex items-center'>
                {navLinks.map((navLink, index) =>
                  navLink?.type === 'group' ? (
                    <li key={navLink?.label}>
                      <DropdownMenu>
                        <DropdownMenuTrigger className='mx-4 text-sm font-medium text-base-content/80 transition duration-150 ease-in-out hover:text-base-content lg:mx-5'>
                          {navLink?.label}
                          <DropdownMenuGroup>
                            <DropdownMenuContent>
                              {navLink?.children?.map((subLink, index) => (
                                <DropdownMenuItem>
                                  <Link
                                    className='mx-4 text-sm font-medium text-base-content/80 transition duration-150 ease-in-out hover:text-base-content lg:mx-5'
                                    href={subLink?.href || ''}
                                    target={
                                      subLink?.newTab ? '_blank' : '_self'
                                    }>
                                    {subLink?.label}
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenuGroup>
                        </DropdownMenuTrigger>
                      </DropdownMenu>
                    </li>
                  ) : (
                    <li key={navLink?.label}>
                      <Link
                        className='mx-4 text-sm font-medium text-base-content/80 transition duration-150 ease-in-out hover:text-base-content lg:mx-5'
                        href={navLink?.href || ''}
                        target={navLink?.newTab ? '_blank' : '_self'}>
                        {navLink?.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
            <div className='flex items-center'>
              <div className='flex items-center justify-end gap-x-4 lg:gap-x-8'>
                <Link
                  href='sign-in'
                  className='ml-2 text-sm font-medium text-base-content/80 transition duration-150 ease-in-out hover:text-base-content '>
                  SignIn
                </Link>
                <Button size={'sm'} variant={'default'}>
                  <Link href='sign-up'>SignUp</Link>
                </Button>
              </div>
              <MobileMenu navLinks={navLinks} />
            </div>
          </div>
        )}
      </div>
    </motion.header>
  )
}

export default Navbar
