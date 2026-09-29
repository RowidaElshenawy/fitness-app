import type { ActivityLevel, Goal } from './kyc';

export type IEditProfilePayload =
  { weight: number } | { activityLevel: ActivityLevel } | { goal: Goal };

export interface IEditProfileResponse {
  message: string;
  user: {
    weight: number;
    activityLevel: ActivityLevel;
    goal: Goal;
  };
}
