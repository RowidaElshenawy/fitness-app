export type TAuthState = {
  token: string;
  user: TUser | null;
  isAuthenticated: boolean;
};
