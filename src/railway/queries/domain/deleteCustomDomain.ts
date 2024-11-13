export const DELETE_CUSTOM_DOMAIN = `
    mutation CustomDomainDelete($id: String!) {
        customDomainDelete(id: $id)
    }
`
