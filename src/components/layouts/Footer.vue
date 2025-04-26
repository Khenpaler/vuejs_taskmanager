<template>
  <footer 
    :class="[
      'bg-gray-800 text-white py-4 fixed bottom-0 left-0 right-0 transition-transform duration-300 shadow-lg',
      showFooter ? 'translate-y-0' : 'translate-y-full'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <p>&copy; {{ new Date().getFullYear() }} Task Manager. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showFooter = ref(true) // Default to visible
let lastScrollY = 0
let ticking = false

const updateFooterVisibility = () => {
  // Get page and viewport heights
  const pageHeight = document.documentElement.scrollHeight
  const viewportHeight = window.innerHeight
  
  // If page is shorter or same as viewport, always show footer
  if (pageHeight <= viewportHeight) {
    showFooter.value = true
  } else {
    // On longer pages, show when scrolled down at least 100px
    showFooter.value = window.scrollY > 100 || window.scrollY + viewportHeight >= pageHeight - 50
  }
  
  // Reset ticking flag
  ticking = false
}

const onScroll = () => {
  lastScrollY = window.scrollY
  
  // Use requestAnimationFrame for better performance
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateFooterVisibility()
    })
    ticking = true
  }
}

// Set up scroll listener when component mounts
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', updateFooterVisibility, { passive: true })
  
  // Check initial position
  updateFooterVisibility()
})

// Remove scroll listener when component unmounts
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', updateFooterVisibility)
})
</script>