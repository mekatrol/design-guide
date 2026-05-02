<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()
</script>

<template>
  <button class="base-button" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.5rem;
  padding: 0 1rem;
  border: 1px solid #315a46;
  border-radius: 6px;
  background: #315a46;
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.base-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
</style>
