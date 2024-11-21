// import DashBoardNavbar from '@/components/dashboard/DashBoardNavbar'
import { headers } from 'next/headers'

import Navbar from '@/components/Navbar'
import { BackgroundBeamsWithCollision } from '@/components/common/Background'
import { serverClient } from '@/trpc/serverClient'
import { getCurrentUser } from '@/utils/getCurrentUser'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const metadata = await serverClient.siteSettings.getSiteSettings()

  const headersList = await headers()
  const user = await getCurrentUser(headersList)
  return (
    <BackgroundBeamsWithCollision>
      <div className='mx-auto grid min-h-screen w-full max-w-7xl grid-rows-[1fr_auto] text-base-content'>
        <Navbar metadata={metadata} user={user} />
        <div className='pb-8 pt-24'>{children}</div>
      </div>
    </BackgroundBeamsWithCollision>
  )
}

export default DashboardLayout
