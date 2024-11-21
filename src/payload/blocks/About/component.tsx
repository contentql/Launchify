'use client'

import { Params } from '../types'
import { AboutType, Media } from '@payload-types'
import { motion } from 'framer-motion'
import Image from 'next/image'

import Container from '@/components/common/Container'
import ScrollAnimationWrapper from '@/components/common/ScrollAnimationWrapper'
import getScrollAnimation from '@/utils/getScrollAnimation'

interface AboutProps extends AboutType {
  params: Params
}

const About: React.FC<AboutProps> = ({ params, ...block }) => {
  const scrollLeft = getScrollAnimation()?.left
  const scrollRight = getScrollAnimation()?.right
  return (
    <Container className='mt-20'>
      <ScrollAnimationWrapper className='flex min-h-[400px] w-full flex-col items-center justify-between gap-8 sm:text-center md:flex-row md:text-left'>
        <motion.div variants={scrollRight} className='w-full space-y-2'>
          <h2 className='text-3xl font-medium leading-normal lg:text-4xl xl:text-5xl'>
            {block?.title}
          </h2>
          <p className='text-base-content/80'>{block?.description}</p>
        </motion.div>
        <motion.div className='relative h-full w-full' variants={scrollLeft}>
          <Image
            src={(block?.image as Media)?.url || '/images/home/themes-bg.jpg'}
            alt=''
            className='object-cover'
            width={1000}
            height={1000}
          />
        </motion.div>
      </ScrollAnimationWrapper>
    </Container>
  )
}

export default About
