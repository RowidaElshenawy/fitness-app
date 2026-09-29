import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { editProfile } from '../lib/apis/edit-profile.api';
import type { IEditProfileResponse } from '../lib/types/edit-profile';

export function useEditProfile() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProfile,

    onSuccess: (data) => {
      queryClient.setQueryData<IEditProfileResponse>(['profile-data'], (currentData) =>
        currentData
          ? {
              ...currentData,
              user: {
                ...currentData.user,
                ...data.user,
              },
            }
          : currentData
      );

      toast.success(data.message);
    },

    onError: (error) => {
      const message = axios.isAxiosError(error) ? error.response?.data?.error : undefined;

      toast.error(message ?? t('profile.something-went-wrong'));
    },
  });
}
