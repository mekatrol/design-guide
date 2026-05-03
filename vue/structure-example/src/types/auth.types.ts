export interface RefreshedToken {
  accessToken: string;
  accessTokenExpiry: string;
}

export interface AccessToken extends RefreshedToken {
  userName: string;
  refreshToken: string;
  refreshTokenExpiry: string;
}

export interface AuthenticatedUser {
  id: number;
  userName: string;
  roles: string[];
}
