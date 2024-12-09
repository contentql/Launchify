import { Media, Template } from '@payload-types'
import { CollectionBeforeChangeHook } from 'payload'

import { sendMessageToClient } from '@/lib/clients'
import {
  createEmptyProject,
  createMariaDBDatabase,
  createMongoDBDatabase,
  createMySQLDatabase,
  createPostgreSQLDatabase,
  createRedisDatabase,
  createService,
  createServiceDomain,
  createTcpProxy,
  createVolume,
  deleteProject,
  getProjectDetails,
  githubRepoDeploy,
  serviceInstanceUpdate,
  updateServiceDetails,
  upsertVariables,
} from '@/railway'

export const deployTemplate: CollectionBeforeChangeHook = async ({
  collection,
  req,
  context,
  originalDoc,
  operation,
  data,
}) => {
  if (operation === 'create') {
    const { clientId } = context as { clientId: string }
    const { payload } = req
    try {
      sendMessageToClient(
        clientId,
        JSON.stringify({
          process: 'CREATE_PROJECT',
          status: 'PENDING',
          step: 'Create empty project',
          message: 'Creating empty project...',
        }),
      )
      const emptyProject = await createEmptyProject({
        projectName: data?.name,
        projectDescription: data?.projectDescription,
      })
      data.projectId = emptyProject.id
      data.environmentId = emptyProject.environments.edges.at(0).node.id

      sendMessageToClient(
        clientId,
        JSON.stringify({
          process: 'CREATE_PROJECT',
          status: 'SUCCESS',
          step: 'Create empty project',
          message: 'Empty project created successfully.',
        }),
      )

      sendMessageToClient(
        clientId,
        JSON.stringify({
          process: 'CREATE_PROJECT',
          status: 'PENDING',
          step: 'Create webhook',
          message: 'Creating webhook...',
        }),
      )
      // await createWebhook({
      //   projectId: data.projectId,
      //   url: `${env.PAYLOAD_URL}/api/webhook/railway`,
      // })
      sendMessageToClient(
        clientId,
        JSON.stringify({
          process: 'CREATE_PROJECT',
          status: 'SUCCESS',
          step: 'Create webhook',
          message: 'Webhook created successfully.',
        }),
      )

      const template = await payload.findByID({
        collection: 'templates',
        id: data.project,
      })

      // Polling utility to wait for deployment success
      async function waitForDeploymentSuccess(serviceId: string) {
        let status = ''
        do {
          const service = await payload.findByID({
            collection: 'services',
            id: serviceId,
          })
          status = service?.deploymentStatus || ''
          if (status === 'NOT_YET_DEPLOYED') {
            sendMessageToClient(
              clientId,
              JSON.stringify({
                process: 'CREATE_PROJECT',
                status: 'NOT_YET_DEPLOYED',
                step: 'Deploying',
                message: `Initializing ${service?.serviceName} deployment... please wait`,
              }),
            )
          }
          if (status === 'DEPLOYING') {
            sendMessageToClient(
              clientId,
              JSON.stringify({
                process: 'CREATE_PROJECT',
                status: 'DEPLOYING',
                step: 'Deploying',
                message: `${service?.serviceName} is currently deploying...`,
              }),
            )
          }
          if (status === 'ERROR') {
            sendMessageToClient(
              clientId,
              JSON.stringify({
                process: 'CREATE_PROJECT',
                status: 'ERROR',
                step: 'Deployment error',
                message: `${service?.serviceName} deployment failed`,
              }),
            )
            break
          }
          if (status === 'SUCCESS') {
            sendMessageToClient(
              clientId,
              JSON.stringify({
                process: 'CREATE_PROJECT',
                status: 'SUCCESS',
                step: 'Deployment success',
                message: `${service?.serviceName} has been successfully deployed!`,
              }),
            )
            break
          }

          await new Promise(resolve => setTimeout(resolve, 5000)) // Poll every 5 seconds
        } while (status !== 'SUCCESS' && status !== 'ERROR')
      }

      // Handle database services creation
      async function handleDatabaseService(service: any, data: any) {
        switch (service.databaseType) {
          case 'MARIADB':
            const mariadb = await createMariaDBDatabase({
              environmentId: data.environmentId,
              projectId: data.projectId,
              icon: (service?.icon as Media)?.url || '',
              name: service.name!,
            })
            return mariadb
          case 'POSTGRESQL':
            const postgreSQL = await createPostgreSQLDatabase({
              environmentId: data.environmentId,
              projectId: data.projectId,
              icon: (service?.icon as Media)?.url || '',
              name: service.name!,
              variables: { PGDATA: `/var/lib/${service.type}/${service.name}` },
            })
            await serviceInstanceUpdate({
              environmentId: data.environmentId,
              input: {
                startCommand: `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`,
              },
              serviceId: postgreSQL?.id,
            })
            await createTcpProxy({
              applicationPort: 5432,
              environmentId: data.environmentId,
              serviceId: postgreSQL?.id,
            })
            return postgreSQL
          case 'MYSQL':
            const mysql = await createMySQLDatabase({
              environmentId: data.environmentId,
              projectId: data.projectId,
              icon: (service?.icon as Media)?.url || '',
              name: service.name!,
            })

            await serviceInstanceUpdate({
              environmentId: data.environmentId,
              input: {
                startCommand:
                  'docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0',
              },
              serviceId: mysql?.id,
            })
            await createTcpProxy({
              applicationPort: 3306,
              environmentId: data.environmentId,
              serviceId: mysql?.id,
            })
            return mysql
          case 'MONGODB':
            const mongodb = await createMongoDBDatabase({
              environmentId: data.environmentId,
              projectId: data.projectId,
              icon: (service?.icon as Media)?.url || '',
              name: service.name!,
            })
            return mongodb
          case 'REDIS':
            const redis = await createRedisDatabase({
              environmentId: data.environmentId,
              projectId: data.projectId,
              icon: (service?.icon as Media)?.url || '',
              name: service.name!,
            })
            return redis
        }
      }

      // Handle Docker services creation
      async function handleDockerService(service: any, data: any) {
        const dockerService = await createService({
          environmentId: data.environmentId,
          projectId: data.projectId,
          icon: (service?.icon as Media)?.url || '',
          name: service.name!,
          source: { image: service.image! },
          variables: Object.fromEntries(
            Object.entries(service.environmentVariables || {}).map(
              ([key, value]) => [key, String(value)],
            ),
          ),
        })

        const serviceDomain = await createServiceDomain({
          environmentId: data.environmentId,
          serviceId: dockerService?.id,
        })

        if (service.addStartCommand) {
          await serviceInstanceUpdate({
            environmentId: data.environmentId,
            input: { startCommand: service.startCommand! },
            serviceId: dockerService.id,
          })
        }
        return dockerService
      }

      //Handle github service creation
      async function handleGithubService(service: any, data: any) {
        const github = await githubRepoDeploy({
          projectId: data.projectId,
          repo: service.repo,
          branch: null,
          // icon: (service?.icon as Media)?.url || '',
          // name: service.name!,
          // source: { image: service.image! },
          // variables: Object.fromEntries(
          //   Object.entries(service.environmentVariables || {}).map(
          //     ([key, value]) => [key, String(value)],
          //   ),
          // ),
        })

        const services = await getProjectDetails({
          projectId: data.projectId,
        })
        const getLatestService = (projectData: any) => {
          if (
            !projectData?.services?.edges ||
            !Array.isArray(projectData.services.edges) ||
            projectData.services.edges.length === 0
          ) {
            console.error('No services found or invalid structure.')
            return null
          }

          const latestService = projectData.services.edges.reduce(
            (
              latest: { node: { createdAt: string | number | Date } },
              current: { node: { createdAt: string | number | Date } },
            ) => {
              const latestCreatedAt = new Date(latest.node.createdAt).getTime()
              const currentCreatedAt = new Date(
                current.node.createdAt,
              ).getTime()
              return currentCreatedAt > latestCreatedAt ? current : latest
            },
          )

          return latestService.node
        }
        const githubService = getLatestService(services)

        const serviceDomain = await createServiceDomain({
          environmentId: data.environmentId,
          serviceId: githubService?.id,
        })

        if (service.addStartCommand) {
          await serviceInstanceUpdate({
            environmentId: data.environmentId,
            input: { startCommand: service.startCommand! },
            serviceId: githubService.id,
          })
        }

        await upsertVariables({
          projectId: data.projectId,
          serviceId: githubService.id,
          environmentId: data.environmentId,
          variables: Object.fromEntries(
            Object.entries(service.environmentVariables || {}).map(
              ([key, value]) => [key, String(value)],
            ),
          ),
        })

        const updatedService = await updateServiceDetails({
          id: githubService?.id,
          input: {
            icon: (service?.icon as Media)?.url || '',
            name: service.name!,
          },
        })

        return githubService
      }

      // Main logic for iterating over services
      async function deployServices(template: Template, data: any) {
        if (!template?.services?.length) return
        for (const service of template.services) {
          let serviceDetails

          sendMessageToClient(
            clientId,
            JSON.stringify({
              process: 'CREATE_PROJECT',
              status: 'PENDING',
              step: `Create ${service?.name} service  `,
              message: `Started creating ${service?.name} service`,
            }),
          )

          if (service.type === 'database') {
            serviceDetails = await handleDatabaseService(service, data)
          } else if (service.type === 'docker') {
            serviceDetails = await handleDockerService(service, data)
          } else if (service.type === 'github') {
            serviceDetails = await handleGithubService(service, data)
          }
          // Create volume after successful deployment
          await createVolume({
            mountPath: `/var/lib/${service.type}/${service.name}`,
            environmentId: data.environmentId,
            projectId: data.projectId,
            serviceId: serviceDetails?.id,
          })

          const payloadService = await payload.create({
            collection: 'services',
            data: {
              serviceName: serviceDetails?.name,
              icon: serviceDetails?.icon,
              serviceId: serviceDetails?.id,
              projectId: serviceDetails?.projectId,
              environmentId: data?.environmentId,
              project: data?.id,
            },
          })
          // Wait for deployment to complete
          if (serviceDetails) {
            await waitForDeploymentSuccess(payloadService?.id)
          }

          sendMessageToClient(
            clientId,
            JSON.stringify({
              process: 'CREATE_PROJECT',
              status: 'SUCCESS',
              step: `Create ${service?.name} service`,
              message: `${service?.name} created successfully`,
            }),
          )
        }
      }

      // Deploy service
      await deployServices(template, data)
    } catch (error) {
      sendMessageToClient(
        clientId,
        JSON.stringify({
          process: 'CREATE_PROJECT',
          status: 'ERROR',
          step: 'Error',
          message: 'An error occurred during project creation.',
        }),
      )

      sendMessageToClient(
        clientId,
        JSON.stringify({
          process: 'CREATE_PROJECT',
          status: 'PENDING',
          step: 'Rolling back due to an error, please try again!',
          message:
            'Initiating rollback due to an error during project creation.',
        }),
      )

      if (data?.projectId) {
        await deleteProject({ projectId: data.projectId })
      }

      sendMessageToClient(
        clientId,
        JSON.stringify({
          process: 'CREATE_PROJECT',
          status: 'SUCCESS',
          step: 'Rolling back due to an error, please try again!',
          message:
            'Rollback was successful. You can now try creating the project again.',
        }),
      )

      console.log('Error while deploying template', error)
      throw error
    }
  }
}
