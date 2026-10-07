import { useQuery } from '@tanstack/react-query';
import { getMealCategories } from '../api/meals.api';

export function useMealCategories() {
  return useQuery({
    queryKey: ['meal-categories'],
    queryFn: getMealCategories,
    select: (data) => data.categories,
    staleTime: 1000 * 60 * 60,
  });
}
