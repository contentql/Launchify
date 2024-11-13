export const REDEPLOY_SERVICE = `
    mutation ServiceInstanceRedeploy(
        $environmentId: String!
        $serviceId: String!
    ) {
        serviceInstanceRedeploy(environmentId: $environmentId, serviceId: $serviceId)
    }
`
