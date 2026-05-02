import type { UserRole } from '@/features/users/constants/user-roles.constants'
import type { UserStatus } from '@/features/users/constants/user-statuses.constants'

export type { UserRole, UserStatus }

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  projects: number
  status: UserStatus
}

export interface UserListItem {
  id: number
  name: string
  email: string
  role: UserRole
  projectSummary: string
  statusLabel: string
}
