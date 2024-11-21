'use client'

import { Params } from '../types'
import { FeatureType, Media } from '@payload-types'
import { motion } from 'framer-motion'
import Image from 'next/image'

import Container from '@/components/common/Container'
import ScrollAnimationWrapper from '@/components/common/ScrollAnimationWrapper'
import getScrollAnimation from '@/utils/getScrollAnimation'

interface FeatureProps extends FeatureType {
  params: Params
}

const Feature: React.FC<FeatureProps> = ({ params, ...block }) => {
  const scrollLeft = getScrollAnimation()?.left
  const scrollRight = getScrollAnimation()?.right
  return (
    <Container>
      <ScrollAnimationWrapper className='flex min-h-[400px] w-full flex-col items-center justify-between gap-8 text-base-content md:flex-row'>
        <motion.div
          variants={scrollLeft}
          className='relative flex w-full items-center justify-center overflow-hidden'>
          <Image
            src={(block?.image1 as Media)?.url || '/images/home/posts-bg.jpg'}
            alt=''
            className=' h-full w-full '
            width={1000}
            height={1000}
          />
          <Image
            className='absolute h-auto max-h-full w-auto max-w-full'
            src={
              (block?.image2 as Media)?.url || '/images/home/rich-editor.png'
            }
            alt=''
            width={1000}
            height={1000}
          />
        </motion.div>
        <motion.div variants={scrollRight} className='w-full space-y-2 '>
          <h2 className='text-3xl font-medium leading-normal lg:text-4xl xl:text-5xl'>
            {block?.title}
          </h2>
          <p className='text-base-content/80'>{block?.description}</p>
        </motion.div>
      </ScrollAnimationWrapper>
    </Container>
  )
}

export default Feature
