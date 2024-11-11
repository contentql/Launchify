import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { NextRequest, NextResponse } from 'next/server'

import { getServiceDomains, getVariables } from '@/railway'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const event = await req.json()

    console.log('event in webhook', event)

    if (event.type === 'DEPLOY') {
      const {
        id: projectId,
        service,
        environment,
        status: deploymentStatus,
      } = event
      const serviceId = service.id
      const environmentId = environment.id
      const deploymentStatuses = [
        'NOT_YET_DEPLOYED',
        'SUCCESS',
        'ERROR',
        'DEPLOYING',
      ]

      if (!deploymentStatuses.includes(deploymentStatus)) {
        return NextResponse.json(
          { message: 'Invalid deployment status' },
          { status: 400 },
        )
      }

      const updateData: Record<string, any> = { deploymentStatus }

      if (deploymentStatus === 'SUCCESS' || deploymentStatus === 'ERROR') {
        const [serviceDomains, variables] = await Promise.all([
          getServiceDomains({ environmentId, projectId, serviceId }),
          getVariables({ serviceId, projectId, environmentId }),
        ])

        console.log('domains after create', serviceDomains)
        console.log('variables', variables)

        updateData.serviceDomains = serviceDomains.length
          ? [{ domainUrl: serviceDomains.at(0)?.domain }]
          : []
        updateData.variables = Object.entries(variables?.variables || {}).map(
          ([key, value]) => ({
            key,
            value: value as any,
          }),
        )

        console.log('New variables', updateData.variables)
      }

      await payload.update({
        collection: 'services',
        where: {
          serviceId: {
            equals: serviceId,
          },
        },
        data: updateData,
      })
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Error updating project deployment status:', error)
    return NextResponse.json(
      { error: 'Error updating project deployment status.' },
      { status: 500 },
    )
  }
}
