import type { RouteRecordRaw } from 'vue-router'

import { ROUTE_NAMES } from '@/constants/route-names.constants'

export const usersRoutes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: ROUTE_NAMES.USERS,
    component: () => import('./views/UserListView.vue'),
  },
  {
    path: '/users/:id',
    name: ROUTE_NAMES.USER_DETAILS,
    component: () => import('./views/UserDetailsView.vue'),
    props: true,
  },
]
