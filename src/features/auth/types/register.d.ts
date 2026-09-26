export type TUserInfoData = z.infer<ReturnType<typeof USER_INFO_SCHEMA>>;
export type TRegisterStepsProps =
  'user-info' | 'gender' | 'height' | 'weight' | 'age' | 'goal' | 'activityLevel';
export type TUserInfoProps = {
  setUserInfo: (userInfo: TUserInfoData) => void;
  setStep: (step: TRegisterStepsProps) => void;
};
