// features/healthy/hooks/use-meal-categories.ts
import { useQuery } from '@tanstack/react-query';
import type { TMealCategory } from '../types/meal';
import { mealCategoriesQuery } from '../api/meals-queries';

export function useMealCategories() {
  return useQuery({
    ...mealCategoriesQuery,
    select: (data): TMealCategory[] => data.categories ?? [],
  });
}
