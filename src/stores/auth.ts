import { ref, computed } from 'vue'

import { defineStore } from 'pinia'

import router from '@/router'

import type { UserData, Credentials, UserProfile } from '@/views/auth/types'

import { createApiClient } from './utils/createApiClient'

interface ApiError {
  [key: string]: string[] | string
}

export const useAuthStore = defineStore('auth', () => {
  // Initialize API client
  const apiClient = createApiClient()

  // State
  const user = ref<UserProfile | null>(null)
  const loading = ref(false)
  const error = ref<string | ApiError | null>(null)

  // Computed
  const isAuthenticated = computed(() => !!user.value)

  /**
   * Register a new user
   * @param userData - User registration data including username, email, and passwords
   * 
   * On success:
   * - Fetches the user profile
   * - Redirects to tasks page
   * @returns boolean indicating if registration was successful
   */
  async function register(userData: UserData): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/auth/register/', userData)
      // Save token to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      await fetchUserProfile()
      router.push('/tasks')
      return true
    } catch (err: any) {
      error.value = err.response?.data || 'Registration failed'
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Log in an existing user
   * @param credentials - User login credentials (username and password)
   * 
   * On success:
   * - Fetches the user profile
   * - Redirects to tasks page
   * 
   * On failure:
   * - Sets appropriate error message
   * @returns boolean indicating if login was successful
   */
  async function login(credentials: Credentials): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      console.log('Attempting login...')
      const response = await apiClient.post('/auth/login/', credentials)
      console.log('Login successful, fetching profile...')
      
      // Save token to localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
      }
      
      await fetchUserProfile()
      console.log('Profile fetched, redirecting...')
      
      // Ensure we're authenticated before redirecting
      if (isAuthenticated.value) {
        await router.push('/tasks')
        return true
      } else {
        throw new Error('Authentication failed after successful login')
      }
    } catch (err: any) {
      console.error('Login error:', err)
      error.value = err.response?.data || err.message || 'Login failed'
      // Clear user state on error
      user.value = null
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Log out the current user
   * 
   * - Attempts to logout on the server
   * - Clears local authentication state
   * - Redirects to login page
   * - Continues with local logout even if server logout fails
   */
  async function logout() {
    loading.value = true
    try {
      await apiClient.post('/auth/logout/')
    } catch (err: any) {
      console.error('Logout error:', err)
    } finally {
      // Clear token from localStorage
      localStorage.removeItem('token')
      user.value = null
      loading.value = false
      router.push('/auth/login')
    }
  }

  /**
   * Fetch the current user's profile
   * 
   * - Called after login/registration
   * - Updates the user state with profile information
   * - Handles unauthorized errors by clearing auth state
   * 
   * @throws Error if request fails
   */
  async function fetchUserProfile() {
    loading.value = true
    try {
      console.log('Fetching user profile...')
      const response = await apiClient.get('/auth/profile/')
      console.log('Profile response:', response.data)
      user.value = response.data
    } catch (err: any) {
      console.error('Error fetching user profile:', err)
      // If unauthorized, clear auth
      if (err.response?.status === 401) {
        console.log('Unauthorized, clearing auth state')
        localStorage.removeItem('token')
        user.value = null
        router.push('/auth/login')
      }
      throw err // Propagate error to calling function
    } finally {
      loading.value = false
    }
  }

  // Initialize user state from localStorage token
  function checkAuth() {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUserProfile().catch(err => {
        console.error('Failed to restore session:', err)
        localStorage.removeItem('token')
      })
    }
  }

  return { 
    user,
    isAuthenticated, 
    loading, 
    error, 
    register, 
    login, 
    logout, 
    fetchUserProfile,
    checkAuth
  }
}) 