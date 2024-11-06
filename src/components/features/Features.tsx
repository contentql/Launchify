'use client'

import Container from '../common/Container'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  CalendarCheck2,
  GlobeLock,
  MonitorSmartphone,
  NotepadText,
  Palette,
  Users,
} from 'lucide-react'
import { useState } from 'react'

import { cn } from '@/utils/cn'

const Features = () => {
  const features = [
    {
      icon: <Activity />,
      title: 'Rich content',
      description:
        'When creating or editing content you have the option to easily embed content from other sites. Create a deeper relationship with your audience by publishing YouTube videos, music from Spotify, podcasts, tweets or other rich content.',
    },
    {
      icon: <CalendarCheck2 />,
      title: 'Schedule content publishing',
      description:
        'Create content in advance and schedule it for publishing on your blog. You can schedule publication of a series of posts over the course of multiple weeks for example, to provide your readers content regularly every week.',
    },
    {
      icon: <GlobeLock />,
      title: 'Custom domain',
      description:
        'Make your blog truly yours. Use your own domain for a blog with just a few clicks in our web dashboard. We will automatically enable secure SSL connections for your domain and make your site available at the new address.',
    },
    {
      icon: <MonitorSmartphone />,
      title: 'Mobile friendly',
      description:
        'Your blog is optimized both for desktop and mobile audiences. Ghost blog works on any device and makes sure that your readers have a pleasant experience from visiting your blog.',
    },
    {
      icon: <NotepadText />,
      title: 'Static pages',
      description:
        "Ghost blog is not just for blogs. Publish static web pages with content you want your readers to have access to. Static pages such as About You page or Contact Information can be added to the navigation of the site to that they're readily available to your readers.",
    },
    {
      icon: <Palette />,
      title: 'Themes',
      description:
        'Select from a wide range of themes available for your Ghost blog. Hundreds of beautiful themes have been created by authors from around the world which can be used on your blog.',
    },
    {
      icon: <Users />,
      title: 'Team accounts',
      description:
        'Invite your team to create and publish content on your Ghost blog. Each team member can be have a role assigned such as author, editor or administrator to manage level of access to your blog.',
    },
  ]
  return (
    <Container>
      <HoverEffect items={features as any} />
    </Container>
  )
}

export default Features

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    icon: Element
  }[]
  className?: string
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        'grid grid-cols-1 py-10 md:grid-cols-2  lg:grid-cols-3',
        className,
      )}>
      {items.map((item, idx) => (
        <div
          key={item?.title}
          className='group relative  block h-full w-full p-2'
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className='absolute inset-0 block h-full w-full rounded-3xl bg-base-300'
                layoutId='hoverBackground'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle icon={item?.icon}>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  )
}

export const Card = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'relative z-20 h-full w-full overflow-hidden rounded-2xl border border-transparent bg-base-200 p-2 group-hover:border-slate-700 dark:border-white/[0.2]',
        className,
      )}>
      <div className='relative z-50'>
        <div className='p-4'>{children}</div>
      </div>
    </div>
  )
}
export const CardTitle = ({
  className,
  children,
  icon,
}: {
  className?: string
  children: React.ReactNode
  icon: any
}) => {
  return (
    <h4
      className={cn(
        'inline-flex gap-x-4 font-bold tracking-wide text-base-content',
        className,
      )}>
      {icon}
      {children}
    </h4>
  )
}
export const CardDescription = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <p
      className={cn(
        'mt-4 text-sm leading-relaxed tracking-wide text-base-content/80',
        className,
      )}>
      {children}
    </p>
  )
}
