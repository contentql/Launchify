import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    const event = await req.json()

    console.log('event in webhook', event)

    if (event.type === 'DEPLOY') {
      const serviceId = event.service.id
      const deploymentStatus = event.status
      const deploymentStatuses = [
        'NOT_YET_DEPLOYED',
        'SUCCESS',
        'ERROR',
        'DEPLOYING',
      ]

      if (deploymentStatuses.includes(deploymentStatus)) {
        await payload.update({
          collection: 'projects',
          data: {
            deploymentStatus,
          },
          where: {
            serviceId: {
              equals: serviceId,
            },
          },
        })
      }
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
