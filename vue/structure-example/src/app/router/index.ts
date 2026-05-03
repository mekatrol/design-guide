import { createRouter, createWebHistory } from 'vue-router';

import { routes } from '@/app/router/routes';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
