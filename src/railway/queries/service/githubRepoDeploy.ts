export const GITHUB_REPO_DEPLOY = `
    mutation GithubRepoDeploy($input: GitHubRepoDeployInput!) {
        githubRepoDeploy(input: $input)
    }
`
