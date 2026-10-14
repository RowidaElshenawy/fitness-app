import type {
  TMealCategoriesResponse,
  TMealDetailsResponse,
  TMealsByCategoryResponse,
} from '../types/meal';
import axios from 'axios';

const mealsAxios = axios.create({
  baseURL: import.meta.env.VITE_MEALS_API_URL ?? 'https://www.themealdb.com/api/json/v1/1',
});

export default mealsAxios;

export const getMealCategories = async (signal?: AbortSignal): Promise<TMealCategoriesResponse> => {
  const res = await mealsAxios.get('/categories.php', { signal });
  return res.data;
};

export const getMealsByCategory = async (
  category: string,
  signal?: AbortSignal
): Promise<TMealsByCategoryResponse> => {
  const res = await mealsAxios.get('/filter.php', { params: { c: category }, signal });
  console.log('res.data', res.data);
  return res.data;
};

export const getMealById = async (
  id: string,
  signal?: AbortSignal
): Promise<TMealDetailsResponse> => {
  const res = await mealsAxios.get('/lookup.php', { params: { i: id }, signal });
  return res.data;
};
