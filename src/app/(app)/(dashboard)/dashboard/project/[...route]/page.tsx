import ProjectDetails from '@/components/dashboard/project'
import withAuth from '@/utils/withAuth'

const page = async ({ params }: { params: Promise<{ route: any }> }) => {
  const slug = (await params).route
  console.log('slug', slug)
  return <ProjectDetails slug={slug} />
}

export default withAuth(page)
