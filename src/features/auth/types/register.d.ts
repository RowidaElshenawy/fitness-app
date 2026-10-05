export type TUserInfoData = z.infer<typeof USER_INFO_SCHEMA>;

export type TRegisterStepsProps =
  'user-info' | 'gender' | 'height' | 'weight' | 'age' | 'goal' | 'activityLevel';
export type Gender = 'male' | 'female';
export type Goal =
  'Gain weight' | 'Lose weight' | 'Get fitter' | 'Gain flexibility' | 'Learn the basics';
export type ActivityLevel = 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
export type KycFormData = {
  gender: Gender | null;
  age: number;
  weight: number;
  height: number;
  goal: Goal | '';
  activityLevel: ActivityLevel | '';
};
export type TUserInfoProps = {
  setUserInfo: (userInfo: TUserInfoData) => void;
  setStep: (step: TRegisterStepsProps) => void;
};

export type TRegisterFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
  gender: Gender;
  height: number;
  weight: number;
  age: number;
  goal: Goal;
  activityLevel: ActivityLevel;
};
