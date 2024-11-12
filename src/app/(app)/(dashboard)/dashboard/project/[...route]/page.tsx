import ProjectDetailsView from '@/components/dashboard/project'
import withAuth from '@/utils/withAuth'

const page = async ({ params }: { params: Promise<{ route: any }> }) => {
  const slug = (await params).route
  return <ProjectDetailsView slug={slug} />
}

export default withAuth(page)
