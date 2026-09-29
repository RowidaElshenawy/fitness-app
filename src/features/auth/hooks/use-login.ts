import { useMutation } from '@tanstack/react-query';
import type { TLoginField } from '../types/login-field';
import { login } from '../api/login.api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '@/store/slices/auth.slice';

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (userData: TLoginField) => login(userData),
    onSuccess: (data) => {
      console.log(data, 'success');
      dispatch(
        loginAction({
          token: data?.data.token,
          user: data?.data.user,
        })
      );
      navigate('/');
    },
    onError: (data) => {
      console.log(data, 'err');
    },
  });
}
