import type { RouteRecordRaw } from 'vue-router'

import { ROUTE_NAMES } from '@/constants/route-names.constants'
import { ROUTE_PATHS } from '@/constants/route-paths.constants'
import { usersRoutes } from '@/features/users/users.routes'

export const routes: RouteRecordRaw[] = [
  {
    path: ROUTE_PATHS.HOME,
    name: ROUTE_NAMES.HOME,
    redirect: { name: ROUTE_NAMES.DASHBOARD },
  },
  {
    path: ROUTE_PATHS.DASHBOARD,
    name: ROUTE_NAMES.DASHBOARD,
    component: () => import('@/app/views/DashboardView.vue'),
  },
  {
    path: ROUTE_PATHS.ABOUT,
    name: ROUTE_NAMES.ABOUT,
    component: () => import('@/app/views/AboutView.vue'),
  },
  ...usersRoutes,
  {
    path: ROUTE_PATHS.NOT_FOUND,
    name: ROUTE_NAMES.NOT_FOUND,
    component: () => import('@/app/views/NotFoundView.vue'),
  },
]
