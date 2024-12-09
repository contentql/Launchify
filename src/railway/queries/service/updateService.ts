export const UPDATE_SERVICE = `
    mutation ServiceUpdate($id: String!, $input: ServiceUpdateInput!) {
        serviceUpdate(id: $id, input: $input) {
            createdAt
            deletedAt
            featureFlags
            icon
            id
            name
            projectId
            templateServiceId
            templateThreadSlug
            updatedAt
        }
    }
`
