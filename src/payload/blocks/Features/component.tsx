'use client'

import { Params } from '../types'
import { FeaturesType } from '@payload-types'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import Container from '@/components/common/Container'
import { cn } from '@/utils/cn'

interface FeaturesProps extends FeaturesType {
  params: Params
}
const Features: React.FC<FeaturesProps> = ({ params, ...block }) => {
  return (
    <Container>
      <HoverEffect items={block?.features as FeaturesType['features']} />
    </Container>
  )
}

export default Features

export const HoverEffect = ({
  items,
  className,
}: {
  items: FeaturesType['features']
  className?: string
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        'grid grid-cols-1 py-10 md:grid-cols-2  lg:grid-cols-3',
        className,
      )}>
      {items?.map((item, idx) => (
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
            <CardTitle>{item.title}</CardTitle>
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
  icon?: any
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
