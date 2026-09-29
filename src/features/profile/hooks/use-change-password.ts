import axios from 'axios';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { changePassword } from '../lib/apis/change-password.api';

export function useChangePassword() {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      toast.success(t('profile.change-password.success'));
    },
    onError: (error) => {
      const message = axios.isAxiosError(error) ? error.response?.data?.error : undefined;

      toast.error(message ?? t('profile.change-password.something-went-wrong'));
    },
  });
}
