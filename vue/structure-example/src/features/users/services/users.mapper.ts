import { formatNumber } from '@/utils/formatters'

import type { User, UserListItem } from '../types/user.types'

export function toUserListItem(user: User): UserListItem {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    projectSummary: `${formatNumber(user.projects)} projects`,
    statusLabel: user.status === 'active' ? 'Active' : 'Invited',
  }
}
