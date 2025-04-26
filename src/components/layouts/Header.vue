<template>
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <nav class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2 text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>Task Manager</span>
          </router-link>
        </div>
        <div class="flex items-center space-x-4">
          <template v-if="authStore.isAuthenticated">
            <div class="relative">
              <button 
                @click="isDropdownOpen = !isDropdownOpen" 
                class="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <span class="font-semibold">{{ authStore.user?.username }}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  class="h-5 w-5 transition-transform" 
                  :class="{ 'rotate-180': isDropdownOpen }"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <!-- Dropdown Menu -->
              <div 
                v-if="isDropdownOpen" 
                class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200 overflow-hidden"
              >
                <div class="px-4 py-3 text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                  Signed in as <span class="block font-medium text-gray-900 mt-0.5">{{ authStore.user?.username }}</span>
                </div>
                <button 
                  @click="logout" 
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'

const authStore = useAuthStore()
const toast = useToast()
const isDropdownOpen = ref(false)

const logout = async () => {
  try {
    await authStore.logout()
    isDropdownOpen.value = false
    toast.success('Logged out successfully')
  } catch (error) {
    toast.error('Failed to logout')
  }
}
</script> 