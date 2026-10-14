import { useQuery } from '@tanstack/react-query';

import { getMealCategories } from '../api/meals.api';

export function useMeals() {
  return useQuery({
    queryKey: ['meal-categories'],
    queryFn: ({ signal }) => getMealCategories(signal),
    staleTime: 1000 * 60 * 60,
  });
}
