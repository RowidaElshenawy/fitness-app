export type TMealCategory = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export type TMealCategoriesResponse = {
  categories: TMealCategory[];
};

export type TMealSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea?: string | null;
  strCountry?: string | null;
};

export type TMealsByCategoryResponse = {
  meals: TMealSummary[] | null;
};

export type TMealDetails = {
  idMeal: string;
  strMeal: string;
  strCategory: string | null;
  strArea: string | null;
  strCountry?: string | null;
  strInstructions: string | null;
  strMealThumb: string;
  [key: `strIngredient${number}`]: string | null | undefined;
  [key: `strMeasure${number}`]: string | null | undefined;
};

export type TMealDetailsResponse = {
  meals: TMealDetails[] | null;
};

export type TIngredient = {
  name: string;
  measure: string;
};
