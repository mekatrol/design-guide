import type { RouteRecordRaw } from 'vue-router'

import { ROUTE_NAMES } from '@/constants/route-names.constants'
import { usersRoutes } from '@/features/users/users.routes'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    redirect: { name: ROUTE_NAMES.DASHBOARD },
  },
  {
    path: '/dashboard',
    name: ROUTE_NAMES.DASHBOARD,
    component: () => import('@/app/views/DashboardView.vue'),
  },
  {
    path: '/about',
    name: ROUTE_NAMES.ABOUT,
    component: () => import('@/app/views/AboutView.vue'),
  },
  ...usersRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: ROUTE_NAMES.NOT_FOUND,
    component: () => import('@/app/views/NotFoundView.vue'),
  },
]
