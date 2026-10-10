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

    onSuccess: (data, variables) => {
      dispatch(updateUser(data.user));

      if ('goal' in variables) {
        toast.success(t('profile.kyc-updated.goal'));
      } else if ('activityLevel' in variables) {
        toast.success(t('profile.kyc-updated.activity-level'));
      } else {
        toast.success(t('profile.kyc-updated.weight'));
      }
    },

    onError: (error) => {
      const message = axios.isAxiosError(error) ? error.response?.data?.error : undefined;

      toast.error(message ?? t('profile.something-went-wrong'));
    },
  });
}
