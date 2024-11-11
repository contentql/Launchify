export const GET_VARIABLES = `
query GetVariables(
    $environmentId: String!
    $projectId: String!
    $serviceId: String!
) {
    variables(
        environmentId: $environmentId
        projectId: $projectId
        serviceId: $serviceId
    )
}
`
