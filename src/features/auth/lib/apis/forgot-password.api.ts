import axiosInstance from '@/lib/axios';

interface IForgotPasswordRequest {
  email: string;
}

interface IVerifyResetCodeRequest {
  resetCode: string;
}

interface IResetPasswordRequest {
  email: string;
  newPassword: string;
}

export const forgotPassword = async ({ email }: IForgotPasswordRequest) => {
  await axiosInstance.post('/auth/forgotPassword', { email });
};

export const verifyResetCode = async ({ resetCode }: IVerifyResetCodeRequest) => {
  await axiosInstance.post('/auth/verifyResetCode', { resetCode });
};

export const resetPassword = async ({ email, newPassword }: IResetPasswordRequest) => {
  await axiosInstance.put('/auth/resetPassword', {
    email,
    newPassword,
  });
};
