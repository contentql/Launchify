import { Flame } from 'lucide-react'
import Link from 'next/link'

function Footer() {
  return (
    <div className=' mt-20 bg-base-200'>
      <footer className='mx-auto flex max-w-7xl justify-between px-2  py-4 pb-2'>
        <Link href={'/'} className='inline-flex gap-x-2'>
          <Flame fill='#10B981' color='#10B981' />
          <h5 className='text-lg font-bold'>TranquilTech</h5>
        </Link>
        <ul className='inline-flex list-none items-center gap-x-4 text-base-content/80 hover:text-base-content'>
          <li>Features</li>
          <li>Pricing</li>
          <li>Support</li>
        </ul>
      </footer>
      <div className='text-center'>@2024 all rights reserved</div>
    </div>
  )
}

export default Footer
