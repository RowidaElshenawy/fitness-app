import axios from 'axios';

export type MealCategory = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

type CategoriesResponse = { categories: MealCategory[] };

const MEALS_API_URL = import.meta.env.VITE_API_URL_MEALS;

export async function getMealCategories(signal?: AbortSignal): Promise<MealCategory[]> {
  const { data } = await axios.get<CategoriesResponse>(`${MEALS_API_URL}`, {
    signal,
  });

  return data.categories ?? [];
}
