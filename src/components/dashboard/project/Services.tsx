import {
  Ban,
  CircleAlert,
  CircleCheckBig,
  CircleDashed,
  DatabaseZap,
} from 'lucide-react'
import Link from 'next/link'

function Services({ setOpen }: { setOpen: Function }) {
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
    <section className='flex min-h-[calc(100vh-16rem)] w-full flex-wrap items-center justify-center gap-4 sm:flex-1'>
      <div className='flex h-32 w-full flex-col items-start justify-between rounded-md border border-base-content/20 bg-base-200 p-4 shadow-lg drop-shadow-md md:w-64'>
        <div className='inline-flex items-center gap-x-2'>
          <DatabaseZap size={20} />
          <h4 className='line-clamp-1 text-lg font-semibold capitalize text-base-content'>
            ghost
          </h4>
        </div>
        <div className='inline-flex items-center gap-x-2'>
          {deploymentStatus['SUCCESS']}
          <p className='text-xs text-base-content/80'>10/20/2024</p>
        </div>
      </div>
      <Link
        href={'/dashboard/project/projectId/service/ServiceId'}
        className='flex h-32 w-full flex-col items-start justify-between rounded-md border border-base-content/20 bg-base-200 p-4 shadow-lg drop-shadow-md md:w-64'>
        <div className='inline-flex items-center gap-x-2'>
          <DatabaseZap size={20} />
          <h4 className='line-clamp-1 text-lg font-semibold capitalize text-base-content'>
            Mysql
          </h4>
        </div>
        <div className='inline-flex items-center gap-x-2'>
          {deploymentStatus['ERROR']}
          <p className='text-xs text-base-content/80'>10/20/2024</p>
        </div>
      </Link>
    </section>
  )
}

export default Services
