'use client'

import { User } from '@payload-types'
import { AnimatePresence, motion } from 'framer-motion'
import { SquareArrowOutUpLeft, UserRoundCog } from 'lucide-react'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import React, { createContext, useContext, useState } from 'react'
import { IoReorderThree } from 'react-icons/io5'
import { RxCross2 } from 'react-icons/rx'

import { cn } from '@/utils/cn'

interface Links {
  label: string
  href: string
  icon: React.JSX.Element | React.ReactNode
}

interface SidebarContextProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  animate: boolean
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
}) => {
  const [openState, setOpenState] = useState(false)

  const open = openProp !== undefined ? openProp : openState
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  animate?: boolean
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  )
}

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<'div'>)} />
    </>
  )
}

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar()
  return (
    <>
      <motion.div
        className={cn(
          'hidden h-full w-[300px]  flex-shrink-0 border bg-base-200 py-4 pl-2 text-base-content  backdrop-blur-lg [border-image:linear-gradient(to_right,theme(colors.slate.700/.3),theme(colors.slate.700),theme(colors.slate.700/.3))1] md:flex md:flex-col',
          className,
        )}
        animate={{
          width: animate ? (open ? '300px' : '80px') : '300px',
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}>
        {children}
      </motion.div>
    </>
  )
}

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) => {
  const { open, setOpen } = useSidebar()
  return (
    <>
      <div
        className={cn(
          'fixed left-0 flex  w-full flex-row  items-center justify-between   bg-base-200  px-2 py-4 md:hidden',
        )}
        {...props}>
        <div className='z-20 flex w-full justify-end '>
          <IoReorderThree
            size={28}
            className='font-bold text-base-content'
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className={cn(
                'fixed inset-0 z-50 flex h-full w-full flex-col justify-between bg-base-200 p-10 text-base-content',
                className,
              )}>
              <div
                className='absolute right-8 top-8 z-50'
                onClick={() => setOpen(!open)}>
                <RxCross2 size={28} className='font-bold ' />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links
  className?: string
  props?: LinkProps
}) => {
  const pathName = usePathname()
  const { href } = link
  const { open, animate } = useSidebar()
  return (
    <Link
      href={link.href}
      className={cn(
        'group/sidebar flex items-center justify-start gap-2 rounded-md  hover:bg-base-100',
        className,
        pathName === href ? 'bg-base-100 text-base-content' : null,
        open ? 'px-4 py-3' : 'px-4 py-3',
      )}
      {...props}>
      {link.icon}

      <motion.span
        animate={{
          display: animate ? (open ? 'inline-block' : 'none') : 'inline-block',
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className='!m-0 inline-block whitespace-pre !p-0 text-sm text-neutral-700 transition duration-150 group-hover/sidebar:translate-x-1 dark:text-neutral-200'>
        {link.label}
      </motion.span>
    </Link>
  )
}

export function SidebarView({ user }: { user: User }) {
  const links = [
    {
      label: 'Personal Information',
      href: '/profile',
      icon: (
        <UserRoundCog className='h-5 w-5 flex-shrink-0 text-base-content/80' />
      ),
    },
  ]
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn(
        'sticky  top-0 overflow-hidden rounded-md',
        'z-50 max-h-screen', // for your use case, use `h-screen` instead of `h-[60vh]`
      )}>
      <Sidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className='justify-between gap-10'>
          <div className='flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
            <div className='mt-8 flex flex-col gap-2'>
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: 'Back to dashboard',
                href: '/dashboard',
                icon: (
                  <SquareArrowOutUpLeft className='h-5 w-5 flex-shrink-0 text-base-content/80' />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  )
}
