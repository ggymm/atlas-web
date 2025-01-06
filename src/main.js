import 'uno.css'
import '@/styles/reset.css'
import '@/styles/global.scss'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'

import { setupRouter } from '@/router'

import { setupNaiveDiscreteApi } from '@/setup'

import App from './app.vue'

async function setupApp() {
  const app = createApp(App)

  await setupRouter(app)
  setupNaiveDiscreteApi()

  app.mount('#app')
}

setupApp().then(() => {
  console.log('App setup done!')
})
