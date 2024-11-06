import ProjectDetails from '@/components/dashboard/project'
import withAuth from '@/utils/withAuth'

const page = () => {
  return <ProjectDetails />
}

export default withAuth(page)
