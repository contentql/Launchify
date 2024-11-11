export const UPSERT_VARIABLES = `
    mutation VariableCollectionUpsert($input: VariableCollectionUpsertInput!) {
        variableCollectionUpsert(input: $input)
    }
`
