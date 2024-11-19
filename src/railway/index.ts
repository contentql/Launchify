import { railwayAPI } from '@/utils/railwayAPI'
import { TEAM_ID, TEMPLATE_ID } from '@/utils/railwayConstants'

import { CREATE_SERVICE_DOMAIN } from './queries/createServiceDomain'
import { CREATE_CUSTOM_DOMAIN } from './queries/domain/createCustomDomain'
import { DELETE_CUSTOM_DOMAIN } from './queries/domain/deleteCustomDomain'
import { GET_DOMAINS } from './queries/domain/getDomains'
import { GET_PROJECT_DETAILS } from './queries/getProjectDetails'
import { GET_SERVICE_DOMAINS } from './queries/getServiceDomains'
import { CREATE_EMPTY_PROJECT } from './queries/project/createEmptyProject'
import { DELETE_PROJECT } from './queries/project/deleteProject'
import { REDEPLOY_SERVICE } from './queries/service/redeployService'
import { TEMPLATE_DEPLOY } from './queries/templateDeploy'
import { DELETE_VARIABLE } from './queries/variables/deleteVariable'
import { GET_VARIABLES } from './queries/variables/getVariables'
import { UPSERT_VARIABLES } from './queries/variables/upsertVariables'
import { CREATE_WEBHOOK } from './queries/webhook/createWebhook'
import {
  CreateCustomDomainType,
  CreateEmptyProjectType,
  CreateServiceDomainType,
  CreateWebhookType,
  DeleteCustomDomainType,
  DeleteProjectType,
  DeleteVariableType,
  RedeployServiceType,
  TemplateDeployType,
  UpsertVariablesType,
  getServiceDomainsSchemaType,
  getVariablesSchemaType,
} from './validator'

export const createEmptyProject = async (input: CreateEmptyProjectType) => {
  const { projectName, projectDescription } = input

  const queryVariables = {
    input: {
      name: projectName,
      description: projectDescription,
      defaultEnvironmentName: 'production',
    },
  }

  try {
    const response = await railwayAPI({
      query: CREATE_EMPTY_PROJECT,
      variables: queryVariables,
    })

    return response.data.projectCreate
  } catch (error: any) {
    throw new Error('Error during creating empty project: ', error)
  }
}

export const templateDeploy = async (input: TemplateDeployType) => {
  const { environmentId, projectId } = input
  try {
    const queryVariables = {
      input: {
        projectId: projectId,
        environmentId: environmentId,
        templateId: TEMPLATE_ID,
        teamId: TEAM_ID,
        serializedConfig: {
          services: {
            '488d104a-7fa8-4007-82c2-23eb2a3c0af5': {
              icon: 'https://devicons.railway.app/i/mysql.svg',
              name: 'MySQL',
              build: {},
              deploy: {
                startCommand:
                  'docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0',
                healthcheckPath: null,
              },
              source: {
                image: 'mysql',
              },
              variables: {
                MYSQLHOST: {
                  isOptional: false,
                  description: 'Railway TCP Proxy Domain.',
                  defaultValue: '${{RAILWAY_TCP_PROXY_DOMAIN}}',
                },
                MYSQLPORT: {
                  isOptional: false,
                  description: 'MySQL TCP Proxy port.',
                  defaultValue: '${{RAILWAY_TCP_PROXY_PORT}}',
                },
                MYSQLUSER: {
                  isOptional: false,
                  description: 'MySQL user, used for the Data panel.',
                  defaultValue: 'root',
                },
                MYSQL_URL: {
                  isOptional: false,
                  description:
                    'URL to connect to MySQL DB, used for Data panel.',
                  defaultValue:
                    'mysql://${{ MYSQLUSER }}:${{ MYSQL_ROOT_PASSWORD }}@${{ RAILWAY_TCP_PROXY_DOMAIN }}:${{ RAILWAY_TCP_PROXY_PORT }}/${{ MYSQL_DATABASE }}',
                },
                MYSQLDATABASE: {
                  isOptional: false,
                  description: 'Default database, used for Data panel.',
                  defaultValue: '${{ MYSQL_DATABASE }}',
                },
                MYSQLPASSWORD: {
                  isOptional: false,
                  description: 'Root password, used for Data panel.',
                  defaultValue: '${{ MYSQL_ROOT_PASSWORD }}',
                },
                MYSQL_DATABASE: {
                  isOptional: false,
                  description: 'Database to be created on image startup.',
                  defaultValue: 'railway',
                },
                MYSQL_PRIVATE_URL: {
                  isOptional: false,
                  description:
                    'URL to connect to MySQL DB, used for Data panel.',
                  defaultValue:
                    'mysql://${{ MYSQLUSER }}:${{ MYSQL_ROOT_PASSWORD }}@${{ RAILWAY_PRIVATE_DOMAIN }}:3306/${{ MYSQL_DATABASE }}',
                },
                MYSQL_ROOT_PASSWORD: {
                  isOptional: false,
                  description: 'Root password for MySQL DB.',
                  defaultValue:
                    '${{ secret(32, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ") }}',
                },
              },
              networking: {
                tcpProxies: {
                  '3306': {},
                },
                serviceDomains: {},
              },
              volumeMounts: {
                '488d104a-7fa8-4007-82c2-23eb2a3c0af5': {
                  mountPath: '/var/lib/mysql',
                },
              },
            },
            '5944d643-ffdd-4738-8fb5-37043559cc9b': {
              name: 'Ghost',
              build: {},
              deploy: {},
              source: {
                image: 'ghost:alpine',
              },
              variables: {
                url: {
                  isOptional: true,
                  defaultValue: 'https://${{RAILWAY_STATIC_URL}}',
                },
                PORT: {
                  isOptional: true,
                  defaultValue: '2368',
                },
                mail__from: {
                  isOptional: true,
                  description: '',
                  defaultValue: '',
                },
                mail__transport: {
                  isOptional: true,
                  description: '',
                  defaultValue: 'SMTP',
                },
                database__client: {
                  isOptional: true,
                  defaultValue: 'mysql',
                },
                mail__options__host: {
                  isOptional: true,
                  description: '',
                  defaultValue: '',
                },
                mail__options__port: {
                  isOptional: true,
                  description: '',
                  defaultValue: '',
                },
                mail__options__auth__pass: {
                  isOptional: true,
                  description: '',
                  defaultValue: '',
                },
                mail__options__auth__user: {
                  isOptional: true,
                  description: '',
                  defaultValue: '',
                },
                database__connection__host: {
                  isOptional: true,
                  description: '',
                  defaultValue: '${{MySQL.MYSQLHOST}}',
                },
                database__connection__port: {
                  isOptional: true,
                  description: '',
                  defaultValue: '${{MySQL.MYSQLPORT}}',
                },
                database__connection__user: {
                  isOptional: true,
                  description: '',
                  defaultValue: '${{MySQL.MYSQLUSER}}',
                },
                database__connection__database: {
                  isOptional: true,
                  description: '',
                  defaultValue: '${{MySQL.MYSQLDATABASE}}',
                },
                database__connection__password: {
                  isOptional: true,
                  description: '',
                  defaultValue: '${{MySQL.MYSQLPASSWORD}}',
                },
              },
              networking: {
                tcpProxies: {},
                serviceDomains: {
                  '<hasDomain>': {},
                },
              },
              volumeMounts: {
                '5944d643-ffdd-4738-8fb5-37043559cc9b': {
                  mountPath: '/var/lib/ghost/content',
                },
              },
            },
          },
        },
      },
    }

    const response = await railwayAPI({
      query: TEMPLATE_DEPLOY,
      variables: queryVariables,
    })

    return response.data.templateDeployV2
  } catch (error: any) {
    throw new Error('Error during deploying a template: ', error)
  }
}

export const getProjectDetails = async (input: { projectId: string }) => {
  const { projectId } = input

  const queryVariables = {
    id: projectId,
  }

  try {
    const response = await railwayAPI({
      query: GET_PROJECT_DETAILS,
      variables: queryVariables,
    })

    return response.data.project
  } catch (error: any) {
    throw new Error('Error during getting project details: ', error)
  }
}

export const createServiceDomain = async (input: CreateServiceDomainType) => {
  const queryVariables = {
    input,
  }

  try {
    const response = await railwayAPI({
      query: CREATE_SERVICE_DOMAIN,
      variables: queryVariables?.input,
    })

    return response.data.serviceDomainCreate
  } catch (error: any) {
    throw new Error('Error during create service domain: ', error)
  }
}

export const getServiceDomains = async (input: getServiceDomainsSchemaType) => {
  const queryVariables = {
    input,
  }
  try {
    const response = await railwayAPI({
      query: GET_SERVICE_DOMAINS,
      variables: queryVariables?.input,
    })

    return response.data.domains?.serviceDomains
  } catch (error: any) {
    throw new Error('Error during getting domains: ', error)
  }
}

export const createCustomDomain = async (input: CreateCustomDomainType) => {
  const { projectId, serviceId, environmentId, domain } = input

  const queryVariables = {
    input: {
      projectId,
      serviceId,
      environmentId,
      domain,
    },
  }

  try {
    const response = await railwayAPI({
      query: CREATE_CUSTOM_DOMAIN,
      variables: queryVariables,
    })

    return response.data.customDomainCreate
  } catch (error: any) {
    throw new Error('Error during creating custom domain: ', error)
  }
}

export const createWebhook = async (input: CreateWebhookType) => {
  const { projectId, url } = input

  const queryVariables = {
    input: {
      projectId,
      url,
    },
  }

  try {
    const response = await railwayAPI({
      query: CREATE_WEBHOOK,
      variables: queryVariables,
      authType: 'PERSONAL',
    })

    return response.data.webhookCreate
  } catch (error: any) {
    throw new Error('Error during creating webhook: ', error)
  }
}

export const getVariables = async (input: getVariablesSchemaType) => {
  const queryVariables = {
    input,
  }
  try {
    const response = await railwayAPI({
      query: GET_VARIABLES,
      variables: queryVariables?.input,
    })

    return response.data
  } catch (error: any) {
    throw new Error('Error during getting domains: ', error)
  }
}

export const upsertVariables = async (input: UpsertVariablesType) => {
  const { projectId, serviceId, environmentId, variables } = input

  const queryVariables = {
    input: { projectId, serviceId, environmentId, variables },
  }

  try {
    const response = await railwayAPI({
      query: UPSERT_VARIABLES,
      variables: queryVariables,
    })

    return response.data.variableCollectionUpsert
  } catch (error: any) {
    throw new Error('Error during upsert variables: ', error)
  }
}

export const deleteVariable = async (input: DeleteVariableType) => {
  const { projectId, serviceId, environmentId, name } = input

  const queryVariables = {
    input: { projectId, serviceId, environmentId, name },
  }

  try {
    const response = await railwayAPI({
      query: DELETE_VARIABLE,
      variables: queryVariables,
    })

    return response.data.variableCollectionUpsert
  } catch (error: any) {
    throw new Error('Error during deleting variables: ', error)
  }
}

export const redeployService = async (input: RedeployServiceType) => {
  const { serviceId, environmentId } = input

  const queryVariables = {
    serviceId,
    environmentId,
  }

  try {
    const response = await railwayAPI({
      query: REDEPLOY_SERVICE,
      variables: queryVariables,
    })

    return response.data.serviceInstanceRedeploy
  } catch (error: any) {
    throw new Error('Error during redeploy service: ', error)
  }
}

export const getDomains = async (input: {
  projectId: string
  serviceId: string
  environmentId: string
}) => {
  const { projectId, serviceId, environmentId } = input

  try {
    const queryVariables = {
      projectId,
      serviceId,
      environmentId,
    }

    const domainsResponse = await railwayAPI({
      query: GET_DOMAINS,
      variables: queryVariables,
    })

    return domainsResponse?.data.domains
  } catch (error: any) {
    throw new Error('Error during getting valid domain: ', error)
  }
}

export const deleteCustomDomain = async (input: DeleteCustomDomainType) => {
  const { domainId } = input

  const queryVariables = {
    id: domainId,
  }

  try {
    const response = await railwayAPI({
      query: DELETE_CUSTOM_DOMAIN,
      variables: queryVariables,
    })

    return response.data.customDomainDelete
  } catch (error: any) {
    throw new Error('Error during deleting custom domain: ', error)
  }
}

export const deleteProject = async (input: DeleteProjectType) => {
  const { projectId } = input

  const queryVariables = {
    id: projectId,
  }

  try {
    const response = await railwayAPI({
      query: DELETE_PROJECT,
      variables: queryVariables,
    })

    return response.data.projectDelete
  } catch (error: any) {
    throw new Error('Error during deleting project: ', error)
  }
}
