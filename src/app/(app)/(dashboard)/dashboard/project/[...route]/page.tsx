import configPromise from '@payload-config'
import { Service } from '@payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import ProjectDetailsView from '@/components/dashboard/project'
import NodesTesting from '@/components/dashboard/project/NodesTesting'
import withAuth from '@/utils/withAuth'

const payload = await getPayloadHMR({ config: configPromise })
const page = async ({ params }: { params: Promise<{ route: any }> }) => {
  const slug = (await params).route

  const services = await payload.find({
    collection: 'services',
    where: {
      project: {
        equals: slug.at(0),
      },
    },
  })

  console.log('server', services)
  // return <ProjectDetailsView slug={slug} />

  return (
    <NodesTesting slug={slug} services={services?.docs as Service[]}>
      <ProjectDetailsView slug={slug} />
    </NodesTesting>
  )
}

export default withAuth(page)
