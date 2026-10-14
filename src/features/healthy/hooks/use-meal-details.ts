import { useQuery } from '@tanstack/react-query';
import { getMealById } from '../api/meals.api';

export function useMealDetails(mealId: string | undefined) {
  return useQuery({
    queryKey: ['meal-details', mealId],
    queryFn: () => getMealById(mealId as string),
    select: (data) => data.meals?.[0] ?? null,
    enabled: !!mealId,
    staleTime: 1000 * 60 * 30,
  });
}
