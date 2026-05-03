<template>
  <div class="app-shell">
    <header class="app-header">
      <div>
        <p class="eyebrow">{{ appStore.activeWorkspace }}</p>
        <h1>{{ appStore.productName }}</h1>
      </div>

      <nav aria-label="Primary navigation">
        <RouterLink :to="{ name: ROUTE_NAMES.DASHBOARD }">Dashboard</RouterLink>
        <RouterLink :to="{ name: ROUTE_NAMES.USERS }">Users</RouterLink>
        <RouterLink :to="{ name: ROUTE_NAMES.ABOUT }">About</RouterLink>
      </nav>
    </header>

    <main class="app-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import { ROUTE_NAMES } from '@/constants/route-names.constants';
import { useAppStore } from '@/stores/app.store';

const appStore = useAppStore();
const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    appStore.recordRouteVisit();
  },
  { immediate: true }
);
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: #f7f8f5;
  color: #202421;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem clamp(1rem, 4vw, 3rem);
  border-bottom: 1px solid #d9ded4;
  background: #ffffff;
}

.app-header h1 {
  margin: 0;
  font-size: 1.35rem;
}

.eyebrow {
  margin: 0 0 0.25rem;
  color: #667064;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

.app-header a {
  color: #315a46;
  font-weight: 700;
  text-decoration: none;
}

.app-header nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  justify-content: flex-end;
}

.app-header a.router-link-active {
  text-decoration: underline;
  text-underline-offset: 0.25rem;
}

.app-main {
  width: min(1120px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 2rem 0;
}
</style>
