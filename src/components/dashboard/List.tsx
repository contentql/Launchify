'use client'

// import * as Icons from 'lucide-react'
import Link from 'next/link'

import { sites } from '@/data/sites'

// const iconList = Object.keys(Icons)
const List = () => {
  return (
    <div className='z-10 grid grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {sites?.map((site, index) => <ListItem key={index} site={site} />)}
    </div>
  )
}

export default List

const ListItem = ({
  site,
}: {
  site: {
    name: string
    icon: string
    description: string
    slug: string
  }
}) => {
  const getRandomIcon = () => {
    // const randomIndex = Math.floor(Math.random() * iconList.length)
    //@ts-ignore
    // const IconComponent = Icons[iconList[randomIndex]]
    // return <IconComponent size={36} color='#7C3AED' strokeWidth={2} />
  }
  return (
    <div className='card relative flex h-full w-full flex-col items-start justify-start gap-y-4  rounded-md bg-base-200 p-4 shadow-lg '>
      {/* {getRandomIcon()} */}
      <Link href='#' className='cur text-lg font-semibold '>
        {site?.name}
      </Link>
      <p className='line-clamp-2 text-sm text-base-content/80'>
        {site?.description}
      </p>
    </div>
  )
}
