// features/healthy/api/meals-queries.ts
import { getMealCategories } from './meals.api';

export const mealCategoriesQuery = {
  queryKey: ['meal-categories'] as const,
  queryFn: ({ signal }: { signal?: AbortSignal }) => getMealCategories(signal),
  staleTime: 1000 * 60 * 60,
};
