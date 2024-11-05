'use client'

import { themes } from '@/data/themes'

import Card from './Card'

const Hero = () => {
  return (
    <div className='mx-auto max-w-7xl px-2 text-center'>
      <h2 className='mb-3 text-3xl font-bold leading-[1.208] sm:text-4xl'>
        Themes
      </h2>
      <p className='mx-auto max-w-2xl text-center text-base-content/80'>
        Pick from variety of themes. Some themes are included with every Ghost
        blog automatically. Others are premium themes from various authors.
      </p>
      <div className='mt-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {themes?.map((theme, index) => <Card theme={theme} key={index} />)}
      </div>
    </div>
  )
}

export default Hero
