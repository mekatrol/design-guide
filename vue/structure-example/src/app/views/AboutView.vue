<script setup lang="ts">
import { useAppStore } from '@/stores/app.store';

const appStore = useAppStore();
</script>

<template>
  <section class="content-view">
    <p class="eyebrow">App route</p>
    <h2>About This Example</h2>
    <p>
      This page lives under <code>src/app/views</code> because it belongs to the application shell,
      not to a single feature folder.
    </p>
    <p>
      Current workspace: <strong>{{ appStore.activeWorkspace }}</strong
      >. {{ appStore.visitSummary }}.
    </p>
  </section>
</template>

<style scoped>
.content-view {
  display: grid;
  gap: 0.5rem;
  max-width: 44rem;
}

.content-view h2 {
  margin: 0;
  font-size: 2rem;
}

.content-view p {
  margin: 0;
  color: #667064;
  line-height: 1.6;
}

.eyebrow {
  color: #315a46;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

code {
  color: #202421;
  font-weight: 700;
}

strong {
  color: #202421;
}
</style>
