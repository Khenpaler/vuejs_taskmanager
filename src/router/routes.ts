import type { RouteRecordRaw } from 'vue-router'

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/loading',
    name: 'loading',
    component: () => import('../views/LoadingView.vue'),
    meta: {
      isLoading: true
    }
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('../views/auth/login/index.vue'),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('../views/auth/register/index.vue'),
    meta: {
      requiresGuest: true
    }
  }
]

export const protectedRoutes: RouteRecordRaw[] = [
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('../views/tasks/index.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/loading'
  },
  ...publicRoutes,
  ...protectedRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/NotFound.vue')
  }
]

export default routes 