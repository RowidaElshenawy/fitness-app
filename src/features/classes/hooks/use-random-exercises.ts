import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { getRandomExercises } from '../api/exercises.api';

export function useRandomExercises(
  targetMuscleGroupId?: string,
  limit = 6,
  difficultyLevelId?: string
) {
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage ?? i18n.language;

  return useQuery({
    queryKey: ['random-exercises', targetMuscleGroupId, difficultyLevelId, limit, lang],
    queryFn: () =>
      getRandomExercises({
        targetMuscleGroupId,
        difficultyLevelId,
        limit,
        lang,
      }),
    enabled: Boolean(targetMuscleGroupId),
    staleTime: 1000 * 60 * 5,
  });
}
