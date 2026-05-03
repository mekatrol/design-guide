import { formatNumber } from '@/utils/formatters';

import { USER_STATUS } from '@/features/users/constants/user-statuses.constants';
import type { User, UserListItem, UserStatus } from '@/features/users/types/user.types';

const USER_STATUS_LABELS: Record<UserStatus, string> = {
  [USER_STATUS.ACTIVE]: 'Active',
  [USER_STATUS.INVITED]: 'Invited'
};

export const toUserListItem = (user: User): UserListItem => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    projectSummary: `${formatNumber(user.projects)} projects`,
    statusLabel: USER_STATUS_LABELS[user.status]
  };
};
