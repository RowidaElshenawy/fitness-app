import axiosInstance from '@/lib/axios';
import type { TRegisterFields } from '../../types/register';

export const registerUser = async (data: TRegisterFields) => {
  const res = await axiosInstance.post('/auth/signup', data);
  return res.data;
};
