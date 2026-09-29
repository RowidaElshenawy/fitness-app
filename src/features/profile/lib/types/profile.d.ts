import type { ActivityLevel, Gender, Goal } from '@/features/auth/lib/types/kyc';

export interface IProfileUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  age: number;
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  photo: string;
  createdAt: string;
  resetCodeVerified: boolean;
  passwordChangedAt: string;
}

export interface IProfileResponse {
  message: string;
  user: IProfileUser;
}
