// import DashBoardNavbar from '@/components/dashboard/DashBoardNavbar'
import { headers } from 'next/headers'

import Navbar from '@/components/Navbar'
import { serverClient } from '@/trpc/serverClient'
import { getCurrentUser } from '@/utils/getCurrentUser'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const metadata = await serverClient.siteSettings.getSiteSettings()

  const headersList = await headers()
  const user = await getCurrentUser(headersList)
  return (
    <div>
      <Navbar metadata={metadata} user={user} />
      <div className='mx-auto grid min-h-screen w-full grid-rows-[1fr_auto] text-base-content'>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
