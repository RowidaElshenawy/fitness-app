import { useQuery } from '@tanstack/react-query';
import { getMealsByCategory } from '../api/meals.api';
import type { TMealSummary } from '../types/meal';

export function useMealsByCategory(category: string | undefined) {
  return useQuery({
    queryKey: ['meals-by-category', category],
    queryFn: ({ signal }) => {
      if (!category) throw new Error('Category is required');
      return getMealsByCategory(category, signal);
    },
    select: (data): TMealSummary[] => data.meals ?? [],
    enabled: !!category,
    staleTime: 1000 * 60 * 30,
  });
}
