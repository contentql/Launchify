'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { pageLinks } from '@/data/pageLinks'

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

  const trigger = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLDivElement>(null)

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return
      setMobileNavOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return
      setMobileNavOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <div className='ml-4 flex items-center lg:hidden'>
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger ${mobileNavOpen && 'active'}`}
        aria-controls='mobile-nav'
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}>
        <span className='sr-only'>Menu</span>
        <svg
          className='h-5 w-5 fill-current text-base-content transition duration-150 ease-in-out '
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'>
          <rect y='2' width='20' height='2' rx='1' />
          <rect y='9' width='20' height='2' rx='1' />
          <rect y='16' width='20' height='2' rx='1' />
        </svg>
      </button>

      {/*Mobile navigation */}
      <nav
        id='mobile-nav'
        ref={mobileNav}
        className='absolute left-0 top-full z-20  w-full overflow-hidden px-2 transition-all duration-300 ease-in-out'
        style={
          mobileNavOpen
            ? { maxHeight: mobileNav.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0.8 }
        }>
        <ul className='rounded-md border bg-base-200 px-4 py-1.5 shadow-lg [border-image:linear-gradient(to_right,theme(colors.slate.700/.3),theme(colors.slate.700),theme(colors.slate.700/.3))1]  '>
          {pageLinks.header.map(({ label, href }) => (
            <li key={label}>
              <Link
                className='flex py-1.5 text-sm font-medium text-base-content/80 hover:text-base-content'
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                href={href}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
