import { readJson } from '@/services/http.service'

import type { User } from '../types/user.types'

const USERS: User[] = [
  {
    id: 1,
    name: 'Avery Stone',
    email: 'avery@example.test',
    role: 'Admin',
    projects: 14,
    status: 'active',
  },
  {
    id: 2,
    name: 'Morgan Lee',
    email: 'morgan@example.test',
    role: 'Editor',
    projects: 7,
    status: 'active',
  },
  {
    id: 3,
    name: 'Sam Rivera',
    email: 'sam@example.test',
    role: 'Viewer',
    projects: 2,
    status: 'invited',
  },
]

export async function listUsers(): Promise<User[]> {
  const response = await readJson(USERS)

  return response.data
}

export async function getUser(userId: number): Promise<User | undefined> {
  const response = await readJson(USERS.find((user) => user.id === userId))

  return response.data
}
