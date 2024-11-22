'use client'

import { Params } from '../types'
import { HeroType, Media } from '@payload-types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import ScrollAnimationWrapper from '@/components/common/ScrollAnimationWrapper'
import getScrollAnimation from '@/utils/getScrollAnimation'

interface HeroProps extends HeroType {
  params: Params
}
const Hero: React.FC<HeroProps> = ({ params, ...block }) => {
  const scrollAnimation = getScrollAnimation().top
  return (
    <Container>
      <ScrollAnimationWrapper>
        <motion.div
          className='grid grid-flow-row grid-rows-2 gap-8 sm:grid-flow-col sm:grid-cols-2 md:grid-rows-1'
          variants={scrollAnimation}>
          <div className=' row-start-2 flex flex-col items-start justify-center sm:row-start-1'>
            <h1 className='text-3xl font-medium leading-normal text-base-content lg:text-4xl xl:text-5xl'>
              {block?.title}
            </h1>
            <p className='mb-6 mt-4 text-base-content/80'>
              {block?.description}
            </p>
            <div className='space-x-4'>
              {block?.primaryButton && (
                <Button>
                  <Link href={block?.primaryButtonLink || ''}>
                    {block?.primaryButton}
                  </Link>
                </Button>
              )}
              {block?.secondaryButton && (
                <Button variant={'outline'}>
                  <Link href={block?.secondaryButtonLink || ''}>
                    {block?.secondaryButton}
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <div className='flex w-full'>
            <motion.div className='h-full w-full' variants={scrollAnimation}>
              <Image
                className='object-fit max-h-[650px]'
                src={
                  (block?.image as Media)?.url ||
                  '/images/home/people-talking.png'
                }
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
    </Container>
  )
}

export default Hero
