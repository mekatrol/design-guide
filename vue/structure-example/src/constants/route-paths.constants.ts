export const ROUTE_PATHS = {
  ABOUT: '/about',
  DASHBOARD: '/dashboard',
  HOME: '/',
  NOT_FOUND: '/:pathMatch(.*)*',
  USERS: '/users',
  USER_DETAILS: '/users/:id'
} as const;
