import { Project, Service } from '@payload-types'
import { motion } from 'framer-motion'
import {
  Ban,
  Box,
  CircleAlert,
  CircleCheckBig,
  CircleDashed,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Skeleton } from '@/components/common/Skeleton'
import { cn } from '@/utils/cn'
import { formateDateByDays } from '@/utils/daysAgo'

function Services({
  setOpen,
  open,
  services,
  slug,
  isServicesLoading,
}: {
  setOpen: Function
  open: boolean
  services: Service[]
  slug: any
  isServicesLoading: boolean
}) {
  const deploymentStatus = {
    DEPLOYING: (
      <span title='Deploying' className='text-info'>
        <CircleDashed size={16} />
      </span>
    ),
    ERROR: (
      <span title='Error' className='text-error'>
        <Ban size={16} />
      </span>
    ),
    SUCCESS: (
      <span title='Success' className='text-success'>
        <CircleCheckBig size={16} />
      </span>
    ),
    NOT_YET_DEPLOYED: (
      <span title='Not yet deployed' className='text-warning'>
        <CircleAlert size={16} />
      </span>
    ),
  }
  return (
    <section
      className={cn(
        'transition-all duration-300 ease-linear',
        open
          ? 'w-full md:grid md:w-[30%] md:grid-cols-1 md:gap-y-4'
          : 'flex min-h-[calc(100vh-16rem)] w-full flex-col items-center justify-center gap-4 md:flex-row md:flex-wrap',
      )}>
      {isServicesLoading ? (
        <>
          <Skeleton className='h-32 w-full md:w-64' />
          <Skeleton className='h-32 w-full md:w-64' />
        </>
      ) : (
        services?.map((service, index) => (
          <div key={index}>
            <motion.div
              drag
              dragElastic={0}
              whileDrag={{ scale: 1.1 }}
              className='relative'>
              <div className='relative flex h-32 w-full flex-col items-start justify-between overflow-hidden rounded-md border border-base-content/20 bg-base-200 p-4 shadow-lg drop-shadow-md md:w-64'>
                <Link
                  href={`/dashboard/project/${(service?.project as Project)?.id}/service/${service?.id}`}
                  className={cn(
                    'absolute inset-0 z-10',
                    service?.id === slug?.at(-1)
                      ? 'border-primary/50 bg-primary/5'
                      : '',
                  )}>
                  <span className='sr-only'>Navigate</span>
                </Link>
                <div className='z-20 space-y-0'>
                  <div className='inline-flex items-center gap-x-2'>
                    {service?.icon ? (
                      <Image
                        src={service?.icon}
                        alt=''
                        width={20}
                        height={20}
                      />
                    ) : (
                      <Box className='text-base-content/80' size={20} />
                    )}
                    <h4 className='line-clamp-1 text-lg font-bold capitalize text-base-content'>
                      {service?.serviceName}
                    </h4>
                  </div>
                  {service?.serviceDomains?.length! > 0 && (
                    <p className='line-clamp text-sm text-base-content/80'>
                      {service?.serviceDomains?.at(0)?.domainUrl}
                    </p>
                  )}
                </div>
                <div className='inline-flex items-center gap-x-2'>
                  {deploymentStatus[service?.deploymentStatus!]}
                  <p className='text-sm text-base-content/80'>
                    {service?.updatedAt
                      ? formateDateByDays(service?.updatedAt)
                      : formateDateByDays(service?.createdAt)}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        ))
      )}
    </section>
  )
}

export default Services
