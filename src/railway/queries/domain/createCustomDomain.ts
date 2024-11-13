export const CREATE_CUSTOM_DOMAIN = `
    mutation CustomDomainCreate($input: CustomDomainCreateInput!) {
        customDomainCreate(input: $input) {
            id
            domain
            status {
                cdnProvider
                certificateStatus
                dnsRecords {
                    currentValue
                    fqdn
                    hostlabel
                    purpose
                    recordType
                    requiredValue
                    status
                    zone
                }
            }
        }
    }
`
