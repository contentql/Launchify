'use client'

import ScrollAnimationWrapper from '../common/ScrollAnimationWrapper'
import { motion } from 'framer-motion'
import Image from 'next/image'

import getScrollAnimation from '@/utils/getScrollAnimation'

const About = () => {
  const scrollLeft = getScrollAnimation()?.left
  const scrollRight = getScrollAnimation()?.right
  return (
    <div className='mx-auto mt-20 max-w-7xl overflow-hidden px-2'>
      <ScrollAnimationWrapper className='flex min-h-[400px] w-full flex-col items-center justify-between gap-6 sm:text-center md:flex-row md:text-left'>
        <motion.div variants={scrollRight} className='w-full space-y-2'>
          <h2 className='text-3xl font-medium leading-normal lg:text-4xl xl:text-5xl'>
            Tell your story with a blog
          </h2>
          <p>
            Make your blog personal. Express yourself and entertain your readers
            by sharing thoughts, tips, reviews, jokes or wedding announcements.
            Share blog posts with family, friends, colleagues or your boss.
            You`re free to tell your own story.
          </p>
          <p>
            Business or freelancer? Share product announcements, company news,
            pictures from retreats, conferences or just the office. Build a fan
            base, create portfolio or share your resume. You can do it all on
            DigitalPress.
          </p>
        </motion.div>
        <motion.div className='relative h-full w-full' variants={scrollLeft}>
          <Image
            src='/images/home/themes-bg.jpg'
            alt=''
            className='object-cover'
            width={1000}
            height={1000}
          />
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  )
}

export default About
