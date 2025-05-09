import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

// Toast configuration
const toastOptions = {
  position: 'top-right',
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}

app.use(pinia)
app.use(router)
app.use(Toast, toastOptions)

// Mount the app
app.mount('#app')

// Handle initial path from refresh
const initialPath = sessionStorage.getItem('initialPath')
if (initialPath) {
  console.log('Restoring initial path:', initialPath)
  // Remove the stored path immediately to prevent redirect loops
  sessionStorage.removeItem('initialPath')
  
  // Small delay to ensure app is fully mounted
  setTimeout(() => {
    console.log('Navigating to restored path:', initialPath)
    router.push({
      path: initialPath,
      replace: true
    }).catch(err => {
      console.error('Error restoring path:', err)
    })
  }, 100) 
}
