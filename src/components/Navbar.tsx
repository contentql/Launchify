'use client'

import { User } from '@payload-types'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { pageLinks } from '@/data/pageLinks'

import MobileMenu from './MobileMenu'
import ProfileDropdown from './ProfileDropdown'
import Button from './common/Button'
import Logo from './common/Logo'

const Navbar = ({ user }: { user: User }) => {
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  const pathName = usePathname()
  let paths = pathName.split('/')
  let isExists = paths.includes('dashboard')

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
          className='inline-flex h-10 w-28 gap-x-2'>
          <Logo />
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
                {pageLinks.header.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      className='mx-4 text-sm font-medium text-base-content/80 transition duration-150 ease-in-out hover:text-base-content lg:mx-5'
                      href={href}>
                      {label}
                    </Link>
                  </li>
                ))}
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
              <MobileMenu />
            </div>
          </div>
        )}
      </div>
    </motion.header>
  )
}

export default Navbar
