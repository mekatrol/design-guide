<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import BaseButton from '@/components/base/BaseButton.vue'
import { useAppStore } from '@/stores/app.store'
import { useUsersStore } from '@/stores/users.store'

import UserListTable from '../components/UserListTable.vue'
import { USER_ROLES } from '../constants/user-roles.constants'
import { useUserSearch } from '../composables/useUserSearch'

const usersStore = useUsersStore()
const appStore = useAppStore()
const { activeUserCount, isLoading, userItems } = storeToRefs(usersStore)
const { filteredUsers, searchTerm } = useUserSearch(userItems)

onMounted(() => {
  if (userItems.value.length === 0) {
    void usersStore.loadUsers()
  }
})
</script>

<template>
  <section class="users-view">
    <div class="view-heading">
      <div>
        <p class="eyebrow">Users feature</p>
        <h2>Team Directory</h2>
        <p>
          {{ activeUserCount }} active users across {{ USER_ROLES.length }} supported roles for
          {{ appStore.activeWorkspace }}.
        </p>
      </div>

      <BaseButton :disabled="isLoading" @click="usersStore.loadUsers">
        {{ isLoading ? 'Loading' : 'Refresh' }}
      </BaseButton>
    </div>

    <label class="search-field">
      <span>Search users</span>
      <input v-model="searchTerm" type="search" placeholder="Name, email, or role" />
    </label>

    <UserListTable :users="filteredUsers" />

    <p class="store-note">{{ appStore.visitSummary }}.</p>
  </section>
</template>

<style scoped>
.users-view {
  display: grid;
  gap: 1.25rem;
}

.view-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
}

.view-heading h2 {
  margin: 0;
  font-size: 2rem;
}

.view-heading p {
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

.search-field {
  display: grid;
  gap: 0.4rem;
  max-width: 24rem;
  font-weight: 700;
}

.search-field input {
  min-height: 2.5rem;
  padding: 0 0.75rem;
  border: 1px solid #c9d1c3;
  border-radius: 6px;
}

.store-note {
  margin: 0;
  color: #667064;
  font-weight: 700;
}
</style>
