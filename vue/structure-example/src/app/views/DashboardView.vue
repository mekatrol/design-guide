<script setup lang="ts">
import { RouterLink } from 'vue-router';

import { ROUTE_NAMES } from '@/constants/route-names.constants';
import { useAppStore } from '@/stores/app.store';

const appStore = useAppStore();
</script>

<template>
  <section class="dashboard-view">
    <div>
      <p class="eyebrow">Default route target</p>
      <h2>Dashboard</h2>
      <p>The root path redirects here so the router example has a visible default destination.</p>
    </div>

    <section class="store-panel" aria-labelledby="store-panel-title">
      <div>
        <p class="eyebrow">Persisted Pinia store</p>
        <h3 id="store-panel-title">Workspace Context</h3>
        <p>
          Selected workspace and route visits are saved in localStorage and reused across routes.
        </p>
      </div>

      <div class="workspace-actions" aria-label="Workspace selector">
        <button
          v-for="workspace in appStore.workspaces"
          :key="workspace"
          :class="{ active: workspace === appStore.activeWorkspace }"
          type="button"
          @click="appStore.setActiveWorkspace(workspace)"
        >
          {{ workspace }}
        </button>
      </div>

      <p class="store-meta">{{ appStore.visitSummary }}</p>
    </section>

    <div class="route-grid" aria-label="Example routes">
      <RouterLink :to="{ name: ROUTE_NAMES.USERS }">
        <strong>Users</strong>
        <span>Feature-owned list route at /users.</span>
      </RouterLink>
      <RouterLink :to="{ name: ROUTE_NAMES.USER_DETAILS, params: { id: 1 } }">
        <strong>User Details</strong>
        <span>Parameterized route at /users/1.</span>
      </RouterLink>
      <RouterLink :to="{ name: ROUTE_NAMES.ABOUT }">
        <strong>About</strong>
        <span>App-level static page at /about.</span>
      </RouterLink>
      <RouterLink to="/missing-example">
        <strong>Not Found</strong>
        <span>Catch-all route for unknown paths.</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.dashboard-view {
  display: grid;
  gap: 1.25rem;
}

.dashboard-view h2 {
  margin: 0;
  font-size: 2rem;
}

.dashboard-view p {
  margin: 0.4rem 0 0;
  color: #667064;
}

.eyebrow {
  margin: 0 0 0.35rem;
  color: #315a46;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

.route-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}

.store-panel {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #d9ded4;
  border-radius: 8px;
  background: #ffffff;
}

.store-panel h3 {
  margin: 0;
  font-size: 1.15rem;
}

.workspace-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.workspace-actions button {
  min-height: 2.25rem;
  padding: 0 0.8rem;
  border: 1px solid #c9d1c3;
  border-radius: 999px;
  background: #ffffff;
  color: #315a46;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.workspace-actions button.active {
  border-color: #315a46;
  background: #315a46;
  color: #ffffff;
}

.store-meta {
  font-weight: 700;
}

.route-grid a {
  display: grid;
  gap: 0.35rem;
  min-height: 7rem;
  padding: 1rem;
  border: 1px solid #d9ded4;
  border-radius: 8px;
  background: #ffffff;
  color: inherit;
  text-decoration: none;
}

.route-grid strong {
  color: #315a46;
}

.route-grid span {
  color: #667064;
}
</style>
