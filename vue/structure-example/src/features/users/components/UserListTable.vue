<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { ROUTE_NAMES } from '@/constants/route-names.constants'

import type { UserListItem } from '../types/user.types'

defineProps<{
  users: UserListItem[]
}>()
</script>

<template>
  <table class="users-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Role</th>
        <th>Projects</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>
          <RouterLink :to="{ name: ROUTE_NAMES.USER_DETAILS, params: { id: user.id } }">
            {{ user.name }}
          </RouterLink>
          <span>{{ user.email }}</span>
        </td>
        <td>{{ user.role }}</td>
        <td>{{ user.projectSummary }}</td>
        <td>
          <span class="status">{{ user.statusLabel }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.users-table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border: 1px solid #d9ded4;
  border-radius: 8px;
  background: #ffffff;
}

th,
td {
  padding: 0.9rem 1rem;
  border-bottom: 1px solid #e8ebe5;
  text-align: left;
}

th {
  color: #667064;
  font-size: 0.78rem;
  text-transform: uppercase;
}

td a {
  display: block;
  color: #315a46;
  font-weight: 700;
  text-decoration: none;
}

td span {
  display: block;
  margin-top: 0.2rem;
  color: #667064;
  font-size: 0.9rem;
}

.status {
  display: inline-flex;
  width: fit-content;
  margin: 0;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  background: #eef4ec;
  color: #315a46;
  font-size: 0.82rem;
  font-weight: 700;
}
</style>
