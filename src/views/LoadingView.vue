<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
      <h2 class="text-xl font-semibold text-gray-700">{{ loadingMessage }}</h2>
      <p class="text-gray-500 mt-2">{{ subMessage }}</p>
      <div v-if="showProgress" class="mt-4 w-64 mx-auto">
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full bg-blue-600 transition-all duration-300 ease-out" 
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// State
const loadingMessage = ref('Loading...')
const subMessage = ref('Please wait while we set things up')
const showProgress = ref(true)
const progress = ref(0)
const loadingTime = 2000 // 2 seconds timeout

// Handle loading timeout and redirect
onMounted(() => {
  console.log('Loading page mounted...')
  
  // Record that loading screen was shown
  localStorage.setItem('lastLoadingTime', Date.now().toString())
  
  const startTime = Date.now()
  
  // Update progress bar
  const progressInterval = setInterval(() => {
    const elapsed = Date.now() - startTime
    progress.value = Math.min(Math.floor((elapsed / loadingTime) * 100), 99)
  }, 50)
  
  // Redirect after timeout
  setTimeout(() => {
    clearInterval(progressInterval)
    progress.value = 100
    loadingMessage.value = 'Ready!'
    subMessage.value = 'Redirecting you now...'
    
    // Redirect based on authentication status
    setTimeout(() => {
      console.log('Redirecting after loading, auth status:', authStore.isAuthenticated)
      if (authStore.isAuthenticated) {
        router.replace('/tasks')
      } else {
        router.replace('/auth/login')
      }
    }, 500) // Short delay before redirect after progress completes
  }, loadingTime)
})
</script> 