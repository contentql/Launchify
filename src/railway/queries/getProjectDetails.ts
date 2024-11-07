export const GET_PROJECT_DETAILS = `
   query GetProjectById($id: String!) {
    project(id: $id) {
        createdAt
        deletedAt
        description
        id
        name
        teamId
        updatedAt
        services {
            edges {
                node {
                    createdAt
                    deletedAt
                    icon
                    id
                    name
                    projectId
                    templateThreadSlug
                    updatedAt
                    deployments {
                        edges {
                            node {
                                canRedeploy
                                canRollback
                                createdAt
                                environmentId
                                id
                                meta
                                projectId
                                serviceId
                                snapshotId
                                staticUrl
                                status
                                suggestAddServiceDomain
                                updatedAt
                                url
                            }
                        }
                    }
                    serviceInstances {
                        edges {
                            node {
                                domains {
                                    customDomains {
                                        createdAt
                                        deletedAt
                                        domain
                                        environmentId
                                        id
                                        projectId
                                        serviceId
                                        targetPort
                                        updatedAt
                                    }
                                    serviceDomains {
                                        createdAt
                                        deletedAt
                                        domain
                                        environmentId
                                        id
                                        projectId
                                        serviceId
                                        suffix
                                        targetPort
                                        updatedAt
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
`
