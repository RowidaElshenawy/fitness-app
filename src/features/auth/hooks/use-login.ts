import { useMutation } from '@tanstack/react-query';
import type { TLoginField } from '../types/login-field';
import { login } from '../api/login.api';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userData: TLoginField) => login(userData),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      console.log(data, 'success');
      navigate('/');
    },
    onError: (data) => {
      console.log(data, 'err');
    },
  });
}
