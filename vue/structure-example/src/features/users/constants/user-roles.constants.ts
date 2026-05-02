export const USER_ROLE = {
  ADMIN: 'Admin',
  EDITOR: 'Editor',
  VIEWER: 'Viewer',
} as const

export const USER_ROLES = Object.values(USER_ROLE)

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE]
