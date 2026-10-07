import { useState } from 'react';

import MediaHero from '@/features/main/shared/media-hero';
import type { TMealDetails } from '../types/meal';

interface MealHeroProps {
  meal: TMealDetails;
}

export default function MealHero({ meal }: MealHeroProps) {
  const [expanded] = useState(false);

  return (
    <MediaHero
      image={meal.strMealThumb}
      title={meal.strMeal}
      description={
        meal.strInstructions && (
          <>
            <p className={`whitespace-pre-line ${expanded ? '' : 'line-clamp-3'}`}>
              {meal.strInstructions}
            </p>
          </>
        )
      }
    />
  );
}
