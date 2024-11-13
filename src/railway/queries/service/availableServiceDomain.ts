export const AVAILABLE_SERVICE_DOMAIN = `
    query ServiceDomainAvailable($domain: string!) {
        serviceDomainAvailable(domain: $domain) {
            available
            message
        }
    }
`
