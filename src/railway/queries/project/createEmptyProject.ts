export const CREATE_EMPTY_PROJECT = `
    mutation ProjectCreate($input: ProjectCreateInput!) {
        projectCreate(input: $input) {
            id
            name
            description
            teamId
            environments {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
    }
`
