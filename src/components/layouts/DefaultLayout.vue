<template>
  <div class="min-h-screen flex flex-col bg-gray-50 font-sans antialiased text-gray-800">
    <AppHeader />

    <main class="flex-grow bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-6">
      <div class="container mx-auto px-4 pb-16">
        <router-view />
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './Header.vue'
import AppFooter from './Footer.vue'
</script> 