import { createRouter, createWebHistory } from 'vue-router'

import { setupRouterGuard } from './guard'
import { basicRoutes } from './routes/index.js'

export const router = createRouter({
  history: createWebHistory('/'),
  routes: basicRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export async function setupRouter(app) {
  setupRouterGuard(router)
  app.use(router)
}
