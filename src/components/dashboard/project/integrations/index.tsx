'use client'

import { useEffect, useRef } from 'react'

import { integrations } from '@/data/integrations'

import { IntegrationCard } from './IntegrationCard'

const Integrations = () => {
  const cardsContainer = useRef<HTMLDivElement>(null)

  const applyOverlayMask = (e: PointerEvent) => {
    const documentTarget = e.currentTarget as Element

    if (!cardsContainer.current) {
      return
    }

    const x = e.pageX - cardsContainer.current.offsetLeft
    const y = e.pageY - cardsContainer.current.offsetTop

    cardsContainer.current.setAttribute(
      'style',
      `--x: ${x}px; --y: ${y}px; --opacity: 1`,
    )
  }

  useEffect(() => {
    document.body.addEventListener('pointermove', e => {
      applyOverlayMask(e)
    })

    return () => {
      document.body.removeEventListener('pointermove', e => {
        applyOverlayMask(e)
      })
    }
  }, [])

  return (
    <div className='mt-20'>
      <h2 className='mb-2 text-2xl font-bold '>Integrations</h2>
      <p className='text-md text-base-content/80'>
        Use your favorite apps and tools with your blog. Integrations provide an
        easy way to enable comments, live chat, analytics and more. <br />
        All free and premium themes are supported. If you`d like to enable
        integrations for your custom theme, let us know.
      </p>
      <div
        className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 '
        ref={cardsContainer}>
        {integrations?.map((integration, index) => (
          <IntegrationCard key={index} integration={integration} />
        ))}
      </div>
    </div>
  )
}

export default Integrations
