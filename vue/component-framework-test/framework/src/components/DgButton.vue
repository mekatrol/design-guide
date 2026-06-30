<template>
  <button class="dg-button" type="button">
    {{ label ?? 'Framework button' }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
}>();
</script>

<style scoped>
.dg-button {
  min-height: 2.5rem;
  padding: 0 1rem;
  border: 1px solid #1f2937;
  border-radius: 6px;
  background: #f8fafc;
  color: #111827;
  font: inherit;
  cursor: pointer;
}

.dg-button:hover {
  background: #e5e7eb;
}
</style>
