export const GET_DOMAINS = `
    query Domains(
        $environmentId: String!
        $projectId: String!
        $serviceId: String!
    ) {
        domains(
            environmentId: $environmentId
            projectId: $projectId
            serviceId: $serviceId
        ) {
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
                cnameCheck {
                    link
                    message
                    status
                }
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
                    certificates {
                        domainNames
                        expiresAt
                        fingerprintSha256
                        issuedAt
                        keyType
                    }
                }
            }
        }
    }
`
