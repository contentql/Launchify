import { headers } from 'next/headers'

// import Branding from '@/components/Branding'
import { getCurrentUser } from '@/utils/getCurrentUser'

// import { MetadataProvider } from '@/utils/metadataContext'

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  // const metadata = await serverClient.siteSettings.getSiteSettings()

  const headersList = await headers()
  const user = await getCurrentUser(headersList)

  return (
    <div className='mx-auto grid min-h-screen w-full  grid-rows-[1fr_auto] overflow-hidden text-base-content'>
      {/* <Navbar metadata={metadata} /> */}
      <main className='pb-8 pt-24'>{children}</main>
      {/* <Footer metadata={metadata} />
        <Branding /> */}
    </div>
  )
}

export default MarketingLayout
