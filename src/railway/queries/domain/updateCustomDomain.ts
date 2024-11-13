export const UPDATE_CUSTOM_DOMAIN = `
    mutation CustomDomainUpdate($environmentId: String!, $id: String!) {
        customDomainUpdate(environmentId: $environmentId, id: $id)
    }
`
