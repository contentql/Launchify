'use client'

import React, { useEffect, useRef, useState } from 'react'

import MousePosition from './useMousePosition'

type HighlighterProps = {
  children: React.ReactNode
  className?: string
  refresh?: boolean
}

export default function Highlighter({
  children,
  className = '',
  refresh = false,
}: HighlighterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = MousePosition()
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const containerSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const [boxes, setBoxes] = useState<Array<HTMLElement>>([])

  useEffect(() => {
    containerRef.current &&
      setBoxes(
        Array.from(containerRef.current.children).map(el => el as HTMLElement),
      )
  }, [])

  useEffect(() => {
    initContainer()
    window.addEventListener('resize', initContainer)

    return () => {
      window.removeEventListener('resize', initContainer)
    }
  }, [setBoxes])

  useEffect(() => {
    onMouseMove()
  }, [mousePosition])

  useEffect(() => {
    initContainer()
  }, [refresh])

  const initContainer = () => {
    if (containerRef.current) {
      containerSize.current.w = containerRef.current.offsetWidth
      containerSize.current.h = containerRef.current.offsetHeight
    }
  }

  const onMouseMove = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const { w, h } = containerSize.current
      const x = mousePosition.x - rect.left
      const y = mousePosition.y - rect.top
      const inside = x < w && x > 0 && y < h && y > 0
      if (inside) {
        mouse.current.x = x
        mouse.current.y = y
        boxes.forEach(box => {
          const boxX =
            -(box.getBoundingClientRect().left - rect.left) + mouse.current.x
          const boxY =
            -(box.getBoundingClientRect().top - rect.top) + mouse.current.y
          box.style.setProperty('--mouse-x', `${boxX}px`)
          box.style.setProperty('--mouse-y', `${boxY}px`)
        })
      }
    }
  }

  return (
    <div className={className} ref={containerRef}>
      {children}
    </div>
  )
}

type HighlighterItemProps = {
  children: React.ReactNode
  className?: string
}

export function HighlighterItem({
  children,
  className = '',
}: HighlighterItemProps) {
  return (
    <div
      className={`relative h-full overflow-hidden rounded-md bg-base-200 p-px before:pointer-events-auto before:absolute before:-left-48 before:-top-48 before:z-10 before:h-96 before:w-96 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-primary before:opacity-0 before:blur-[100px] before:transition-opacity before:duration-500 after:absolute after:inset-0 after:z-10 after:rounded-md after:opacity-0 after:transition-opacity after:duration-500 after:[background:_radial-gradient(250px_circle_at_var(--mouse-x)_var(--mouse-y),theme(colors.slate.400),transparent)] before:hover:opacity-20 after:group-hover:opacity-100 ${className}`}>
      {children}
    </div>
  )
}
