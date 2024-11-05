import { Backpack } from 'lucide-react'
import Link from 'next/link'

import Integrations from './integrations'
import Settings from './settings'

const ProjectDetails = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-4 px-4 py-8'>
      <Backpack size={68} />
      <h2 className='text-2xl font-bold '>emerld</h2>
      <div className='space-y-2 text-center'>
        <p>
          Your blog address: <Link href='#'>emerld.digitalpress.blog</Link>
        </p>
        <p>
          Administration dashboard:{' '}
          <Link href='#'>emerld.digitalpress.blog/admin</Link>
        </p>
      </div>
      <Integrations />
      <Settings />
    </div>
  )
}

export default ProjectDetails
