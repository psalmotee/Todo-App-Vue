import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './views/HomePage.vue'
import TodoDetails from './views/TodoDetails.vue'
import NotFound from './views/NotFound.vue'

// Define routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/todos/:id',
    name: 'TodoDetails',
    component: TodoDetails,
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/not-found',
  },
]

// Create router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Create and mount the app
const app = createApp(App)
app.use(router)
app.mount('#app')
