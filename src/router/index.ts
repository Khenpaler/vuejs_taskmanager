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

// Create router instance with proper configuration
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Improve handling of navigation failures
  strict: false,
  // Modify scrolling behavior 
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Handle errors
router.onError((error) => {
  console.error('Router error:', error)
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  console.log(`Route navigation: ${from.path} -> ${to.path}`)
  
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
        next({ path: '/tasks', replace: true })
      } else {
        next({ path: '/auth/login', replace: true })
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
        next({ path: '/tasks', replace: true })
      } else {
        next({ path: '/auth/login', replace: true })
      }
      return
    } else {
      next({ path: '/loading', replace: true })
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
      next({ path: '/auth/login', replace: true })
      return
    }
  }

  // Get updated auth status after potential profile fetch
  const updatedAuthStatus = authStore.isAuthenticated

  // Handle protected routes - redirect to login if not authenticated
  if (to.meta.requiresAuth && !updatedAuthStatus) {
    console.log('Protected route accessed without auth, redirecting to login')
    next({ path: '/auth/login', replace: true })
    return
  }

  // Handle guest-only routes (login/register) - redirect to tasks if authenticated
  if (to.meta.requiresGuest && updatedAuthStatus) {
    console.log('Guest route accessed while authenticated, redirecting to tasks')
    next({ path: '/tasks', replace: true })
    return
  }

  // For all other routes, proceed
  next()
})

// After each navigation
router.afterEach((to, from) => {
  // Update title
  document.title = to.meta.title 
    ? `${to.meta.title} | Task Manager` 
    : 'Task Manager'
})

export default router
