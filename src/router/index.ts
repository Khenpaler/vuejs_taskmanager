import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import routes from './routes'

// Loading page cooldown duration in milliseconds (12 hours)
export const LOADING_COOLDOWN = 12 * 60 * 60 * 1000

// Check if loading page should be shown or skipped
export const shouldSkipLoading = () => {
  const lastLoadingTime = localStorage.getItem('lastLoadingTime')
  
  if (!lastLoadingTime) {
    return false // First visit, should show loading
  }
  
  const timeElapsed = Date.now() - parseInt(lastLoadingTime)
  return timeElapsed < LOADING_COOLDOWN // Skip if within cooldown period
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  // Check for token in localStorage to determine auth status
  const hasToken = !!localStorage.getItem('token')
  const isAuthenticated = authStore.isAuthenticated
  
  // Handle loading page with cooldown
  if (to.meta.isLoading) {
    // Check if we should skip loading page
    if (shouldSkipLoading()) {
      // Redirect based on auth status
      if (isAuthenticated || hasToken) {
        next('/tasks')
      } else {
        next('/auth/login')
      }
      return
    }
    
    next()
    return
  }

  // Handle root path redirect
  if (to.path === '/') {
    // Skip loading if within cooldown period
    if (shouldSkipLoading()) {
      // Redirect based on auth status
      if (isAuthenticated || hasToken) {
        next('/tasks')
      } else {
        next('/auth/login')
      }
      return
    } else {
      next('/loading')
      return
    }
  }

  // If there's a token but user isn't loaded yet, try to load profile
  if (hasToken && !isAuthenticated) {
    try {
      await authStore.fetchUserProfile()
    } catch (error) {
      // Token is invalid, redirect to login
      localStorage.removeItem('token')
      next('/auth/login')
      return
    }
  }

  // Get updated auth status after potential profile fetch
  const updatedAuthStatus = authStore.isAuthenticated

  // Handle protected routes - redirect to login if not authenticated
  if (to.meta.requiresAuth && !updatedAuthStatus) {
    console.log('Protected route accessed without auth, redirecting to login')
    next('/auth/login')
    return
  }

  // Handle guest-only routes (login/register) - redirect to tasks if authenticated
  if (to.meta.requiresGuest && updatedAuthStatus) {
    console.log('Guest route accessed while authenticated, redirecting to tasks')
    next('/tasks')
    return
  }

  // For all other routes, proceed
  next()
})

export default router
