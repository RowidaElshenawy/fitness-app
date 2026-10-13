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

export const getMealCategories = async (): Promise<TMealCategoriesResponse> => {
  const res = await mealsAxios.get('/categories.php');
  return res.data;
};

export const getMealsByCategory = async (category: string): Promise<TMealsByCategoryResponse> => {
  const res = await mealsAxios.get('/filter.php', { params: { c: category } });
  return res.data;
};

export const getMealById = async (id: string): Promise<TMealDetailsResponse> => {
  const res = await mealsAxios.get('/lookup.php', { params: { i: id } });
  return res.data;
};
