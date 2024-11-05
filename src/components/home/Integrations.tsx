'use client'

import { Glow, GlowCapture } from '../common/Glow'
import ScrollAnimationWrapper from '../common/ScrollAnimationWrapper'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { homeIntegrations } from '@/data/integrations'
import getScrollAnimation from '@/utils/getScrollAnimation'

const Integrations = () => {
  const scrollAnimation = getScrollAnimation().top
  return (
    <div className='mx-auto mt-20 max-w-7xl px-2'>
      <ScrollAnimationWrapper>
        <h1 className='text-center text-3xl font-medium leading-normal lg:text-4xl xl:text-5xl'>
          Integrations
        </h1>
        <p className='mb-6 mt-4 text-center text-base-content/80'>
          No coding required. Enable integrations right from our web dashboard.
        </p>
        <GlowCapture>
          <motion.div
            // variants={scrollAnimation}
            className='z-20 grid grid-cols-1 gap-6 md:grid-cols-2'>
            {homeIntegrations?.map((integration, index) => (
              <Glow key={index} color='purple'>
                <motion.div
                  custom={{ duration: 2 + index }}
                  variants={scrollAnimation}
                  className='glowable flex h-full w-full items-start gap-4 rounded-md border-[2px] border-transparent bg-base-200 p-6'>
                  <div>
                    <Image
                      src={integration?.image}
                      alt=''
                      width={56}
                      height={56}
                    />
                  </div>
                  <div className='space-y-2'>
                    <h2 className='text-lg font-semibold'>
                      {integration?.name}
                    </h2>
                    <p className='text-base-content/80'>
                      {integration?.description}
                    </p>
                  </div>
                </motion.div>
              </Glow>
            ))}
          </motion.div>
        </GlowCapture>
      </ScrollAnimationWrapper>
    </div>
  )
}

export default Integrations
