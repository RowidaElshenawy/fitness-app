export const GOAL_OPTIONS = [
  { value: 'Gain weight', labelKey: 'kyc.goal.gain-weight' },
  { value: 'Lose weight', labelKey: 'kyc.goal.lose-weight' },
  { value: 'Get fitter', labelKey: 'kyc.goal.get-fitter' },
  { value: 'Gain flexibility', labelKey: 'kyc.goal.gain-flexibility' },
  { value: 'Learn the basics', labelKey: 'kyc.goal.learn-basics' },
] as const;

export const ACTIVITY_LEVEL_OPTIONS = [
  { value: 'level1', labelKey: 'kyc.activity.rookie' },
  { value: 'level2', labelKey: 'kyc.activity.beginner' },
  { value: 'level3', labelKey: 'kyc.activity.intermediate' },
  { value: 'level4', labelKey: 'kyc.activity.advance' },
  { value: 'level5', labelKey: 'kyc.activity.true-beast' },
] as const;
