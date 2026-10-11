export type TChangePasswordPayload = {
  password: string;
  newPassword: string;
};

export type TChangePasswordResponse = {
  message: string;
  token: string;
};

export type ChangePasswordField = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};
