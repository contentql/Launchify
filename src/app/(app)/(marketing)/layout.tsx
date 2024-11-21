import { headers } from 'next/headers'

// import Branding from '@/components/Branding'
import Navbar from '@/components/Navbar'
import { serverClient } from '@/trpc/serverClient'
import { getCurrentUser } from '@/utils/getCurrentUser'

// import { MetadataProvider } from '@/utils/metadataContext'

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  const metadata = await serverClient.siteSettings.getSiteSettings()

  console.log('MetaData', metadata)

  const headersList = await headers()
  const user = await getCurrentUser(headersList)

  return (
    <div className='mx-auto grid min-h-screen w-full  grid-rows-[1fr_auto] overflow-hidden text-base-content'>
      <Navbar user={user} metadata={metadata} />
      <main className='pb-8 pt-24'>{children}</main>
      {/* <Footer metadata={metadata} />
        <Branding /> */}
    </div>
  )
}

export default MarketingLayout
