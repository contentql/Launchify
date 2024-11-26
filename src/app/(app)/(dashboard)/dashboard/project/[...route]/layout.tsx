// import DashBoardNavbar from '@/components/dashboard/DashBoardNavbar'
import { headers } from 'next/headers'

import { DotBackground } from '@/components/DotsBackground'
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
      <DotBackground>
        <div className='pb-8 pt-24'>{children}</div>
      </DotBackground>
    </div>
  )
}

export default DashboardLayout
