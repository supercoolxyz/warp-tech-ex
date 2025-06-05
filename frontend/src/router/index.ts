import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

/**

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }
]


*/
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user-stories',
    name: 'user-stories',
    component: () => import('../views/Scrum/UserStoryView.vue')
  },
  {
    path: '/milestones',
    name: 'milestones',
    component: () => import('@/views/Scrum/MilestoneView.vue')
  },
  {
    path: '/actors',
    name: 'actors',
    component: () => import('@/views/Scrum/ScrumActorsView.vue')
  },  
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
