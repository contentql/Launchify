import { railwayAPI } from '@/utils/railwayAPI'

import { CREATE_SERVICE_DOMAIN } from './queries/createServiceDomain'
import { CREATE_CUSTOM_DOMAIN } from './queries/domain/createCustomDomain'
import { DELETE_CUSTOM_DOMAIN } from './queries/domain/deleteCustomDomain'
import { GET_DOMAINS } from './queries/domain/getDomains'
import { GET_PROJECT_DETAILS } from './queries/getProjectDetails'
import { GET_SERVICE_DOMAINS } from './queries/getServiceDomains'
import { CREATE_EMPTY_PROJECT } from './queries/project/createEmptyProject'
import { DELETE_PROJECT } from './queries/project/deleteProject'
import { REDEPLOY_SERVICE } from './queries/service/redeployService'
import { getQueryVariables } from './queries/template/queryVariables'
import { TEMPLATE_DEPLOY } from './queries/template/templateDeploy'
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
  const { environmentId, projectId, template } = input
  try {
    const queryVariables = getQueryVariables({
      environmentId,
      projectId,
      template,
    })

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
