import Image from 'next/image'
import Link from 'next/link'

import Container from './common/Container'

function Footer() {
  return (
    <div className=' mt-20 bg-base-200'>
      <Container className='pb-2'>
        <footer className='flex justify-between py-4'>
          <Link href={'/'} className='inline-flex h-auto w-28 gap-x-2'>
            <Image
              src='/logo.png'
              alt='logo'
              className='object-contain'
              width={1000}
              height={1000}
            />
          </Link>
          <ul className='flex flex-col gap-4 md:flex-row'>
            <li>
              <Link
                className='text-sm font-medium text-base-content/80 transition duration-150 ease-in-out hover:text-base-content'
                href={'/themes'}>
                Themes
              </Link>
            </li>

            <li>
              <Link
                className='text-sm font-medium text-base-content/80 transition duration-150 ease-in-out hover:text-base-content'
                href={'/pricing'}>
                Pricing
              </Link>
            </li>
            <li>
              <Link
                className='text-sm font-medium text-base-content/80 transition duration-150 ease-in-out hover:text-base-content'
                href={'/features'}>
                Features
              </Link>
            </li>
            <li>
              <Link
                className='text-sm font-medium text-base-content/80 transition duration-150 ease-in-out hover:text-base-content'
                href={'/support'}>
                Support
              </Link>
            </li>
          </ul>
        </footer>
        <div className='w-full text-center'>
          © Lauchify - All rights reserved.
        </div>
      </Container>
    </div>
  )
}

export default Footer
