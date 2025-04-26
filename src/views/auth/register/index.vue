<template>
  <div class="w-full max-w-md mx-auto">
    <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h1>
      
      <div v-if="authStore.error" class="mb-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
        <p>{{ typeof authStore.error === 'string' ? authStore.error : Object.values(authStore.error).flat().join(', ') }}</p>
      </div>
      
      <form @submit.prevent="register" class="space-y-5">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <div class="relative">
            <input 
              id="username" 
              v-model="formData.username" 
              type="text" 
              required
              :disabled="authStore.loading"
              class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Choose a username"
            >
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div class="relative">
            <input 
              id="email" 
              v-model="formData.email" 
              type="email" 
              required
              :disabled="authStore.loading"
              class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Your email address"
            >
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="first-name" class="block text-sm font-medium text-gray-700 mb-1">First name</label>
            <input 
              id="first-name" 
              v-model="formData.first_name" 
              type="text" 
              required
              :disabled="authStore.loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="First name"
            >
          </div>
          
          <div>
            <label for="last-name" class="block text-sm font-medium text-gray-700 mb-1">Last name</label>
            <input 
              id="last-name" 
              v-model="formData.last_name" 
              type="text" 
              required
              :disabled="authStore.loading"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Last name"
            >
          </div>
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div class="relative">
            <input 
              id="password" 
              v-model="formData.password" 
              type="password" 
              required
              :disabled="authStore.loading"
              class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Create a password"
            >
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div class="relative">
            <input 
              id="confirm-password" 
              v-model="formData.confirmPassword" 
              type="password" 
              required
              :disabled="authStore.loading"
              class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Confirm your password"
            >
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <p v-if="passwordMismatch" class="mt-1 text-sm text-red-600">Passwords do not match</p>
        </div>
        
        <button 
          type="submit" 
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-md"
          :disabled="authStore.loading || passwordMismatch"
        >
          <span v-if="authStore.loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating account...
          </span>
          <span v-else>Create Account</span>
        </button>
      </form>
      
      <div class="mt-6 text-center text-sm text-gray-600">
        Already have an account? <router-link :to="{ name: 'login' }" class="text-blue-600 hover:text-blue-800 font-medium transition-colors">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const toast = useToast()

const formData = ref({
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  confirmPassword: ''
})

const passwordMismatch = computed(() => {
  return formData.value.password && 
         formData.value.confirmPassword && 
         formData.value.password !== formData.value.confirmPassword
})

const register = async () => {
  if (passwordMismatch.value) {
    toast.error('Passwords do not match')
    return
  }
  
  try {
    const success = await authStore.register({
      username: formData.value.username,
      email: formData.value.email,
      first_name: formData.value.first_name,
      last_name: formData.value.last_name,
      password: formData.value.password,
      password2: formData.value.confirmPassword
    })
    
    // Only show success toast if registration was successful
    if (success) {
      toast.success('Account created successfully')
    }
  } catch (error) {
    toast.error(typeof authStore.error === 'string' 
      ? authStore.error 
      : Object.values(authStore.error || {}).flat().join(', ') || 'Registration failed')
  }
}
</script>

<style scoped>
/* Animation for page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 