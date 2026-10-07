import { useTranslation } from 'react-i18next';
import type { TIngredient } from '../types/meal';

interface IngredientsTableProps {
  ingredients: TIngredient[];
}

export default function IngredientsTable({ ingredients }: IngredientsTableProps) {
  const { t } = useTranslation();

  if (ingredients.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="text-3xl font-medium text-text-plain">{t('main.healthy.ingredients')}</h3>

      <ul className="mt-6 rounded-lg border border-border-subtle bg-bg-subtle/60 px-6 py-3 backdrop-blur-md sm:columns-2 sm:gap-x-16">
        {ingredients.map(({ name, measure }) => (
          <li
            key={name}
            className="flex break-inside-avoid items-center justify-between gap-4 border-b border-border-subtle py-3"
          >
            <span className="font-semibold text-text-plain">{name}</span>
            <span className="text-text-primary">{measure}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
