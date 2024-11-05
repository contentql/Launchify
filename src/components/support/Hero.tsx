'use client'

import Button from '../common/Button'
import ScrollAnimationWrapper from '../common/ScrollAnimationWrapper'
import { motion } from 'framer-motion'
import Image from 'next/image'

import getScrollAnimation from '@/utils/getScrollAnimation'

const Hero = () => {
  const scrollAnimation = getScrollAnimation().top
  return (
    <div className='mx-auto max-w-7xl px-2'>
      <ScrollAnimationWrapper>
        <motion.div
          className='grid grid-flow-row grid-rows-2 gap-8 sm:grid-flow-col sm:grid-cols-2 md:grid-rows-1'
          variants={scrollAnimation}>
          <div className=' row-start-2 flex flex-col items-start justify-center sm:row-start-1'>
            <h1 className='text-3xl font-medium leading-normal lg:text-4xl xl:text-5xl'>
              Support
            </h1>
            <p className='mb-6 mt-4 text-base-content/80'>
              Learn more about TranquilTech through in-depth documentation and
              helpful guides. Join community forums to connect with other users,
              share insights, and find support. Maximize your experience with
              all that TranquilTech has to offer!
            </p>
            <div className='space-x-4'>
              <Button>Contact us</Button>
            </div>
          </div>
          <div className='flex w-full'>
            <motion.div className='h-full w-full' variants={scrollAnimation}>
              <Image
                src='/images/home/support.png'
                alt='VPN Illustrasi'
                quality={100}
                width={612}
                height={383}
                layout='responsive'
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  )
}

export default Hero
