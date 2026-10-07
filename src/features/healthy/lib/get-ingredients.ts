import type { TIngredient, TMealDetails } from '../types/meal';

const MAX_INGREDIENTS = 20;

export const FC = (meal: TMealDetails): TIngredient[] => {
  const ingredients: TIngredient[] = [];

  for (let i = 1; i <= MAX_INGREDIENTS; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    if (!name) continue;

    ingredients.push({ name, measure: meal[`strMeasure${i}`]?.trim() ?? '' });
  }

  return ingredients;
};
