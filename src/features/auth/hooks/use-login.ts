import { useMutation } from '@tanstack/react-query';
import type { TLoginField } from '../types/login-field';
import { useNavigate } from 'react-router-dom';
import { login } from '../lib/apis/login.api';

export function useLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userData: TLoginField) => login(userData),
    onSuccess: (data) => {
      console.log(data, 'success');
      navigate('/');
    },
    onError: (data) => {
      console.log(data, 'err');
    },
  });
}
