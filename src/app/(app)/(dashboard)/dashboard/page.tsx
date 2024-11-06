import DashboardView from '@/components/dashboard'
import withAuth from '@/utils/withAuth'

const page = () => {
  return <DashboardView />
}

export default withAuth(page)
