<template>
  <main class="harness-page">
    <section class="harness-panel">
      <p class="eyebrow">Harness</p>
      <h1>Component test page</h1>
      <div class="component-row">
        <DgButton />
        <DgButton label="Imported from ui" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { DgButton } from '@ui';
</script>
