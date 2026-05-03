import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';

import { useLocalSessionJsonObject } from '@/composables/useLocalSession';
import { APP_PRODUCT_NAME } from '@/constants/app.constants';
import type { AccessToken, AuthenticatedUser } from '@/types/auth.types';

export const TOKEN_SESSION_KEY = 'structure-example:auth-token';

interface PersistedAppState {
  activeWorkspace: string;
  visitCount: number;
}

const STORAGE_KEY = 'structure-example:app-store';
const APP_STORE_ID = 'app';
const WORKSPACES = ['Design Systems', 'Product Platform', 'Research Ops'] as const;

const readPersistedState = (): PersistedAppState => {
  const fallback: PersistedAppState = {
    activeWorkspace: WORKSPACES[0],
    visitCount: 0
  };

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (!storedValue) {
      return fallback;
    }

    return {
      ...fallback,
      ...JSON.parse(storedValue)
    };
  } catch {
    return fallback;
  }
};

export const useAppStore = defineStore(APP_STORE_ID, () => {
  const persistedState = readPersistedState();
  const productName = ref(APP_PRODUCT_NAME);
  const activeWorkspace = ref(persistedState.activeWorkspace);
  const busyCount = ref(0);
  const visitCount = ref(persistedState.visitCount);
  const workspaces = ref<string[]>([...WORKSPACES]);
  const userToken = ref<AccessToken | undefined>();
  const user = ref<AuthenticatedUser | undefined>();

  const isBusy = computed(() => busyCount.value > 0);
  const isAuthenticated = computed(() => userToken.value !== undefined);
  const title = computed(() => `${productName.value} - ${activeWorkspace.value}`);
  const visitSummary = computed(() => `${visitCount.value} route visits saved`);

  const incrementBusy = (): void => {
    busyCount.value += 1;
  };

  const decrementBusy = (): void => {
    busyCount.value = Math.max(0, busyCount.value - 1);
  };

  const setActiveWorkspace = (workspace: string): void => {
    activeWorkspace.value = workspace;
  };

  const recordRouteVisit = (): void => {
    visitCount.value += 1;
  };

  const setUserToken = (token: AccessToken | undefined, rememberMe: boolean): void => {
    const persistSettings = useLocalSessionJsonObject<AccessToken>(TOKEN_SESSION_KEY);

    userToken.value = token;

    if (rememberMe && !!token) {
      persistSettings.setting = token;
    } else {
      persistSettings.remove();
    }
  };

  const setUser = (authenticatedUser: AuthenticatedUser | undefined): void => {
    user.value = authenticatedUser;
  };

  const clearUser = (): void => {
    user.value = undefined;
    setUserToken(undefined, false);
  };

  watch(
    [activeWorkspace, visitCount],
    () => {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          activeWorkspace: activeWorkspace.value,
          visitCount: visitCount.value
        })
      );
    },
    { immediate: true }
  );

  return {
    activeWorkspace,
    busyCount,
    clearUser,
    decrementBusy,
    incrementBusy,
    isAuthenticated,
    isBusy,
    productName,
    recordRouteVisit,
    setActiveWorkspace,
    title,
    visitCount,
    visitSummary,
    workspaces,
    user,
    userToken,
    setUser,
    setUserToken
  };
});
