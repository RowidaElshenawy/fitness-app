import type { TUser } from '@/features/auth/types/user';

export type TAuthState = {
  token: string;
  user: TUser | null;
  isAuthenticated: boolean;
};
