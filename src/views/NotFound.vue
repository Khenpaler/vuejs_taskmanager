<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
    <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
    <p class="text-xl text-gray-600 mb-8">Page Not Found</p>
    <p class="text-gray-500 mb-8">The page you are looking for doesn't exist or has been moved.</p>
    <router-link 
      to="/" 
      class="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
    >
      Go Home
    </router-link>
  </div>
</template>

<script setup lang="ts">
// No script needed for this component
</script> 