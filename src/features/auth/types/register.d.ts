export type TUserInfoData = z.infer<ReturnType<typeof USER_INFO_SCHEMA>>;
export type TRegisterStepsProps = 'user-info' | 'about-you';
export type TUserInfoProps = {
  setUserInfo: (userInfo: TUserInfoData) => void;
  setStep: (step: TRegisterStepsProps) => void;
  verifyError?: string;
};
