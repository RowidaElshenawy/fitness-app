import { useMutation } from '@tanstack/react-query';
import type { TLoginField } from '../types/login-field';
import { login } from '../api/login.api';

export function useLogin() {
  return useMutation({
    mutationFn: (userData: TLoginField) => login(userData),
    onSuccess: (data) => {
      console.log(data, 'success');
    },
    onError: (data) => {
      console.log(data, 'err');
    },
  });
}
