import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { getMuscleGroups } from '../api/muscles.api';

export function useMuscleGroups() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ['muscle-groups', lang],
    queryFn: () => getMuscleGroups(lang),
    select: (data) => data.musclesGroup,
    staleTime: 1000 * 60 * 30,
  });
}
