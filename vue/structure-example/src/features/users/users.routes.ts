import type { RouteRecordRaw } from 'vue-router';

import { ROUTE_NAMES } from '@/constants/route-names.constants';
import { ROUTE_PATHS } from '@/constants/route-paths.constants';

export const usersRoutes: RouteRecordRaw[] = [
  {
    path: ROUTE_PATHS.USERS,
    name: ROUTE_NAMES.USERS,
    component: () => import('./views/UserListView.vue')
  },
  {
    path: ROUTE_PATHS.USER_DETAILS,
    name: ROUTE_NAMES.USER_DETAILS,
    component: () => import('./views/UserDetailsView.vue'),
    props: true
  }
];
