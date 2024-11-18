'use client'

// import * as Icons from 'lucide-react'
import { Skeleton } from '../common/Skeleton'
import { Project } from '@payload-types'
import Link from 'next/link'

import EmptyProjects from './EmptyProjects'

// const iconList = Object.keys(Icons)
const List = ({
  projects,
  isLoading,
  isProjectsEmpty,
}: {
  projects: Project[]
  isLoading: boolean
  isProjectsEmpty: boolean
}) => {
  return (
    <div>
      {isLoading ? (
        <div className='z-10 grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <Skeleton className='h-48 w-full' />
          <Skeleton className='h-48 w-full' />
          <Skeleton className='h-48 w-full' />
        </div>
      ) : isProjectsEmpty ? (
        <EmptyProjects />
      ) : (
        <div className='z-10 grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {projects?.map((site, index) => <ListItem key={index} site={site} />)}
        </div>
      )}
    </div>
  )
}

export default List

const ListItem = ({ site }: { site: Project }) => {
  const Component = {
    DEPLOYING: (
      <span title='Deploying' className='relative flex h-3 w-3'>
        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-info/90 opacity-75'></span>
        <span className='relative inline-flex h-3 w-3 rounded-full bg-info'></span>
      </span>
    ),
    ERROR: (
      <span
        title='Error'
        className='relative inline-flex h-3 w-3 rounded-full bg-error'></span>
    ),
    SUCCESS: (
      <span
        title='Success'
        className='relative inline-flex h-3 w-3 rounded-full bg-success'></span>
    ),
    NOT_YET_DEPLOYED: (
      <span title='Not yet deployed' className='relative flex h-3 w-3'>
        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-warning/90 opacity-75'></span>
        <span className='relative inline-flex h-3 w-3 rounded-full bg-warning'></span>
      </span>
    ),
  }
  return (
    <Link
      href={`/dashboard/project/${site?.id}`}
      className='card relative flex h-48 w-full flex-col items-start justify-between gap-y-2 rounded-md bg-base-200 p-4  shadow-lg transition-all duration-300 hover:border-none '>
      <div className='space-y-2'>
        <h2 className='cur text-lg font-semibold '>{site?.name}</h2>
        <p className='line-clamp-2 text-sm text-base-content/80'>
          {site?.projectDescription}
        </p>
      </div>
      <p className='inline-flex items-center  justify-start gap-x-2 text-sm text-base-content/80'>
        {site?.Services?.docs?.length} Services
      </p>
      {/* {site?.deploymentStatus === 'DEPLOYING' ||
      site?.deploymentStatus === 'NOT_YET_DEPLOYED' ? (
        <Skeleton className='h-6 w-full' />
      ) : (
        <div
          onClick={event => {
            event.stopPropagation()
          }}
          data-prevent-nprogress={true}
          className='text-md group inline-flex w-full items-center gap-x-2 text-base-content/80 hover:text-base-content'>
          <Link
            data-disable-nprogress={true}
            className='line-clamp-1 '
            href={`https://${site?.serviceDomains?.at(0)?.domainUrl}` || ''}
            target='_blank'>
            {site?.serviceDomains?.at(0)?.domainUrl}
          </Link>
          {site?.serviceDomains?.at(0)?.domainUrl && (
            <Link
              data-disable-nprogress={true}
              target='_blank'
              className='rounded-full p-1 transition-colors duration-300  hover:bg-base-300 hover:text-primary'
              href={`https://${site?.serviceDomains?.at(0)?.domainUrl}` || ''}>
              <SquareArrowOutUpRight className='h-4 w-4' />
            </Link>
          )}
        </div>
      )} */}
    </Link>
  )
}
