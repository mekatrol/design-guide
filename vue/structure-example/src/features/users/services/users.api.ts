import { readJson } from '@/services/http.service';

import { USER_ROLE } from '@/features/users/constants/user-roles.constants';
import { USER_STATUS } from '@/features/users/constants/user-statuses.constants';
import type { User } from '@/features/users/types/user.types';

const USERS: User[] = [
  {
    id: 1,
    name: 'Avery Stone',
    email: 'avery@example.test',
    role: USER_ROLE.ADMIN,
    projects: 14,
    status: USER_STATUS.ACTIVE
  },
  {
    id: 2,
    name: 'Morgan Lee',
    email: 'morgan@example.test',
    role: USER_ROLE.EDITOR,
    projects: 7,
    status: USER_STATUS.ACTIVE
  },
  {
    id: 3,
    name: 'Sam Rivera',
    email: 'sam@example.test',
    role: USER_ROLE.VIEWER,
    projects: 2,
    status: USER_STATUS.INVITED
  }
];

export async function listUsers(): Promise<User[]> {
  const response = await readJson(USERS);

  return response.data;
}

export async function getUser(userId: number): Promise<User | undefined> {
  const response = await readJson(USERS.find((user) => user.id === userId));

  return response.data;
}
