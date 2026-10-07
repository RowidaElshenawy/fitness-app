import type { TIngredient, TMealDetails } from '../types/meal';

const MAX_INGREDIENTS = 20;

// TheMealDB returns ingredients as strIngredient1..20 / strMeasure1..20.
// Turn them into a clean array and drop the empty slots.
export const getIngredients = (meal: TMealDetails): TIngredient[] => {
  const ingredients: TIngredient[] = [];

  for (let i = 1; i <= MAX_INGREDIENTS; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    if (!name) continue;

    ingredients.push({ name, measure: meal[`strMeasure${i}`]?.trim() ?? '' });
  }

  return ingredients;
};
