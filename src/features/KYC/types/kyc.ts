import type { GOAL_OPTIONS, ACTIVITY_LEVEL_OPTIONS } from '../constants/kyc-options';

export type Gender = 'male' | 'female';

export type Goal = (typeof GOAL_OPTIONS)[number]['value'];

export type ActivityLevel = (typeof ACTIVITY_LEVEL_OPTIONS)[number]['value'];

export interface KycFormData {
  gender: Gender | null;
  age: number;
  weight: number;
  height: number;
  goal: Goal | '';
  activityLevel: ActivityLevel | '';
}
