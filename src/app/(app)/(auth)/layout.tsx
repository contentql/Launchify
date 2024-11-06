// import DashBoardNavbar from '@/components/dashboard/DashBoardNavbar'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import Button from '@/components/common/Button'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Link href='/' className='group fixed left-4 top-4'>
        <Button className='ml-2 mt-4' variant='outline' size='sm'>
          <ArrowLeft className='mr-2 size-4 transition-transform duration-150 ease-in-out group-hover:-translate-x-0.5' />
          Back to Home
        </Button>
      </Link>
      {children}
    </div>
  )
}

export default AuthLayout
