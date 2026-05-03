import { useRoute, useRouter } from 'vue-router';

import { ROUTE_NAMES } from '@/constants/route-names.constants';
import { useAuthService } from '@/services/auth.service';
import { ApiErrorType } from '@/services/http.service';
import { useAppStore } from '@/stores/app.store';
import { ensureRelativeUrl } from '@/utils/url';

export interface LoginLogout {
  login: (userName: string, password: string, rememberMe: boolean) => Promise<boolean>;
  logout: (logOutOfServer: boolean) => Promise<void>;
}

export const useLogin = (): LoginLogout => {
  const appStore = useAppStore();
  const authService = useAuthService();
  const router = useRouter();
  const route = useRoute();

  const login = async (
    userName: string,
    password: string,
    rememberMe: boolean
  ): Promise<boolean> => {
    appStore.incrementBusy();

    try {
      const token = await authService.login(userName, password, (apiError) => {
        return apiError.errorType === ApiErrorType.Unauthorized;
      });

      if (!token) {
        return false;
      }

      appStore.setUserToken(token, rememberMe);
      await authService.updateUser();

      const returnPath = route.query.return;

      if (typeof returnPath === 'string') {
        await router.push({ path: ensureRelativeUrl(decodeURIComponent(returnPath)) });
      } else {
        await router.push({ name: ROUTE_NAMES.HOME });
      }

      return true;
    } catch {
      return false;
    } finally {
      appStore.decrementBusy();
    }
  };

  const logout = async (logOutOfServer: boolean): Promise<void> => {
    appStore.incrementBusy();

    try {
      if (logOutOfServer) {
        await authService.logout();
      } else {
        appStore.clearUser();
      }
    } finally {
      router.go(0);
    }
  };

  return { login, logout };
};
