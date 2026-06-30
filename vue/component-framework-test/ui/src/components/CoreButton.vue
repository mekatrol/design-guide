<template>
  <button class="dg-core-button" type="button">
    {{ label ?? 'Framework button' }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
}>();
</script>
