export interface ForgotPasswordForm {
  email: string;
  resetCode: string;
  newPassword: string;
  confirmPassword: string;
}

export type ForgotPasswordStep = 'email' | 'code' | 'password';
