<template>
  <main class="harness-page">
    <section class="harness-panel">
      <p class="eyebrow">Harness</p>
      <h1>Component test page</h1>
      <div class="component-row">
        <button
          id="passport-options-trigger"
          class="passport-popover-trigger"
          type="button"
          popovertarget="passport-application-options"
        >
          Passport options
        </button>
        <CoreButton />
        <CoreButton label="Imported from ui" />
        <CoreExternalLink href="https://www.passports.gov.au/">
          <CoreImage :src="logoDfatApoCentred" alt="Australian Passport Office" />
        </CoreExternalLink>
        <CorePopover id="passport-application-options" content-label="Passport application options">
          <article class="passport-popover">
            <p class="passport-popover__eyebrow">Australian Passport Office</p>
            <h2 class="passport-popover__title">Adult passport renewal</h2>
            <p class="passport-popover__copy">
              Renew online if your last passport was issued when you were 16 or older and is still
              valid, or expired less than three years ago.
            </p>
            <dl class="passport-popover__facts" aria-label="Renewal details">
              <div>
                <dt>Time</dt>
                <dd>About 15 minutes</dd>
              </div>
              <div>
                <dt>Before you start</dt>
                <dd>Passport details and a digital photo</dd>
              </div>
            </dl>
            <CoreExternalLink class="passport-popover__link" href="https://www.passports.gov.au/">
              Check eligibility
            </CoreExternalLink>
          </article>
        </CorePopover>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import logoDfatApoCentred from '@/assets/logo-dfat-apo-centred.svg';
import { CoreButton, CoreExternalLink, CoreImage, CorePopover } from '@ui';
</script>
