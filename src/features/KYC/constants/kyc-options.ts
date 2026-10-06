export const GOAL_OPTIONS = [
  { value: 'Gain weight', labelKey: 'auth.kyc.goal.gain-weight' },
  { value: 'Lose weight', labelKey: 'auth.kyc.goal.lose-weight' },
  { value: 'Get fitter', labelKey: 'auth.kyc.goal.get-fitter' },
  { value: 'Gain flexibility', labelKey: 'auth.kyc.goal.gain-flexibility' },
  { value: 'Learn the basics', labelKey: 'auth.kyc.goal.learn-basics' },
] as const;

export const ACTIVITY_LEVEL_OPTIONS = [
  { value: 'level1', labelKey: 'auth.kyc.activity.rookie' },
  { value: 'level2', labelKey: 'auth.kyc.activity.beginner' },
  { value: 'level3', labelKey: 'auth.kyc.activity.intermediate' },
  { value: 'level4', labelKey: 'auth.kyc.activity.advance' },
  { value: 'level5', labelKey: 'auth.kyc.activity.true-beast' },
] as const;
