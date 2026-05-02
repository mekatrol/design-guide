export type UserRole = 'Admin' | 'Editor' | 'Viewer'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  projects: number
  status: 'active' | 'invited'
}

export interface UserListItem {
  id: number
  name: string
  email: string
  role: UserRole
  projectSummary: string
  statusLabel: string
}
