import { useLocalSessionJsonObject } from '@/composables/useLocalSession';
import { TOKEN_SESSION_KEY, useAppStore } from '@/stores/app.store';
import type { AccessToken, AuthenticatedUser, RefreshedToken } from '@/types/auth.types';
import { configureHttpService, httpGet, httpPost, type HandleErrorCallback } from './http.service';

export const REFRESH_TOKEN_URL = '/auth/refresh-token';
export const LOGIN_URL = '/auth/login';
export const LOGOUT_URL = '/auth/logout';
export const USER_URL = '/auth/user';

interface LoginRequest {
  userName: string;
  password: string;
}

export interface AuthService {
  loadStorageToken(): Promise<void>;
  refreshToken(): Promise<boolean>;
  login(
    userName: string,
    password: string,
    errorHandlerCallback?: HandleErrorCallback
  ): Promise<AccessToken | undefined>;
  logout(errorHandlerCallback?: HandleErrorCallback): Promise<void>;
  updateUser(): Promise<void>;
}

class AuthServiceImpl implements AuthService {
  async loadStorageToken(): Promise<void> {
    const persistSettings = useLocalSessionJsonObject<AccessToken>(TOKEN_SESSION_KEY);
    const appStore = useAppStore();

    if (!persistSettings.setting) {
      return;
    }

    appStore.setUserToken(persistSettings.setting, true);

    try {
      const success = await this.refreshToken();

      if (!success) {
        appStore.clearUser();
        return;
      }

      await this.updateUser();
    } catch {
      appStore.clearUser();
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      const appStore = useAppStore();

      if (!appStore.userToken) {
        return false;
      }

      const refreshedToken = await httpGet<RefreshedToken>(
        REFRESH_TOKEN_URL,
        (apiError): boolean => {
          if (
            apiError.errors &&
            apiError.errors.length > 0 &&
            apiError.errors[0]?.errorMessage === 'user token revoked'
          ) {
            return true;
          }
          return false;
        },
        true
      );

      appStore.setUserToken(
        {
          ...appStore.userToken,
          accessToken: refreshedToken.accessToken,
          accessTokenExpiry: refreshedToken.accessTokenExpiry
        },
        true
      );

      return !!refreshedToken;
    } catch {
      return false;
    }
  }

  async login(
    userName: string,
    password: string,
    errorHandlerCallback?: HandleErrorCallback
  ): Promise<AccessToken | undefined> {
    try {
      const token = await httpPost<LoginRequest, AccessToken>(
        { userName, password },
        LOGIN_URL,
        errorHandlerCallback
      );
      return token;
    } catch {
      return undefined;
    }
  }

  async logout(errorHandlerCallback?: HandleErrorCallback): Promise<void> {
    try {
      await httpGet(LOGOUT_URL, errorHandlerCallback);
    } catch {
      return undefined;
    } finally {
      const appStore = useAppStore();
      appStore.clearUser();
    }
  }

  async updateUser(): Promise<void> {
    const appStore = useAppStore();
    appStore.setUser(await httpGet<AuthenticatedUser>(USER_URL));
  }
}

export const configureAuthTransport = (): void => {
  configureHttpService({
    getAccessToken: () => useAppStore().userToken?.accessToken,
    getRefreshToken: () => useAppStore().userToken?.refreshToken,
    refreshToken: () => useAuthService().refreshToken(),
    refreshTokenUrl: REFRESH_TOKEN_URL
  });
};

export const useAuthService = (): AuthService => {
  return new AuthServiceImpl();
};
