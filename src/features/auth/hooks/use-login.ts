import { useMutation } from '@tanstack/react-query';
import type { TLoginField } from '../types/login-field';
import { login } from '../api/login.api';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from '@/store/slices/auth.slice';
import axios from 'axios';
import { useState } from 'react';

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { locale } = useParams();
  const [backendError, setBackendError] = useState<string>('');
  const mutation = useMutation({
    mutationFn: (userData: TLoginField) => login(userData),
    onSuccess: (data) => {
      setBackendError('');
      dispatch(
        loginAction({
          token: data.data.token,
          user: data.data.user,
        })
      );
      navigate(`/${locale}`);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error || error.response?.data?.message || error.message;

        setBackendError(message);
      }
    },
  });
  return {
    ...mutation,
    backendError,
  };
}
