import React from 'react'

import { cn } from '@/utils/cn'

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('mx-auto max-w-7xl px-4 md:px-12 lg:px-20', className)}>
      {children}
    </div>
  )
}

export default Container
