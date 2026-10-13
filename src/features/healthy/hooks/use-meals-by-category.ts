import { useQuery } from '@tanstack/react-query';
import { getMealsByCategory } from '../api/meals.api';

export function useMealsByCategory(category: string | undefined) {
  return useQuery({
    queryKey: ['meals-by-category', category],
    queryFn: () => getMealsByCategory(category as string),
    select: (data) => data.meals ?? [],
    enabled: !!category,
    staleTime: 1000 * 60 * 30,
  });
}
