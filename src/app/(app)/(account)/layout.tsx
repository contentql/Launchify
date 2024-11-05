import { headers } from 'next/headers'

import { getCurrentUser } from '@/utils/getCurrentUser'

interface LayoutProps {
  children: React.ReactNode
}

const AccountLayout: React.FC<LayoutProps> = async ({ children }) => {
  const headersList = await headers()
  const user = await getCurrentUser(headersList)

  console.log('user in profile', user)

  return (
    <div className='flex min-h-screen flex-col'>
      <div className='flex-grow'>{children}</div>
      {/* Footer */}
    </div>
  )
}

export default AccountLayout
