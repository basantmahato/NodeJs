import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// api interceptors

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') // or cookies

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// error handling

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // No response back — server offline / CORS / network issue
    if (!error.response) {
      console.error("Network error or server down")
      return Promise.reject({
        message: "Network error. Check server."
      })
    }

    const status = error.response.status

    // Unauthorized → token expired or invalid
    if (status === 401) {
      console.warn("Token expired or unauthorized")

      // Optional auto logout
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

    // Forbidden
    if (status === 403) {
      console.warn("Access denied")
    }

    // Server errors
    if (status >= 500) {
      console.error("Server error:", error.response.data?.message)
    }

    // Return readable error
    return Promise.reject(error.response.data || { message: "Error occurred" })
  }
)

export default api
