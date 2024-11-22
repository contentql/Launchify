import DashboardView from '@/components/dashboard'
import { serverClient } from '@/trpc/serverClient'
import withAuth from '@/utils/withAuth'

const page = async () => {
  const metadata = await serverClient.siteSettings.getSiteSettings()

  return <DashboardView metadata={metadata} />
}

export default withAuth(page)
