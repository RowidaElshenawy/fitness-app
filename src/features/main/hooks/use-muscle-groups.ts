import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { getMuscleGroups } from '../api/muscles.api';

export function useMuscleGroups() {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ['muscle-groups', i18n.language],
    queryFn: () => getMuscleGroups(i18n.language),
    staleTime: 5 * 60 * 1000,
  });
}
