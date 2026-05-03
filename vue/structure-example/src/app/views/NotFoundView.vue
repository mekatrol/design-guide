<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';

import { ROUTE_NAMES } from '@/constants/route-names.constants';

const route = useRoute();
</script>

<template>
  <section class="not-found-view">
    <p class="eyebrow">404</p>
    <h2>Page Not Found</h2>
    <p>
      No route matched <code>{{ route.fullPath }}</code
      >.
    </p>
    <RouterLink :to="{ name: ROUTE_NAMES.DASHBOARD }">Go to dashboard</RouterLink>
  </section>
</template>

<style scoped>
.not-found-view {
  display: grid;
  gap: 0.65rem;
  max-width: 38rem;
}

.not-found-view h2 {
  margin: 0;
  font-size: 2rem;
}

.not-found-view p {
  margin: 0;
  color: #667064;
}

.not-found-view a {
  width: fit-content;
  color: #315a46;
  font-weight: 700;
}

.eyebrow {
  color: #a24634;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

code {
  color: #202421;
  font-weight: 700;
}
</style>
