export const DELETE_PROJECT = `
    mutation ProjectDelete($id: String!) {
        projectDelete(id: $id)
    }
`
