import axios from 'axios';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { updateToken } from '@/store/slices/auth.slice';

import { changePassword } from '../lib/apis/change-password.api';
import type { TChangePasswordPayload } from '../lib/types/change-password';

export function useChangePassword() {
  // Translation
  const { t } = useTranslation();

  // Redux state
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload: TChangePasswordPayload) => changePassword(payload, token),

    onSuccess: (data) => {
      dispatch(updateToken(data.token));

      toast.success(t('profile.change-password.success'));
    },

    onError: (error) => {
      const message = axios.isAxiosError(error) ? error.response?.data?.error : undefined;

      if (message === 'incorrect email or password') {
        toast.error(message);
        return;
      }

      toast.error(t('profile.change-password.something-went-wrong'));
    },
  });
}
