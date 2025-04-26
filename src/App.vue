<script setup lang="ts">
import { onMounted, computed, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'

import { useAuthStore } from './stores/auth'

import DefaultLayout from './components/layouts/DefaultLayout.vue'

import { shouldSkipLoading } from './router/index'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Determine if current route is loading page
const isLoadingPage = computed(() => {
  return route.path === '/loading'
})

// Check if the current route is auth related
const isAuthRoute = computed(() => {
  return route.path.startsWith('/auth/')
})

// Watch for route changes to handle direct URL access better
watch(
  () => route.path,
  (newPath) => {
    console.log(`Route changed to: ${newPath}`)
  }
)

onMounted(() => {
  console.log('App mounted, current route:', route.path)
  
  // Use the new checkAuth method
  authStore.checkAuth()
  
  // Force navigation to loading page first, but respect cooldown
  if (route.path === '/') {
    if (shouldSkipLoading()) {
      // Skip loading if within cooldown period
      if (authStore.isAuthenticated) {
        router.replace('/tasks')
      } else {
        router.replace('/auth/login')
      }
    } else {
      router.replace('/loading')
    }
  }
})  
</script>

<template>
  <!-- For loading page, don't use any layout -->
  <template v-if="isLoadingPage">
    <RouterView v-slot="{ Component }">
      <Transition 
        name="fade"
        mode="out-in"
      >
        <component :is="Component" />
      </Transition>
    </RouterView>
  </template>
  
  <!-- For all other routes, use the DefaultLayout -->
  <template v-else>
    <DefaultLayout>
      <RouterView v-slot="{ Component, route }">
        <Transition 
          :name="isAuthRoute ? 'slide-fade-fixed' : 'fade'"
          mode="out-in"
        >
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </DefaultLayout>
  </template>
</template>