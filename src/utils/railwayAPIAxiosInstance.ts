import axios, { AxiosInstance } from 'axios'

// Creating an Axios instance with default configuration
export const railwayAPIAxiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://backboard.railway.app/graphql/v2',
  headers: {
    'Content-Type': 'application/json',
    // Add other custom default headers here
  },
})
