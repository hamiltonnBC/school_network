import axios from 'axios'

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor for adding auth tokens (when implemented)
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token when available
    // const token = localStorage.getItem('authToken')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access')
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error:', error.response.data)
    }
    return Promise.reject(error)
  }
)