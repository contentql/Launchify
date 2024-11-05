// import DashBoardNavbar from '@/components/dashboard/DashBoardNavbar'
import { headers } from 'next/headers'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getCurrentUser } from '@/utils/getCurrentUser'

interface LayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<LayoutProps> = async ({ children }) => {
  const headersList = await headers()
  const user = await getCurrentUser(headersList)
  return (
    <div className='mx-auto grid min-h-screen w-full  grid-rows-[1fr_auto] overflow-hidden text-base-content'>
      <Navbar user={user} />
      <div className='pb-8 pt-24'>{children}</div>
      <Footer />
    </div>
  )
}

export default DashboardLayout
