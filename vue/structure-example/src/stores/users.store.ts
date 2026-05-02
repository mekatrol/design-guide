import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { listUsers } from '@/features/users/services/users.api'
import { toUserListItem } from '@/features/users/services/users.mapper'
import type { User } from '@/features/users/types/user.types'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const isLoading = ref(false)

  const userItems = computed(() => users.value.map(toUserListItem))
  const activeUserCount = computed(() => users.value.filter((user) => user.status === 'active').length)

  async function loadUsers(): Promise<void> {
    isLoading.value = true

    try {
      users.value = await listUsers()
    } finally {
      isLoading.value = false
    }
  }

  return {
    activeUserCount,
    isLoading,
    loadUsers,
    userItems,
    users,
  }
})
