import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { USER_STATUS } from '@/features/users/constants/user-statuses.constants'
import { listUsers } from '@/features/users/services/users.api'
import { toUserListItem } from '@/features/users/services/users.mapper'
import type { User } from '@/features/users/types/user.types'

const USERS_STORE_ID = 'users'

export const useUsersStore = defineStore(USERS_STORE_ID, () => {
  const users = ref<User[]>([])
  const isLoading = ref(false)

  const userItems = computed(() => users.value.map(toUserListItem))
  const activeUserCount = computed(
    () => users.value.filter((user) => user.status === USER_STATUS.ACTIVE).length,
  )

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
