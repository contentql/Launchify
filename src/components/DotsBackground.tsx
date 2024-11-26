'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

import { cn } from '@/utils/cn'

export function DotBackground({ children }: { children: React.ReactNode }) {
  const [isDragging, setIsDragging] = useState(false)
  return (
    <motion.div
      drag
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      dragConstraints={{
        left: -100,
        right: 100,
        bottom: 100,
        top: -100,
      }}
      dragElastic={0}
      className={cn(
        'flex min-h-screen min-w-full items-center justify-center overflow-auto bg-base-100 bg-dot-white/20',
        isDragging ? 'cursor-grabbing' : 'cursor-grab',
      )}>
      {children}
    </motion.div>
  )
}
