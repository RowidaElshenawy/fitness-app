import SidebarListItem from '@/features/main/shared/sidebar-list-item';
import type { TMealSummary } from '../types/meal';

interface MealListItemProps {
  meal: TMealSummary;
  active: boolean;
  onSelect: (id: string) => void;
}

export default function MealListItem({ meal, active, onSelect }: MealListItemProps) {
  return (
    <SidebarListItem
      image={meal.strMealThumb}
      title={meal.strMeal}
      subtitle={meal.strCountry}
      active={active}
      onSelect={() => onSelect(meal.idMeal)}
    />
  );
}
