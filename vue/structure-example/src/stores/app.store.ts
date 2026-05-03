import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';

import { APP_PRODUCT_NAME } from '@/constants/app.constants';

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
  const visitCount = ref(persistedState.visitCount);
  const workspaces = ref<string[]>([...WORKSPACES]);

  const title = computed(() => `${productName.value} - ${activeWorkspace.value}`);
  const visitSummary = computed(() => `${visitCount.value} route visits saved`);

  const setActiveWorkspace = (workspace: string): void => {
    activeWorkspace.value = workspace;
  };

  const recordRouteVisit = (): void => {
    visitCount.value += 1;
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
    productName,
    recordRouteVisit,
    setActiveWorkspace,
    title,
    visitCount,
    visitSummary,
    workspaces
  };
});
