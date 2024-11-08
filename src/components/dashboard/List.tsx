'use client'

// import * as Icons from 'lucide-react'
import { Project } from '@payload-types'
import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'

// const iconList = Object.keys(Icons)
const List = ({ projects }: { projects: Project[] }) => {
  return (
    <div className='z-10 grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {projects?.map((site, index) => <ListItem key={index} site={site} />)}
    </div>
  )
}

export default List

const ListItem = ({ site }: { site: Project }) => {
  return (
    <Link
      href={`/dashboard/project/${site?.name}`}
      className='card relative flex h-full w-full flex-col items-start justify-start gap-y-2  rounded-md bg-base-200 p-4 shadow-lg '>
      {/* {getRandomIcon()} */}
      <Link
        href={`/dashboard/project/${site?.name}`}
        className='cur text-lg font-semibold '>
        {site?.name}
      </Link>
      <p className='line-clamp-2 text-xs text-base-content/80'>
        {site?.projectDescription}
      </p>
      <div
        onClick={event => {
          event.stopPropagation()
        }}
        data-prevent-nprogress={true}
        className='group inline-flex w-full items-center gap-x-2 pt-8 text-sm text-base-content/80 hover:text-base-content'>
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
    </Link>
  )
}
