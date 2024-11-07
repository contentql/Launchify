import { env } from '@env'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { railwayAPIAxiosInstance } from '@/utils/railwayAPIAxiosInstance'

interface RailwayAPIOptions {
  query?: string
  variables?: Record<string, any>
  config?: AxiosRequestConfig
  authType?: 'TEAM' | 'PERSONAL'
}

/**
 * A function to make GraphQL requests using Axios.
 *
 * @template T - The type of the response data.
 * @param {RailwayAPIOptions} options - The options for the GraphQL request.
 * @param {string} [options.query=''] - The GraphQL query string.
 * @param {Record<string, any>} [options.variables={}] - Optional variables for the GraphQL query.
 * @param {AxiosRequestConfig} [options.config={}] - Optional Axios request configuration options (headers, etc.).
 * @param {string} [options.authType='updateProject'] - The type of authorization required for the request ('createProject' or 'updateProject').
 * @returns {Promise<T>} - A promise that resolves to the response data.
 *
 * @throws {Error} - Throws an error if the request fails, with the error message logged to the console.
 */
export const railwayAPI = async <T = any>({
  query = '',
  variables = {},
  config = {},
  authType = 'TEAM',
}: RailwayAPIOptions): Promise<T> => {
  try {
    // Prepare the request body for a GraphQL request.
    const requestBody = {
      query,
      variables,
    }

    // Determine the authorization token based on the authType.
    const token =
      authType === 'TEAM'
        ? env.RAILWAY_TEAM_CQL_ACCESS_TOKEN
        : env.RAILWAY_PERSONAL_ACCESS_TOKEN

    // Merge headers from config with default headers.
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...config.headers,
    }

    // Make the HTTP request using the Axios instance and provided options.
    const response: AxiosResponse<T> = await railwayAPIAxiosInstance.post(
      '',
      requestBody,
      {
        ...config,
        headers,
      },
    )

    // Return only the response data.
    return response.data
  } catch (error: any) {
    // Log the error
    console.error(`Error during railway fetch:`, error)

    // Rethrow the error to allow further handling upstream.
    throw error
  }
}
