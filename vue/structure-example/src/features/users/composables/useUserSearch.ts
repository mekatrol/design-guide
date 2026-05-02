import { computed, ref, type Ref } from 'vue'

import type { UserListItem } from '@/features/users/types/user.types'

export function useUserSearch(users: Ref<UserListItem[]>) {
  const searchTerm = ref('')

  const filteredUsers = computed(() => {
    const term = searchTerm.value.trim().toLowerCase()

    if (!term) {
      return users.value
    }

    return users.value.filter((user) =>
      [user.name, user.email, user.role].some((value) => value.toLowerCase().includes(term)),
    )
  })

  return {
    filteredUsers,
    searchTerm,
  }
}
