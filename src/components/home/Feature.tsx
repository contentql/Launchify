'use client'

import ScrollAnimationWrapper from '../common/ScrollAnimationWrapper'
import { motion } from 'framer-motion'
import Image from 'next/image'

import getScrollAnimation from '@/utils/getScrollAnimation'

const Feature = () => {
  const scrollLeft = getScrollAnimation()?.left
  const scrollRight = getScrollAnimation()?.right
  return (
    <div className='mx-auto mt-20 max-w-7xl px-2'>
      <ScrollAnimationWrapper className='flex min-h-[400px] w-full flex-col items-center justify-between gap-6 md:flex-row'>
        <motion.div
          variants={scrollLeft}
          className='relative flex w-full items-center justify-center overflow-hidden'>
          <Image
            src='/images/home/posts-bg.jpg'
            alt=''
            className=' h-full w-full '
            width={1000}
            height={1000}
          />
          <Image
            className='absolute h-auto max-h-full w-auto max-w-full'
            src='/images/home/rich-editor.png'
            alt=''
            width={1000}
            height={1000}
          />
        </motion.div>
        <motion.div variants={scrollRight} className='w-full space-y-2 '>
          <h2 className='text-3xl font-medium leading-normal lg:text-4xl xl:text-5xl'>
            Ghost blog for $0 / mo
          </h2>
          <p>
            DigitalPress is really free. Our ambition is to enable everyone to
            tell their story without having to think about price.
          </p>
          <p>
            {' '}
            Create and edit content at no cost. Our free plan includes variety
            of themes and design layouts to show your style. Customize blog with
            your own cover pictures, embed videos, tweets, music clips and share
            joy with your readers.
          </p>
          <p>
            Your blog is supported by ads. We pay close attention to pick ads
            which are relevant to your audience to match your content and their
            interests.
          </p>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  )
}

export default Feature
