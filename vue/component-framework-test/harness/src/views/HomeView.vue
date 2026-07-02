<template>
  <main class="harness-page">
    <section class="harness-panel">
      <p class="eyebrow">Harness</p>
      <h1>Component test page</h1>
      <div class="component-row">
        <CoreButton />
        <CoreButton label="Imported from ui" />
        <CoreExternalLink href="https://www.passports.gov.au/">
          <CoreImage :src="logoDfatApoCentred" alt="Australian Passport Office" />
        </CoreExternalLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import logoDfatApoCentred from '@/assets/logo-dfat-apo-centred.svg';
import { CoreButton, CoreExternalLink, CoreImage } from '@ui';
</script>
