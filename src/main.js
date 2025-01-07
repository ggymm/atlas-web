import 'uno.css'
import '@/styles/reset.scss'
import '@/styles/global.scss'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'

import { setupRouter } from '@/router'

import { setupNaiveDiscreteApi } from '@/setup'

import App from './app.vue'

function setupApp() {
  const app = createApp(App)

  setupRouter(app)
  setupNaiveDiscreteApi()

  app.mount('#app')
}

setupApp()
