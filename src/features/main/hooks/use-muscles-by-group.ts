import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { getMusclesByGroup } from '../api/muscles.api';

export function useMusclesByGroup(groupId: string | undefined) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return useQuery({
    queryKey: ['muscles-by-group', groupId, lang],
    queryFn: () => getMusclesByGroup(groupId as string, lang),
    select: (data) => data.muscles,
    enabled: !!groupId,
    staleTime: 1000 * 60 * 30,
  });
}
