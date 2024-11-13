export const AVAILABLE_CUSTOM_DOMAIN = `
    query CustomDomainAvailable($domain: String!) {
        customDomainAvailable(domain: $domain) {
            available
            message
        }
    }
`
