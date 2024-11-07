export const CREATE_WEBHOOK = `
    mutation WebhookCreate($input: WebhookCreateInput!) {
        webhookCreate(input: $input) {
            id
            lastStatus
            projectId
            url
        }
    }
`
