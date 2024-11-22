import { SiteSetting } from '@payload-types'
import Image from 'next/image'
import Link from 'next/link'

import { generateMenuLinks } from '@/utils/generateMenuLinks'

import Container from './common/Container'

function Footer({ metadata }: { metadata: SiteSetting }) {
  let logoDetails = {
    url: '',
    alt: '',
    height: 0,
    width: 0,
  }

  const { footer, general } = metadata
  const { footerLinks, logo, copyright } = footer
  const formattedFooterLinks = footerLinks?.length
    ? generateMenuLinks(footerLinks)
    : []

  if (Object.keys(logo).length && logo?.imageUrl === 'string') {
    logoDetails = {
      url: logo?.imageUrl,
      alt: `${metadata.general?.title} logo`,
      height: logo?.height!,
      width: logo?.width!,
    }
  } else if (Object.keys(logo).length && typeof logo?.imageUrl !== 'string') {
    logoDetails = {
      url: logo.imageUrl?.url!,
      alt: logo.imageUrl?.alt || `${metadata.general?.title} logo`,
      height: logo?.height!,
      width: logo?.width!,
    }
  }

  if (!logoDetails.url && formattedFooterLinks?.length === 0) {
    return null
  }
  return (
    <div className=' mt-20 bg-base-200'>
      <Container className='pb-2'>
        <footer className='flex justify-between py-4'>
          <Link href={'/'} className='inline-flex h-auto w-28 gap-x-2'>
            <Image
              src={logoDetails?.url || ''}
              alt='logo'
              className='object-contain'
              width={1000}
              height={1000}
            />
          </Link>
          <ul className='flex flex-col gap-4 md:flex-row'>
            {formattedFooterLinks?.map((footerLink, index) =>
              footerLink?.children ? (
                footerLink?.children?.map((link, index) => (
                  <li key={index}>
                    <Link
                      className='text-sm font-medium text-base-content/80 transition duration-150 ease-in-out hover:text-base-content'
                      href={link?.href}
                      target={link?.newTab ? '_blank' : '_self'}>
                      {link?.label}
                    </Link>
                  </li>
                ))
              ) : (
                <li key={index}>
                  <Link
                    className='text-sm font-medium text-base-content/80 transition duration-150 ease-in-out hover:text-base-content'
                    href={footerLink?.href || ''}>
                    {footerLink?.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </footer>
        <div className='w-full text-center'>{copyright}</div>
      </Container>
    </div>
  )
}

export default Footer
