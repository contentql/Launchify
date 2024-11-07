export const CREATE_SERVICE_DOMAIN = `
   mutation ServiceDomainCreate($environmentId: String!
    $serviceId: String!) {
    serviceDomainCreate( 
        environmentId: $environmentId
        serviceId: $serviceId) {
        id
        domain
        environmentId
        serviceId
        suffix
        createdAt
        updatedAt
    }
}

`
