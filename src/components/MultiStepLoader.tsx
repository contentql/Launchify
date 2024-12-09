'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, TriangleAlert } from 'lucide-react'
import { useEffect, useState } from 'react'

import { cn } from '@/utils/cn'

export type StatusType = {
  status: 'PENDING' | 'SUCCESS' | 'ERROR' | 'DEPLOYING'
}

const StatusIndicator = ({ status }: StatusType) => {
  const Element = {
    PENDING: (
      <span className='relative flex h-4 w-4'>
        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-warning/80 opacity-75'></span>
        <span className='relative inline-flex h-4 w-4 rounded-full bg-warning'></span>
      </span>
    ),

    SUCCESS: (
      <div className='relative flex h-5 w-5 bg-transparent'>
        <Check className='h-5 w-5 text-success' />
      </div>
    ),

    ERROR: (
      <div className='relative flex h-5 w-5 bg-transparent'>
        <TriangleAlert className=' h-5 w-5 text-error' />
      </div>
    ),

    DEPLOYING: (
      <span className='relative flex h-4 w-4'>
        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-info/80 opacity-75'></span>
        <span className='relative inline-flex h-4 w-4 rounded-full bg-info'></span>
      </span>
    ),
  }

  return (
    <motion.div
      variants={{
        initial: {
          opacity: 0,
          scale: 0.5,
        },
        animate: {
          opacity: 1,
          scale: 1,
        },
      }}
      key={status}
      initial='initial'
      animate='animate'
      className='w-max'>
      {Element[status]}
    </motion.div>
  )
}

const CheckFilled = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className={cn('h-6 w-6 ', className)}>
      <path
        fillRule='evenodd'
        d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z'
        clipRule='evenodd'
      />
    </svg>
  )
}

type LoadingState = {
  status: StatusType['status']
  step: string
  message: string
}

const LoaderCore = ({
  loadingStates,
  value = 0,
}: {
  loadingStates: LoadingState[]
  value?: number
}) => {
  return (
    <div className='relative mx-auto mt-40 flex max-w-xl flex-col justify-start'>
      {loadingStates.map((loadingState, index) => {
        const distance = Math.abs(index - value)
        const opacity = Math.max(1 - distance * 0.2, 0) // Minimum opacity is 0, keep it 0.2 if you're sane.

        return (
          <motion.div
            key={index}
            className={cn('mb-4 flex items-center gap-2 text-left')}
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity: opacity, y: -(value * 40) }}
            transition={{ duration: 0.5 }}>
            <div>
              {index > value && (
                <StatusIndicator status={loadingState?.status!} />
              )}
              {index <= value && (
                <CheckFilled
                  className={cn(
                    'text-black dark:text-white',
                    value === index &&
                      'text-black opacity-100 dark:text-lime-500',
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                'text-black dark:text-white',
                value === index && 'text-black opacity-100 dark:text-lime-500',
              )}>
              {loadingState.message}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

export const MultiStepLoader = ({
  loadingStates,
  loading,
  duration = 2000,
  loop = false,
}: {
  loadingStates: LoadingState[]
  loading?: boolean
  duration?: number
  loop?: boolean
}) => {
  const [currentState, setCurrentState] = useState(0)

  useEffect(() => {
    if (!loading) {
      setCurrentState(0)
      return
    }
    const timeout = setTimeout(() => {
      setCurrentState(prevState =>
        loop
          ? prevState === loadingStates.length - 1
            ? 0
            : prevState + 1
          : Math.min(prevState + 1, loadingStates.length - 1),
      )
    }, duration)

    return () => clearTimeout(timeout)
  }, [currentState, loading, loop, loadingStates.length, duration])
  return (
    <AnimatePresence mode='wait'>
      {loading && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className='fixed inset-0 z-[100] flex h-full w-full items-center justify-center backdrop-blur-2xl'>
          <div className='relative  h-96'>
            <LoaderCore value={currentState} loadingStates={loadingStates} />
          </div>

          <div className='absolute inset-x-0 bottom-0 z-20 h-full bg-white bg-gradient-to-t [mask-image:radial-gradient(900px_at_center,transparent_30%,white)] dark:bg-black' />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
