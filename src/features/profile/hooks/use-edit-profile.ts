import axios from 'axios';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { updateUser } from '@/store/slices/auth.slice';

import { editProfile } from '../lib/apis/edit-profile.api';
import type { IEditProfilePayload } from '../lib/types/edit-profile';

export function useEditProfile() {
  // Translation
  const { t } = useTranslation();

  // Redux state
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload: IEditProfilePayload) => editProfile(payload, token),

    onSuccess: (data) => {
      dispatch(updateUser(data.user));

      toast.success(data.message);
    },

    onError: (error) => {
      const message = axios.isAxiosError(error) ? error.response?.data?.error : undefined;

      toast.error(message ?? t('profile.something-went-wrong'));
    },
  });
}
