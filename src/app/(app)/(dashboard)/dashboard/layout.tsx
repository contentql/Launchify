// import DashBoardNavbar from '@/components/dashboard/DashBoardNavbar'
import { ReactFlowProvider } from '@xyflow/react'
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
      <ReactFlowProvider>
        <div className='mx-auto grid min-h-screen w-full grid-rows-[1fr_auto] text-base-content'>
          <div>{children}</div>
        </div>
      </ReactFlowProvider>
    </div>
  )
}

export default DashboardLayout
