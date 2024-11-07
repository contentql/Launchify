export const TEMPLATE_DEPLOY = `
    mutation templateDeployV2($input: TemplateDeployV2Input!) {
    templateDeployV2(input: $input) {
        projectId
        workflowId
    }
}
`
