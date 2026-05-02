<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { ROUTE_NAMES } from '@/constants/route-names.constants'
import { getUser } from '@/features/users/services/users.api'
import type { User } from '@/features/users/types/user.types'

const route = useRoute()
const user = ref<User>()
const userId = computed(() => Number(route.params.id))

onMounted(async () => {
  user.value = await getUser(userId.value)
})
</script>

<template>
  <section class="details-view">
    <RouterLink :to="{ name: ROUTE_NAMES.USERS }">Back to users</RouterLink>

    <article v-if="user" class="details-panel">
      <p class="eyebrow">{{ user.role }}</p>
      <h2>{{ user.name }}</h2>
      <dl>
        <div>
          <dt>Email</dt>
          <dd>{{ user.email }}</dd>
        </div>
        <div>
          <dt>Projects</dt>
          <dd>{{ user.projects }}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{{ user.status }}</dd>
        </div>
      </dl>
    </article>

    <p v-else>Loading user...</p>
  </section>
</template>

<style scoped>
.details-view {
  display: grid;
  gap: 1rem;
}

.details-view a {
  color: #315a46;
  font-weight: 700;
}

.details-panel {
  padding: 1.25rem;
  border: 1px solid #d9ded4;
  border-radius: 8px;
  background: #ffffff;
}

.details-panel h2 {
  margin: 0;
}

.eyebrow {
  margin: 0 0 0.35rem;
  color: #667064;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

dl {
  display: grid;
  gap: 0.8rem;
  margin: 1.25rem 0 0;
}

dt {
  color: #667064;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

dd {
  margin: 0.15rem 0 0;
}
</style>
